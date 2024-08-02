const {usersModel}=require("../models/userModel");
// const {v4:uuidV4}=require("uuid");
const {setUser}=require("../services/userAuth");
async function userSignupHandler(req, res){
    const {name,email,password}=req.body;
    // console.log(name,email,password);
    
    if(name && email && password){
        // console.log("in if block");
await usersModel.create({
        name:name,
        email:email,
        password:password,
    }).then(()=>{
// res.json({success:true});
return res.redirect("/");
}).catch((err)=>{
    res.json({success:false,error:err});
    
    });
 
}
}

async function userLoginHandler(req, res){
    const {email,password}=req.body;
   const user= await usersModel.findOne({email:email,password:password});
   if(!user){
    return res.render("login",{
        error:"invalid username or password"
    }) ;
   }

  const token= setUser(user);

//    86400000 milliseconds in 1 day
// cookie is available for 10 days
   res.cookie("token",token,{maxAge:86400000*10});
   return res.redirect("/");
}
module.exports={userSignupHandler,userLoginHandler}