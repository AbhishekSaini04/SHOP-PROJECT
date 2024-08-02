const mongoose=require("mongoose");

 function connectToDB( connectionString){
    if(typeof connectionString==="string"){

        
        mongoose.connect(connectionString).then(()=>{
        console.log("DB connected");
    }).catch((err)=>{
        console.log("DB not connected");
        console.log("Error:",err);
    });
}
return mongoose;
}


module.exports={connectToDB};