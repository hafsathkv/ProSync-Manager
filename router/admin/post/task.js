const model = require("../../../config/model");

async function taskFunc(req, res) {
  let { task_name, task_remainder_day, description } = req.body;
  try {
    if (task_name && task_remainder_day && description) {
      let isFound = await model.TASK_MODEL.findOne({ task_name: task_name });
      //checking the data is already present or not
      if (isFound) {
        res.status(409).json(task_name + " task is already in your database!");
      } else {
        let responseFromDatabase = await model.TASK_MODEL.create({
          task_name: task_name.replace(/\s+/g, " ").trim(),
          task_remainder_day: task_remainder_day.replace(/\s+/g, " ").trim(),
          description: description.replace(/\s+/g, " ").trim(),
          admin_id: req.session.adminId,
        });

        responseFromDatabase.save().then(() => {
          res.status(201).json(task_name + " task is successfuly added in your database.");
        });
      }
    } else {
      res.status(400).json("Invalid input!");
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
}

module.exports = taskFunc;
