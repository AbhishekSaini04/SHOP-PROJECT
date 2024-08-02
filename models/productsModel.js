const mongoose=require("mongoose");
const productSchema=new mongoose.Schema({
    name:{
        type:String,
     
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
        required:true,
      
    },
    image:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        required:true,
        enum: ['FOLDER', 'BATTERY']
    },
    tags:[{type:String}],
    
},{timestamps:true});

const productModel=mongoose.model("products",productSchema);


module.exports={productModel};