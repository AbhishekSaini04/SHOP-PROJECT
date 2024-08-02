const {getUser}=require("../services/userAuth");

function checkForAuthorization(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null;
    if(!tokenCookie){return next()}
    const user=getUser(tokenCookie);
    req.user=user;
    return next();




}

function restrictTo(roles=[]){
    return function (req,res,next){
        if(!req.user){return res.redirect("/login");}
        if(!roles.includes(req.user.role)){return res.end("UNAUTHORIZED");}
        return next();
    }
}

// function restrictUserToLoggedIn(req,res,next){
//     const tokenCookie=req.cookies?.token;
//     if(!tokenCookie){return res.redirect("/login");}
//     const user=getUser(tokenCookie);
//     if(!user){return res.redirect("/login")};
//  req.user=user;
//  next();

// }

// async function checkAuth(req,res,next){
//     const tokenCookie=req.cookies?.token;
//     const user=getUser(tokenCookie);
//  req.user=user;
//  next();

// }

// module.exports={restrictUserToLoggedIn,checkAuth,checkAuthorization}
module.exports={restrictTo,checkForAuthorization}