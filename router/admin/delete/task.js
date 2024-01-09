const model = require("../../../config/model");

async function taskFunc(req, res) {
  const { id } = req.params;
  try {
    let isFound = await model.TASK_MODEL.findOne({ _id: id });
    if (isFound) {
      isFound
        .deleteOne()
        .then(() => {
          res.status(204).json("Successfully deleted.");
        })
        .catch(() => {
          res.status(400).json("Bad requirest!");
        });
    } else {
      res.status(404).json("Data not found in database.");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = taskFunc;
