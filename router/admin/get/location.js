const model = require("../../../config/model");

async function location(req, res) {
	try {
    let getAllData = await model.LOCATION_MODEL.find();
    res.status(200).json(getAllData);
  } catch (error) {
    res.status(400).json("Bad request!");
  }
}

module.exports = location;