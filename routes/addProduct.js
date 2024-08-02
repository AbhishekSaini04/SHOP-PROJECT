const express=require("express");
const router=express.Router();
const multer=require("multer");
const {productModel}=require("../models/productsModel");
const {brandModel}=require("../models/brandModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/products')
    },
    filename: function (req, file, cb) {

      cb(null, `${Date.now()}-${file.originalname}` );
    }
  })
  
  const upload = multer({ storage:storage})

router.post("/addproduct",upload.single("image"),async(req,res)=>{
  let {name,price,brand,type}=req.body;
  if(!(name && price && brand && req.file &&type)){return res.end("All Fields are Required")};
 try{

   price=Number(price);
  }catch (err){
    return res.end("Price should be in NUMBERS!");
  }
  
const tags=name.split(" ");
tags.push(brand);
tags.push(price);


  productModel.create({
    name:name,
    price:price,
    brand:brand.toUpperCase(),
    type:type,
    tags:tags,
    image:`/products/${req.file.filename}`,
  })


   return res.redirect("/dashboard/addproduct");

});



module.exports=router;