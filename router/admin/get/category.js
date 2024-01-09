const model = require("../../../config/model");

async function categoryFunc(req, res) {
  try {
    let getAllData = await model.CATEGORY_MODEL.find({ admin_id: req.session.adminId });
    if(getAllData){
      res.status(200).json(getAllData);
    }
    else{
      res.status(404).json('category not found!')
    }
  } catch (error) {
    res.status(400).json("Bad request!")
  }
}

module.exports = categoryFunc;
