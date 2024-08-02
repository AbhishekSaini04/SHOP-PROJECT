const express = require("express");
const router = express.Router();
const multer = require("multer");
const { productModel } = require("../models/productsModel");
// const {brandModel}=require("../models/brandModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/updateproduct", upload.single("image"), async (req, res) => {
  const id = req.query.id;
  let { name, price, brand, type } = req.body;
  try {
    price = Number(price);
  } catch (err) {
    return res.end("Price should be in NUMBERS!");
  }
const product=await productModel.findOne({_id:id});
  const tags = name.split(" ");
  tags.push(brand);
  tags.push(price);
  const result=await productModel.updateOne({_id:id},{$set:{name:`${name?name:product.name}`,brand:`${brand?brand:product.brand}`,type:`${type?type:product.type}`,price:`${price?price:product.price}`,tags:`${tags?tags:product.tags}`}})


  return res.json(result)
});

module.exports = router;
