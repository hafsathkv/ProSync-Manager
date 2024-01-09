const router = require("express").Router();
const model = require("../../config/model");

router.get("/", async (req, res) => {
  try {
    let getAllData = await model.CATEGORY_MODEL.find({ admin_id: req.session.branch_adminId });
    console.log(getAllData);
    if (getAllData) {
      res.status(200).json(getAllData);
    } else {
      res.status(404).json("Data not found!");
    }
  } catch (error) {
    res.status(400).json("Bad request!");
  }
});


module.exports = router;