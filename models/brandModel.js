const mongoose=require("mongoose");
const brandSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true,
    },
    
},{timestamps:true});

const brandModel=mongoose.model("brands",brandSchema);


module.exports={brandModel};