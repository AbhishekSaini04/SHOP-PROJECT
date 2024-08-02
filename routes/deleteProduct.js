const router=require("express").Router();
const {restrictTo}=require("../middlewares/auth");
const {productModel}=require("../models/productsModel");


router.post("/deleteproduct",restrictTo(["ADMIN"]),async(req,res)=>{
    const id=req.query.id;
const result=await productModel.deleteOne({_id:id});
// console.log(result);
return res.redirect("/dashboard/uploadedProducts");
});

module.exports=router;