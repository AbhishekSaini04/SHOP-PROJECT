const mongoose=require("mongoose");
const blogSchema=new mongoose.Schema({
    name:{
        type:String,
     
        required:true,
    },
    brand:{
        type:String,
        required:true,
      
    },
    problem:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },

    
},{timestamps:true});

const blogModel=mongoose.model("blog",blogSchema);
module.exports={blogModel};