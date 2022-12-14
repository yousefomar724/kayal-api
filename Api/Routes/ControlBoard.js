const express = require("express")
const router = express.Router()
const multer = require("multer")
const Item = require("../Models/Item")
const Category = require("../Models/Category")
////////////////////multer to uplode image////////////////////////
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname)
  },
})
const multi_upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      const err = new Error("Only .png, .jpg and .jpeg format allowed!")
      err.name = "ExtensionError"
      return cb(err)
    }
  },
})
///////////////// create Cateory /////////////////////
router.post("/createCategory",multi_upload.single("image"),
  async (req, res) => {
    try {
      let image = req.file.path
      req.body.image = image
      // console.log(req.body);
      await Category.create(req.body, function (err, data) {
        if (err) {
          if(err.code == 11000){
            res.send({ message: " 🤦‍♂️هذا التصنيف موجود مسبقا", success: false, Data: err })
          }else{
            res.send({ message: " 😢 فشل  تسجيل هذا التصنيف الرجاء المحاوله مره اخري", success: false, Data: err })
          }
        } else {
          res.send({ message: " 👌 تم اضافه هذا التصنيف بنجاح ", success: true, Data: data })
        }
      })
    } catch (err) {
      res.send(err)
    }
  }
)
///////////////////get All Category//////////
router.get("/getCategory", async (req, res) => {
  try {
    await Category.find({}).then((data, err) => {
      if (err) {
        res.send({ massege: "get data failed", success: false, Data: err })
      } else {
        res.send({
          massege: "get data successfully",
          success: true,
          Data: data,
        })
      }
    })
  } catch (err) {
    res.send(err)
  }
})
//////////////////create Item///////////////////
router.post("/createItem", multi_upload.single("image"), async (req, res) => {
    try {
      let image = req.file.path
      req.body.image = image
      await Item.create(req.body, function (err, data) {
        if (err) {
          if(err.code == 11000){
            res.send({ message: " 🤦‍♂️هذا الصنف موجود مسبقا", success: false, Data: err })
          }else{
            res.send({ message: " 😢 فشل  تسجيل هذا الصنف الرجاء المحاوله مره اخري", success: false, Data: err })
          }
        } else {
          res.send({ message: " 👌 تم اضافه هذا الصنف بنجاح ", success: true, Data: data })
        }
      })
    } catch (err) {
      res.send(err)
    }
  })
/////////////////////// get Item for control board/////////////////////////////
router.get("/getItem/:catId", async (req, res) => {
    try {
        await Item.find({ categoryId: req.params.catId }).then((data, err) => {
        if (err) {
            res.send({ massege: "get data failed", success: false, Data: err })
        } else {
          res.send({
            massege: "get data successfully",
            success: true,
            Data: data,
          })
        }
      })
    } catch (err) {
      res.send(err)
    }
  })
////////////////////delete Category////////////////////
router.delete("/deleteCategory/:categoryId", async (req, res) => {
    try {
      await Category.deleteOne({ _id: req.params.categoryId }).then((data, err) => {
        if (err) {
          res.send({ massege: "delete data failed", success: false })
        } else {
            Item.deleteMany({categoryId:req.params.categoryId}).then((data2,err2)=>{
                res.send({ massege: "delete data successfully", success: true })
            })
        }
      })
    } catch (err) {
      res.send(err)
    }
  })
////////////////////delete Item ////////////////////
router.delete("/deleteItem/:itemId", async (req, res) => {
    try {
      await Item.deleteOne({ _id: req.params.itemId }).then((data, err) => {
        if (err) {
          res.send({ massege: "delete data failed", success: false })
        } else {
          res.send({ massege: "delete data successfully", success: true })
        }
      })
    } catch (err) {
      res.send(err)
    }
  })
//////////////////////update Item Status/////////////////////////
router.post("/updateItemStatus/:itemId", async (req, res) => {
    try {
      await Item.findOne({ _id:req.params.itemId }).then((data, err) => {
        if (err) {
          res.send({ massege:"Update item status failed", success: false, Data: err })
        } else {
          if(data.status == "active"){
            data.status = "inactive"
            data.save();
            res.send({
              massege: "Update item status successfully",
              success: true,
              Data: data,
            })
          }else{
            data.status = "active"
            data.save();
            res.send({
              massege: "Update item status successfully",
              success: true,
              Data: data,
            })
          }
        }
      })
    } catch (err) {
      res.send(err)
    }
  })
///////////////////////update  Item ////////////////////////////
router.post("/updateItem/:itemId",multi_upload.single("image"),
async(req,res)=>{
    try{
      let image = req.body.image;
      if(req.file != null){
        image = req.file.path
      }
        await Item.findOne({"_id":req.params.itemId}).then((data,err)=>{
            if(err){
                res.send({massege: "Update item  failed", success: false,Data:err});
            }else{
                // console.log(req.body)
                data.title = req.body.title
                data.price = req.body.price
                data.description = req.body.description
                data.calories = req.body.calories
                data.image = image
                data.save();
                res.send({massege: "Update item  successfully", success: true,Data:data});
            }
        });
    }catch(err){
        res.send(err);
    }
})
///////////////////////update  Category ////////////////////////////
router.post("/updateCategory/:CategoryId",multi_upload.single("image"),
async(req,res)=>{
  try{
    // console.log(req.body)
    let image = req.body.image;
    if(req.file != null){
      image = req.file.path
    }
      await Category.findOne({"_id":req.params.CategoryId}).then((data,err)=>{
          if(err){
              res.send({massege: "Update Category failed", success: false,Data:err});
          }else{
              data.title = req.body.title
              data.image = image
              data.save();
              res.send({massege: "Update Category successfully", success: true,Data:data});
          }
      });
  }catch(err){
      // console.log(err)
      res.send(err);
  }
})
///////////////////////////////////////////////////
module.exports = router;



