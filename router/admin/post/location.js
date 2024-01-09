const model = require("../../../config/model");

async function location(req, res) {
	let { location, zipcode } = req.body;
  try {
    if (location && zipcode) {
      let isFound = await model.LOCATION_MODEL.findOne({ location: location });
      //checking the data is already present or not
      if (isFound) {
        res.status(409).json(location + " location is already in your database!");
      } else {
        let ResponseFromDatabase = await model.LOCATION_MODEL.create({
          location: location.replace(/\s+/g, " ").trim(),
          zipcode: zipcode,
          admin_id: req.session.adminId
        });

        ResponseFromDatabase.save().then(() => {
          res.status(201).json(location + " location is successfuly added in your database.");
        });
      }
    } else {
      res.status(400).json("Invalid input!");
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
}

module.exports = location;