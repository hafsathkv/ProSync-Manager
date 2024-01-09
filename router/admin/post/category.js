const model = require("../../../config/model");

async function categoryFunc(req, res) {
  const { category } = req.body;
  if (category) {
    //check category input entered or not
    try {
      let isCategoryFound = await model.CATEGORY_MODEL.findOne({ category: category });
      if (isCategoryFound) {
        //if category present in database show the error
        res.status(409).json(category + " category is already in the database!");
      } else {
        //if category not present in database let add the data to database
        let responseFromDatabase = await model.CATEGORY_MODEL.create({
          category: category.replace(/\s+/g, " ").trim(),
          admin_id: req.session.adminId,
        });
        responseFromDatabase.save().then(() => {
          res.status(201).json(category + " category is successfuly added in your database.");
        });
      }
    } catch (error) {
      res.status(400).json("Bad request!");
    }
  } else {
    // end category input entered or not
    res.status(400).json("Invalid input!");
  }
}

module.exports = categoryFunc;
