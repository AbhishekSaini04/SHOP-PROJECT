const express=require("express");
const {userSignupHandler,userLoginHandler}=require("../controller/userHandler");
const router = express.Router();

router.post("/signup",userSignupHandler);
router.post("/login",userLoginHandler);
router.get("/logout",(req,res)=>{
    res.clearCookie("token");
    req.user=null;
    return res.redirect("/");

});


module.exports=router;