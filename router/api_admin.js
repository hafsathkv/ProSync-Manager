const router = require("express").Router();
const model = require("../config/model");
const { adminFunctions } = require("./admin");

const isAdministrator = (req, res, next) => {
  if (req.session.adminLogin === true) {
    next();
  } else {
    res.status(403).json("Forbidden!");
  }
};

router.post("/login", adminFunctions.login.post);

router.get("/profile", (req, res) => {
  if (req.session.adminLogin) {
    res.status(200).json({
      id: req.session.adminId,
      email: req.session.adminEmail,
      username: req.session.adminUsername,
    });
  } else {
    res.status(422).json("Please login again!");
  }
});

router.post('/logout', (req, res) => {
  if(req.session.adminLogin){
    // req.session.destroy()
    res.status(200).json('Successfully logout.')
  }
  else{
    res.status(403).json('You are already logout!')
  }
})

router.use(isAdministrator);

router.get("/", (req, res) => {
  let client_ip = req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.headers["x-formarded-for"] || req.socket.remoteAddress || "";
  res.status(200).json({
    client_ip,
  });
});

//==============> End ping service

router.get("/task", adminFunctions.task.get);
router.post("/task", adminFunctions.task.post);
router.delete("/task/:id", adminFunctions.task.delete);
//==============> End service actions

router.get("/location", adminFunctions.location.get);
router.post("/location", adminFunctions.location.post);
router.delete("/location/:id", adminFunctions.location.delete);
router.put("/location/:id", adminFunctions.location.put);
//==============> End Location actions

router.get("/designation", adminFunctions.designation.get);
router.post("/designation", adminFunctions.designation.post);
router.delete("/designation/:id", adminFunctions.designation.delete);
router.put("/designation/:id", adminFunctions.designation.put);
//==============> End designation actions

router.get("/category", adminFunctions.category.get);
router.post("/category", adminFunctions.category.post);
router.delete("/category/:id", adminFunctions.category.delete);
router.put("/category/:id", adminFunctions.category.put);
//==============> End category actions

router.get("/branches", adminFunctions.branches.get);
router.post("/branches", adminFunctions.branches.post);
router.delete("/branches/:id", adminFunctions.branches.delete);
router.put("/branches/:id", adminFunctions.branches.put);
//==============> End branch actions

router.get("/notification", adminFunctions.Notification.get);
router.post("/notification", adminFunctions.Notification.post);
router.delete("/notification/:id", adminFunctions.Notification.delete);
router.put("/notification/:id", adminFunctions.Notification.put);
//==============> End notification actions

module.exports = router;
