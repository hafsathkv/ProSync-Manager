const router = require("express").Router();
const model = require("../../config/model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    if (req.session.branchLogin) {
      res.status(400).json("You are already logged.");
    } else {
      const { email, password } = req.body;
      let isFound = await model.BRANCHES_MODEL.findOne({ email: email });
      //checking if branch found or not
      if (isFound) {
        let isPasswordChecked = await bcrypt.compare(password, isFound.password);
        //password checking
        if (isPasswordChecked) {
          req.session.branchLogin = true;
          req.session.branchId = isFound.id;
          req.session.email = isFound.email;
          req.session.username = isFound.username;
          req.session.branch_name = isFound.branch_name;
          req.session.vat_or_registration = isFound.vat_or_trn_number;
          req.session.location = isFound.location;
          req.session.address = isFound.address;
          req.session.phone = isFound.phone;
          req.session.branch_adminId = isFound.admin_id;

          res.status(200).json({
            id: isFound.id,
            email: isFound.email,
            username: isFound.username,
            branch_name: isFound.branch_name,
            vat_or_registration: isFound.vat_or_trn_number,
            location: isFound.location,
            address: isFound.address,
            phone: isFound.phone,
            branch_adminId: isFound.admin_id,
          });
        } else {
          res.status(422).json("Invalid credentials!");
        }
      } else {
        res.status(422).json("Invalid credentials!");
      }
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
});

module.exports = router;
