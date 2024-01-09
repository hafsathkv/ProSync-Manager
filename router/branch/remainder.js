const model = require("../../config/model");

const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    let getAllData = await model.REMINDERS_MODEL.find({ admin_id: req.session.branch_adminId });

    if (getAllData) {
      res.status(200).json(getAllData);
    } else {
      res.status(400).json("Bad request!");
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
});

router.post("/", async (req, res) => {
  const { service_category, reminder_date, client_type, client_id } = req.body;

  try {
    if (client_type === "companies") {
      let company = await model.COMPANIES_MODEL.findOne({ _id: client_id, admin_id: req.session.branch_adminId });

      let responseFromData = await model.REMINDERS_MODEL.create({
        service_category: String(service_category).replace(/\s+/g, " ").trim(),
        reminder_date: new Date(reminder_date),
        client_id: String(client_id).replace(/\s+/g, " ").trim(),
        client_type: String(client_type).replace(/\s+/g, " ").trim(),
        created_by: req.session.username,
        client_email: company.email,
        client_name: company.company_name,
        client_phone: company.phone,
        status: "pending",
        admin_id: req.session.branch_adminId,
      });

      responseFromData.save().then(() => {
        res.status(201).json("Reminder created.");
      });
    } else if (client_type === "customers") {
      let customer = await model.CUSTOMERS_MODEL.findOne({ _id: client_id, admin_id: req.session.branch_adminId });

      let responseFromData = await model.REMINDERS_MODEL.create({
        service_category: String(service_category).replace(/\s+/g, " ").trim(),
        reminder_date: new Date(reminder_date),
        client_id: String(client_id).replace(/\s+/g, " ").trim(),
        client_type: String(client_type).replace(/\s+/g, " ").trim(),
        created_by: req.session.username,
        client_email: customer.email,
        client_name: customer.customer_name,
        client_phone: customer.phone,
        status: "pending",
        admin_id: req.session.branch_adminId,
      });

      responseFromData.save().then(() => {
        res.status(201).json("Reminder created.");
      });
    } else {
      res.status(400).json("Bad request!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).json("Bad request!");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // model.REMINDERS_MODEL.findOneAndUpdate({_id: id, admin_id: req.session.branch_adminId},{ status: status})
    let isFound = await model.REMINDERS_MODEL.findOne({_id: id, admin_id: req.session.branch_adminId})
    if(isFound.status != status){
      isFound.updateOne({ status: status}).then(() => {
        res.status(200).json('successfully update.')
      })
    }
    else{
      res.status(400).json('Already '+isFound.status+"!")
    }
  } catch (error) {
    console.log(error)
    res.status(400).json("Bad request!");
  }
});

module.exports = router;
