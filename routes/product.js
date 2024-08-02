const express=require("express");
const router=express.Router();
const {restrictTo}=require("../middlewares/auth")


router.get("/product/:product",restrictTo(["NORMAL","ADMIN"]),(req,res)=>{
const product=req.params.product;

return res.end(`Welcome to ${product}s`);
});

module.exports=router;