const express = require("express")
const router = express.Router()
const Item = require("../Models/Item")
const Category = require("../Models/Category")
////////////////////////////////////////////

///////////////////get All Category//////////
router.get("/getCategory", async (req, res) => {
  try {
    await Category.find({}).then((data, err) => {
      if (err) {
        res.send({ message: "get data failed", success: false, Data: err })
      } else {
        res.send({
          message: "get data successfully",
          success: true,
          Data: data,
        })
      }
    })
  } catch (err) {
    res.send(err)
  }
})
//////////////////get all item in the same category id//////////////////////
router.get("/getItem/:catId", async (req, res) => {
  try {
    await Item.find({
      $and: [{ status: "active" }, { categoryId: req.params.catId }],
    }).then((data, err) => {
      if (err) {
        res.send({ message: "get data failed", success: false, Data: err })
      } else {
        res.send({
          message: "get data successfully",
          success: true,
          Data: data,
        })
      }
    })
  } catch (err) {
    res.send(err)
  }
})
///////////////////////////////////////////////////
module.exports = router;
