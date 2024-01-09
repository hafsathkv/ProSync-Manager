const router = require("express").Router();
const clientRouter = require("./branch/client");
const authRouter = require("./branch/auth");
const categoryRouter = require("./branch/category");
const reminderRouter = require("./branch/remainder");
const billingRouter = require("./branch/billing");

const isBranch = (req, res, next) => {
  if (req.session.branchLogin === true) {
    next();
  } else {
    res.status(403).json("Please login then use!");
  }
};

router.get("/", (req, res) => {
  res.status(404).json("Bad request");
});

router.use("/login", authRouter);

router.get("/profile", (req, res) => {
  let client_ip = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-formarded-for"] || req.socket.remoteAddress || "";
  if (req.session.branchLogin) {
    res.status(200).json({
      id: req.session.branchId,
      email: req.session.email,
      username: req.session.username,
      branch_name: req.session.branch_name,
      vat_or_registration: req.session.vat_or_registration,
      location: req.session.location,
      address: req.session.address,
      phone: req.session.phone,
      branch_adminId: req.session.branch_adminId,
      client_ip: client_ip
    });
  } else {
    res.status(422).json("Please login again!");
  }
});
/* ==================={ with validation }=================== */

// router.use(isBranch);
router.use("/reminder", reminderRouter);
router.use("/category", categoryRouter);
router.use("/client", clientRouter);
router.use("/billing", billingRouter);

module.exports = router;
