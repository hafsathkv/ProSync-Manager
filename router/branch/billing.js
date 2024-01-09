const model = require("../../config/model");
const expressValidator = require('express-validator')
const router = require("express").Router();

router.get("/:type", async (req, res) => {
  const { type } = req.params;
  const { status } = req.query;
  try {
    if (type === "company") {
      //>method:get ======================> company
      if (status === "pending") {
        let responseFromData = await model.COMPANY_BILLING_MODEL.find({ admin_id: req.session.branch_adminId });

        if (responseFromData) {
          res.status(200).json(responseFromData);
        } else {
          res.status(400).json("Invalid request!");
        }
      } else {
        res.status(400).json("Bad request!");
      }
    } else if (type === "customer") {
      //>method:get ======================> customer

      if (status === "pending") {
        let responseFromData = await model.CUSTOMER_BILLING_MODEL.find({ admin_id: req.session.branch_adminId });

        if (responseFromData) {
          res.status(200).json(responseFromData);
        } else {
          res.status(400).json("Invalid request!");
        }
      } else {
        res.status(400).json("Bad request!");
      }
    } else if (type === "counter") {
      //>method:get ======================> counter

      if (status === "pending") {
        let responseFromData = await model.COUNTER_BILLING_MODEL.find({ admin_id: req.session.branch_adminId });

        if (responseFromData) {
          res.status(200).json(responseFromData);
        } else {
          res.status(400).json("Invalid request!");
        }
      } else {
        res.status(400).json("Bad request!");
      }
    } else if (type === "invoice") {
      //>method:get ======================> invoice

      const { id, type } = req.query;
      if (id) {
        let isFound;
        if (type === "company") {
          isFound = await model.COMPANY_BILLING_MODEL.findOne({ _id: id, admin_id: req.session.branch_adminId });
        } else if (type === "customer") {
          isFound = await model.CUSTOMER_BILLING_MODEL.findOne({ _id: id, admin_id: req.session.branch_adminId });
        } else if (type === "counter") {
          isFound = await model.COUNTER_BILLING_MODEL.findOne({ _id: id, admin_id: req.session.branch_adminId });
        }

        if (isFound) {
          res.status(200).json({
            id: isFound.id,
            date: isFound.createdOn,
            payment_mode: isFound.payment_mode,
            name: type === "company" ? isFound.company_name : type === "customer" ? isFound.customer_name : isFound.counter_name,
            bills: isFound.bills,
            bill_amount: isFound.bill_amount,
            paid_amount: isFound.paid_amount,
            balance_amount: isFound.balance_amount,
          });
        } else {
          res.status(400).json("Invalid id!");
        }
      } else {
        res.status(406).json("Method not allowed!");
      }
    } else {
      res.status(400).json("Bad request!");
    }
  } catch (error) {
    res.status(500).json("Bad request!");
  }
});

router.post("/:type", async (req, res) => {
  const { type } = req.params;
  try {
    //method:post ======================> company

    if (type === "company") {
      const {
        company_name,
        company_id,
        bills,
        total_typing_amount,
        total_govt_amount,
        grand_total_amount,
        tax_amount,
        cross_total_amount,
        discount,
        payment_mode,
        bill_amount,
        payable_amount,
        paid_amount,
        balance_amount,
        payment_details,
        remark,
        cheque_bank_name,
        cheque_number,
        cheque_date,
        card_holder_name,
        card_bank_name,
        card_number,
        credited_bank_account,
      } = req.body;
      let isFound = await model.COMPANIES_MODEL.findOne({ admin_id: req.session.branch_adminId, _id: company_id });
      if (isFound) {
        if (payment_mode === "cash") {
          //>method:post ======================> company [ mode cash ]

          let responseFromData = await model.COMPANY_BILLING_MODEL.create({
            company_id: company_id,
            company_name: String(company_name).replace(/\s+/g, " ").trim(),
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: bill_amount,
            payable_amount: payable_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else if (payment_mode === "credit") {
          //>method:post ======================> company [ mode credit ]

          let responseFromData = await model.COMPANY_BILLING_MODEL.create({
            company_id: company_id,
            company_name: String(company_name).replace(/\s+/g, " ").trim(),
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: Number(bill_amount),
            payable_amount: bill_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else if (payment_mode === "cheque" && cheque_bank_name && cheque_number && cheque_date) {
          //>method:post ======================> company [ mode cheque ]

          let responseFromData = await model.COMPANY_BILLING_MODEL.create({
            company_id: company_id,
            company_name: String(company_name).replace(/\s+/g, " ").trim(),
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: Number(bill_amount),
            payable_amount: bill_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            cheque_bank_name: String(cheque_bank_name).replace(/\s+/g, " ").trim(),
            cheque_number: cheque_number,
            cheque_date: cheque_date,
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else if (payment_mode === "card" && card_bank_name && card_holder_name && card_number && credited_bank_account) {
          //>method:post ======================> company [ mode card ]

          let responseFromData = await model.COMPANY_BILLING_MODEL.create({
            company_id: company_id,
            company_name: String(company_name).replace(/\s+/g, " ").trim(),
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: Number(bill_amount),
            payable_amount: bill_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            card_holder_name: String(card_holder_name).replace(/\s+/g, " ").trim(),
            card_bank_name: String(card_bank_name).replace(/\s+/g, " ").trim(),
            card_number: card_number,
            credited_bank_account: String(credited_bank_account).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else {
          res.status(400).json("Please discribe the payment method!");
        }
      } else {
        res.status(400).json("Invalid request!");
      }
    } else if (type === "customer") {
      //method:post ======================> CUSTOMER

      const {
        customer_name,
        customer_id,
        bills,
        total_typing_amount,
        total_govt_amount,
        grand_total_amount,
        tax_amount,
        cross_total_amount,
        discount,
        payment_mode,
        bill_amount,
        payable_amount,
        paid_amount,
        balance_amount,
        payment_details,
        remark,
        cheque_bank_name,
        cheque_number,
        cheque_date,
        card_holder_name,
        card_bank_name,
        card_number,
        credited_bank_account,
      } = req.body;
      let isFound = await model.CUSTOMERS_MODEL.findOne({ admin_id: req.session.branch_adminId, _id: customer_id });
      if (isFound) {
        if (payment_mode === "cash") {
          //>method:post ======================> CUSTOMER [ MODE cash ]

          //save the cash for the casg
          let responseFromDatabase = await model.CUSTOMER_BILLING_MODEL.create({
            customer_name: String(customer_name).replace(/\s+/g, " ").trim(),
            customer_id: customer_id,
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: bill_amount,
            payable_amount: payable_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromDatabase
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else if (payment_mode === "credit") {
          //>method:post ======================> CUSTOMER [ MODE credit ]
          //save the customer credit option
          let responseFromData = await model.CUSTOMER_BILLING_MODEL.create({
            customer_name: String(customer_name).replace(/\s+/g, " ").trim(),
            customer_id: customer_id,
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: Number(bill_amount),
            payable_amount: bill_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else if (payment_mode === "cheque") {
          //method:post ======================> CUSTOMER [ MODE cheque ]

          let responseFromData = await model.CUSTOMER_BILLING_MODEL.create({
            customer_name: String(customer_name).replace(/\s+/g, " ").trim(),
            customer_id: customer_id,
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: Number(bill_amount),
            payable_amount: bill_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            cheque_bank_name: String(cheque_bank_name).replace(/\s+/g, " ").trim(),
            cheque_date: cheque_date,
            cheque_number: cheque_number,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else if (payment_mode === "card") {
          //method:post ======================> CUSTOMER [ MODE card ]

          let responseFromData = await model.CUSTOMER_BILLING_MODEL.create({
            customer_name: String(customer_name).replace(/\s+/g, " ").trim(),
            customer_id: customer_id,
            bills: bills,
            total_typing_amount: Number(total_typing_amount),
            total_govt_amount: Number(total_govt_amount),
            grand_total_amount: Number(grand_total_amount),
            tax_amount: Number(tax_amount),
            cross_total_amount: Number(cross_total_amount),
            discount: Number(discount),
            payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
            bill_amount: Number(bill_amount),
            payable_amount: bill_amount,
            paid_amount: paid_amount,
            balance_amount: balance_amount,
            card_bank_name: String(card_bank_name).replace(/\s+/g, " ").trim(),
            card_holder_name: String(card_holder_name).replace(/\s+/g, " ").trim(),
            card_number: card_number,
            credited_bank_account: credited_bank_account,
            payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
            remark: String(remark).replace(/\s+/g, " ").trim(),
            createdOn: Date.now(),
            admin_id: req.session.branch_adminId,
            created_by: req.session.username,
          });

          responseFromData
            .save()
            .then((e) => {
              res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
            })
            .catch(() => {
              res.status(500).json("Something went wrong to save your data to database!");
            });
        } else {
          res.json(400).json("Please describe the payment method!");
        }
      } else {
        res.status(400).json("Invalid request!");
      }
    } else if (type === "counter") {
      //method:post ======================> COUNTER

      const {
        counter_name,
        counter_phone,
        counter_email,
        counter_address,
        bills,
        total_typing_amount,
        total_govt_amount,
        grand_total_amount,
        tax_amount,
        cross_total_amount,
        discount,
        payment_mode,
        bill_amount,
        payable_amount,
        paid_amount,
        balance_amount,
        payment_details,
        remark,
        cheque_bank_name,
        cheque_number,
        cheque_date,
        card_holder_name,
        card_bank_name,
        card_number,
        credited_bank_account,
      } = req.body;

      if (payment_mode === "cash" || payment_mode === "credit") {
        //method:post ======================> COUNTER [ MODE cash, credit ]

        let responseFromData = await model.COUNTER_BILLING_MODEL.create({
          counter_name: String(counter_name).replace(/\s+/g, " ").trim(),
          counter_email: counter_email,
          counter_phone: counter_phone,
          counter_address: String(counter_address).replace(/\s+/g, " ").trim(),
          bills: bills,
          total_typing_amount: Number(total_typing_amount),
          total_govt_amount: Number(total_govt_amount),
          grand_total_amount: Number(grand_total_amount),
          tax_amount: Number(tax_amount),
          cross_total_amount: Number(cross_total_amount),
          discount: Number(discount),
          payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
          bill_amount: bill_amount,
          payable_amount: payable_amount,
          paid_amount: paid_amount,
          balance_amount: balance_amount,
          payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
          remark: String(remark).replace(/\s+/g, " ").trim(),
          createdOn: Date.now(),
          admin_id: req.session.branch_adminId,
          created_by: req.session.username,
        });

        responseFromData
          .save()
          .then((e) => {
            res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
          })
          .catch(() => {
            res.status(500).json("Something went wrong to save your data to database!");
          });
      } else if (payment_mode === "cheque") {
        //method:post ======================> COUNTER [ MODE cheque ]

        let responseFromData = await model.COUNTER_BILLING_MODEL.create({
          counter_name: String(counter_name).replace(/\s+/g, " ").trim(),
          counter_email: counter_email,
          counter_phone: counter_phone,
          counter_address: String(counter_address).replace(/\s+/g, " ").trim(),
          bills: bills,
          total_typing_amount: Number(total_typing_amount),
          total_govt_amount: Number(total_govt_amount),
          grand_total_amount: Number(grand_total_amount),
          tax_amount: Number(tax_amount),
          cross_total_amount: Number(cross_total_amount),
          discount: Number(discount),
          payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
          bill_amount: bill_amount,
          payable_amount: payable_amount,
          paid_amount: paid_amount,
          balance_amount: balance_amount,
          payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
          cheque_bank_name: String(cheque_bank_name).replace(/\s+/g, " ").trim(),
          cheque_date: cheque_date,
          cheque_number: cheque_number,
          remark: String(remark).replace(/\s+/g, " ").trim(),
          createdOn: Date.now(),
          admin_id: req.session.branch_adminId,
          created_by: req.session.username,
        });

        responseFromData
          .save()
          .then((e) => {
            res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
          })
          .catch(() => {
            res.status(500).json("Something went wrong to save your data to database!");
          });
      } else if (payment_mode === "card") {
        //method:post ======================> COUNTER [ MODE card ]
        let responseFromData = await model.COUNTER_BILLING_MODEL.create({
          counter_name: String(counter_name).replace(/\s+/g, " ").trim(),
          counter_email: counter_email,
          counter_phone: counter_phone,
          counter_address: String(counter_address).replace(/\s+/g, " ").trim(),
          bills: bills,
          total_typing_amount: Number(total_typing_amount),
          total_govt_amount: Number(total_govt_amount),
          grand_total_amount: Number(grand_total_amount),
          tax_amount: Number(tax_amount),
          cross_total_amount: Number(cross_total_amount),
          discount: Number(discount),
          payment_mode: String(payment_mode).replace(/\s+/g, " ").trim(),
          bill_amount: bill_amount,
          payable_amount: payable_amount,
          paid_amount: paid_amount,
          balance_amount: balance_amount,
          payment_details: String(payment_details).replace(/\s+/g, " ").trim(),
          card_bank_name: String(card_bank_name).replace(/\s+/g, " ").trim(),
          card_holder_name: String(card_holder_name).replace(/\s+/g, " ").trim(),
          card_number: card_number,
          credited_bank_account: credited_bank_account,
          remark: String(remark).replace(/\s+/g, " ").trim(),
          createdOn: Date.now(),
          admin_id: req.session.branch_adminId,
          created_by: req.session.username,
        });

        responseFromData
          .save()
          .then((e) => {
            res.status(200).json({ msg: "Successfuly bill created.", invoice_id: e.id });
          })
          .catch(() => {
            res.status(500).json("Something went wrong to save your data to database!");
          });
      } else {
        res.json(400).json("Please describe the payment method!");
      }
    } else {
      res.status(400).json("Bad request!");
    }
  } catch (error) {
    res.status(500).json("Bad request!");
  }
});

router.put("/:type", (req, res) => {
  const { type } = req.params;
  if (type === "company") {
    console.log(req.body);
  } else if (type === "customer") {
  } else if (type === "counter") {
  } else {
    res.status(400).json("Bad request!");
  }
});

router.delete("/:type", async (req, res) => {
  const { type } = req.params;
  const { id } = req.query
  
  try {
    if (type === "company") {
      let isFound = await model.COMPANY_BILLING_MODEL.findOne({_id: id, admin_id: req.session.branch_adminId})
      if(isFound){
        isFound.deleteOne().then(() => {
          res.status(204).json("successfuly deleted.")
        })
        .catch(() => {
          res.status(500).json('Something went wrong!')
        })
      }
      else{
        res.status(400).json('Invalid request!')
      }
    } else if (type === "customer") {
      let isFound = await model.CUSTOMER_BILLING_MODEL.findOne({_id: id, admin_id: req.session.branch_adminId})
      
      if(isFound){
        isFound.deleteOne().then(() => {
          res.status(204).json('successfuly deleted.')
        })
        .catch(() => {
          res.status(500).json('Something went wrong!')
        })
      }
    } else if (type === "counter") {
      let isFound = await model.COUNTER_BILLING_MODEL.findOne({_id: id, admin_id: req.session.branch_adminId})
      
      if(isFound){
        isFound.deleteOne().then(() => {
          res.status(204).json('successfuly deleted.')
        })
        .catch(() => {
          res.status(500).json('Something went wrong!')
        })
      }
    } else {
      res.status(400).json("Bad request!");
    }
  } catch (error) {
    res.status(500).json("Bad request!");
  }
});

module.exports = router;
