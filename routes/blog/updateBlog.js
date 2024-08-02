const express = require("express");
const router = express.Router();
const multer = require("multer");
const { blogModel } = require("../../models/blogModel");
// const {brandModel}=require("../models/brandModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blogImage");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/updateblog", upload.single("image"), async (req, res) => {
  const id = req.query.id;
  let { name, problem, } = req.body;
  let image=String;
  if(req.file){

     image=req.file.filename;
  }else{
    image=undefined;

  }
  const product = await blogModel.findOne({ _id: id });
  const result = await blogModel.updateOne(
    { _id: id },
    {
      $set: {
        name: `${name ? name : product.name}`,
        problem:`${problem?problem:product.problem}`,
        image:`${image?image:product.image}`,
      },
    }
  );

  return res.json(result);
});

module.exports = router;
