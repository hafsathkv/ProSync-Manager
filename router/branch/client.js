const model = require("../../config/model");

const router = require("express").Router();

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id === "companies") {
      const {
        company_name,
        vat_or_trn_number,
        phone,
        phone2,
        email,
        email2,
        address,
        company_type,
        licence_number,
        mohre_number,
        moi_number,
        quoto,
        company_grade_number,
        credit_limit,
        credit_limit_day,
        pro_name,
        pro_phone,
        pro_email,
        date_of_registration,
      } = req.body;
      let isFound = await model.COMPANIES_MODEL.findOne({ company_name: company_name, admin_id: req.session.branch_adminId });
      if (isFound) {
        res.status(302).json(company_name + " Already in Database");
      } else {
        let ResponseFromDatabase = await model.COMPANIES_MODEL.create({
          company_name: String(company_name).replace(/\s+/g, " ").trim(),
          vat_or_trn_number: vat_or_trn_number,
          phone: phone,
          phone2: phone2,
          email: email,
          email2: email2,
          address: String(address).replace(/\s+/g, " ").trim(),
          company_type: String(company_type).replace(/\s+/g, " ").trim(),
          licence_number: licence_number,
          mohre_number: mohre_number,
          moi_number: moi_number,
          quoto: String(quoto).replace(/\s+/g, " ").trim(),
          company_grade_number: company_grade_number,
          credit_limit: credit_limit,
          credit_limit_day: credit_limit_day,
          pro_name: String(pro_name).replace(/\s+/g, " ").trim(),
          pro_email: pro_email,
          pro_phone: pro_phone,
          date_of_registration: date_of_registration,
          created_by: req.session.branch_name,
          admin_id: req.session.branch_adminId,
        });
        ResponseFromDatabase.save().then(() => {
          res.status(201).json(company_name + " successfully created.");
        });
      }
    } else if (id === "customers") {
      const {
        customer_type,
        customer_name,
        nationality,
        phone,
        email,
        address,
        date_of_birth,
        gender,
        emirates_id,
        emirates_id_validity,
        uid_number,
        passport_number,
        passport_validity,
        file_number,
        visa_expiry_date,
        family_book_number,
        family_book_issued_date,
        profession,
        daman_policy_number,
        daman_card_number,
        daman_expiry_date,
        credit_limit,
        credit_limit_day,
        date_of_registration,
      } = req.body;
      let isFound = await model.CUSTOMERS_MODEL.findOne({ email: email, admin_id: req.session.branch_adminId });
      if (isFound) {
        res.status(302).json(email + " is the user " + isFound.customer_name + " already in your database");
      } else {
        let response_from_database = await model.CUSTOMERS_MODEL.create({
          customer_type: String(customer_type).replace(/\s+/g, " ").trim(),
          customer_name: String(customer_name).replace(/\s+/g, " ").trim(),
          nationality: String(nationality).replace(/\s+/g, " ").trim(),
          phone: phone,
          email: email,
          address: String(address).replace(/\s+/g, " ").trim(),
          date_of_birth: date_of_birth ? new Date(date_of_birth) : "",
          gender: String(gender).replace(/\s+/g, " ").trim(),
          emirates_id: emirates_id,
          emirates_id_validity: emirates_id_validity ? new Date(emirates_id_validity) : "",
          uid_number: uid_number,
          passport_number: passport_number,
          passport_validity: passport_validity ? new Date(passport_validity) : "",
          file_number: file_number,
          visa_expiry_date: visa_expiry_date ? new Date(visa_expiry_date) : "",
          family_book_number: family_book_number,
          family_book_issued_date: family_book_issued_date ? new Date(family_book_issued_date) : "",
          profession: String(profession).replace(/\s+/g, " ").trim(),
          daman_policy_number: daman_policy_number,
          daman_card_number: daman_card_number,
          daman_expiry_date: daman_expiry_date ? new Date(daman_expiry_date) : "",
          credit_limit,
          credit_limit_day,
          date_of_registration: date_of_registration ? new Date(date_of_registration) : new Date(),
          created_by: req.session.branch_name,
          admin_id: req.session.branch_adminId,
        });

        response_from_database.save().then(() => {
          res.status(201).json("Successfully created.");
        });
      }
    } else {
      res.status(400).json("Invalid request!");
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id === "companies") {
      let isFound = await model.COMPANIES_MODEL.find({ admin_id: req.session.branch_adminId });
      if (isFound) {
        res.status(200).json(isFound);
      } else {
        res.status(400).json("Invalid request!");
      }
    } else if (id === "customers") {
      let isFound = await model.CUSTOMERS_MODEL.find({ admin_id: req.session.branch_adminId });
      if (isFound) {
        res.status(200).json(isFound);
      } else {
        res.status(400).json("Invalid request!");
      }
    } else {
      res.status(400).json("Bad request!");
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
});

router.delete("/companies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let isFound = await model.COMPANIES_MODEL.findOne({_id: id, admin_id: req.session.branch_adminId})
    
    if(isFound){
      isFound.deleteOne().then(() => {
        res.status(204).json('Successfuly deleted.')
      })
    }
    else{
      res.status(400).json('Invalid request!')
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
});

router.delete("/customers/:id", async (req, res) => {
  const { id } = req.params;
  try{
    let isFound = await model.CUSTOMERS_MODEL.findOne({_id: id, admin_id: req.session.branch_adminId})
    if(isFound) {
      isFound.deleteOne().then(() => {
        res.status(204).json("successfuly deleted.")
      })
    }
    else{
      res.status(400).json('Invalid request!')
    }
  }
  catch(error) {
    res.status(400).json("Bad request!")
  }
})

module.exports = router;
