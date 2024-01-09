const model = require("../../../config/model");

async function notificationFunc(req, res) {
  let { type, title, msg } = req.body;
  try {
    if (type && title && msg) {
      let ResponseFromDatabase = await model.NOTIFICATION_MODEL.create({
        type: type.replace(/\s+/g, " ").trim(),
        title: title.replace(/\s+/g, " ").trim(),
        msg: msg.title.replace(/\s+/g, " ").trim(),
        admin_id: req.session.adminId,
      });

      ResponseFromDatabase.save().then(() => {
        res.status(201).json("Notification successfully sent.");
      });
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
}

module.exports = notificationFunc;
