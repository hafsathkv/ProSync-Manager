const model = require("../../../config/model");
const bcrypt = require("bcrypt")

async function branchesFunc(req, res) {
	let { 
    email, 
    username,
    password,
    branch_name,
    vat_or_trn_number,
    location,
    date_of_registration,
    city,
    state,
    country,
    street,
    zipcode,
    phone,
   } = req.body;

  try {
    if (email && username && password && branch_name && vat_or_trn_number && location && date_of_registration && city && state && country && street && zipcode && phone) {
      let isFound = await model.BRANCHES_MODEL.findOne({ email: email });
      //checking the data is already present or not
      if (isFound) {
        res.status(409).json(email + " is already registered!");
      } else {
        const SALT_ROUND = bcrypt.genSaltSync(11)
        let ResponseFromDatabase = await model.BRANCHES_MODEL.create({
          email: email,
          username: username,
          password: bcrypt.hashSync(password, SALT_ROUND),
          branch_name: branch_name,
          date_of_registration: date_of_registration,
          location: location,
          vat_or_trn_number: vat_or_trn_number,
          address: {
            city: city,
            county: country,
            zipcode: zipcode,
            state: state,
            street: street,
          },
          phone: phone,
          admin_id: req.session.adminId
        });

        ResponseFromDatabase.save().then(() => {
          res.status(201).json(branch_name + " branch is successfuly added in your database.");
        });
      }
    } else {
      res.status(400).json("Invalid input!");
    }
  } catch (error) {
    console.log(error)
    res.status(400).json("Bad request!");
  }
}

module.exports = branchesFunc;