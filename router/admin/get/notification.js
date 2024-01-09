const model = require("../../../config/model");

async function notificationFunc(req, res) {
	try {
    let getAllData = await model.NOTIFICATION_MODEL.find();
    res.status(200).json(getAllData);
  } catch (error) {
    res.status(400).json("Bad request!");
  }
}

module.exports = notificationFunc;