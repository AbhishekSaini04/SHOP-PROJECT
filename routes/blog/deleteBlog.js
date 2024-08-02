const router=require("express").Router();
const {restrictTo}=require("../../middlewares/auth");
const {blogModel}=require("../../models/blogModel");


router.post("/deleteblog",restrictTo(["ADMIN"]),async(req,res)=>{
    const id=req.query.id;
const result=await blogModel.deleteOne({_id:id});
// console.log(result);
return res.redirect("/dashboard/uploadedBlogs");
});
module.exports=router;