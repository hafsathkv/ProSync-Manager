const model = require("../../../config/model");

async function designationFunc(req, res) {
  console.log(req.body)
	let { designation_name, salary_per_month, working_days_per_month, paid_leaves_per_year } = req.body;
  try {
    if (designation_name && salary_per_month && working_days_per_month && paid_leaves_per_year) {
      let isFound = await model.DESIGNATION_MODEL.findOne({ designation_name: designation_name });
      //checking the data is already present or not
      if (isFound) {
        res.status(409).json(designation_name + " designation is already in your database!");
      } else {
        let ResponseFromDatabase = await model.DESIGNATION_MODEL.create({
          designation_name: designation_name.replace(/\s+/g, " ").trim(),
          salary_per_month: salary_per_month,
          paid_leaves_per_year: paid_leaves_per_year,
          working_days_per_month: working_days_per_month,
          admin_id: req.session.adminId
        });

        ResponseFromDatabase.save().then(() => {
          res.status(201).json(designation_name + " designation is successfuly added in your database.");
        });
      }
    } else {
      res.status(400).json("Invalid input!");
    }
  } catch (error) {
    console.log(String(error))
    res.status(400).json("Bad request!");
  }
}

module.exports = designationFunc;