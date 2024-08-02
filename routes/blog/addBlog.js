const express=require("express");
const router=express.Router();
const multer=require("multer");
const {blogModel}=require("../../models/blogModel");
// const {brandModel}=require("../../models/brandModel");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/blogImage')
    },
    filename: function (req, file, cb) {

      cb(null, `${Date.now()}-${file.originalname}` );
    }
  })
  
  const upload = multer({ storage:storage})

router.post("/addblog",upload.single("image"),async(req,res)=>{
  let {name,brand,problem}=req.body;
  if(!(name && brand && req.file &&problem)){return res.end("All Fields are Required")};



  blogModel.create({
    name:name,
    problem:problem,
    brand:brand.toUpperCase(),
    image:`/blogImage/${req.file.filename}`,
  })


   return res.redirect("/dashboard/addblog");

});



module.exports=router;