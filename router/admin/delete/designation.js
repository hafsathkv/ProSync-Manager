const model = require("../../../config/model");

async function designation(req, res) {
  const { id } = req.params;
  try {
    let isFound = await model.DESIGNATION_MODEL.findOne({ _id: id });
    if (isFound) {
      isFound
        .deleteOne()
        .then(() => {
          res.status(204).json("Successfully deleted.");
        })
        .catch(() => {
          res.status(400).json("Bad requirest!");
        });
    } else {
      res.status(404).json("Data not found in database.");
    }
  } catch (error) {
    res.status(400).json('Data not deleted!');
  }
}

module.exports = designation;
