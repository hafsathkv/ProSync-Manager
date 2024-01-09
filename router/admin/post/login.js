let bcrypt = require('bcrypt')
const model = require("../../../config/model");

async function loginFunc(req, res) {
  try {
    const { email, password } = req.body;
    const adminDoc = await model.ADMIN_MODEL.findOne({ email });

    if (adminDoc) {
      let isPasswordCheck = await bcrypt.compare(password, adminDoc.password);
      if (isPasswordCheck) {
        req.session.adminId = adminDoc.id;
        req.session.adminLogin = true;
        req.session.adminEmail = adminDoc.email;
        req.session.adminUsername = adminDoc.username;

        res.status(200).json({ email: adminDoc.email, id: adminDoc.id, username: adminDoc.username });
      } else {
        res.status(422).json("Invalid credentials!");
      }
    } else {
      res.status(422).json("Invalid credentials!");
    }
  } catch (error) {
    res.status(422).json("Please login again!");
  }
}

module.exports = loginFunc;