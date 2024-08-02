const express=require("express");
const router=express.Router();
const {restrictTo}=require("../middlewares/auth")
const {productModel}=require("../models/productsModel");


router.get("/brand/:brand",restrictTo(["NORMAL","ADMIN"]),async(req,res)=>{
const brand=req.params.brand;
const products=await productModel.find({brand:brand});
res.json(products)
});

module.exports=router;