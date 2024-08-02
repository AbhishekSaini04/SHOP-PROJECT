// const sessionIDToUserMap=new Map();
const jwt=require("jsonwebtoken");
// const secretKey=process.env.SECRET_KEY;


function setUser(user){
    const secretKey=process.env.SECRET_KEY;
    const paload={
        _id:user._id,
        name:user.name,
    email:user.email,
    role:user.role,
    };
    return jwt.sign(paload,secretKey);
    
}

function getUser(token){
    const secretKey=process.env.SECRET_KEY;
    if(!token){return null}
    try {
        return jwt.verify(token,secretKey);
        
    } catch (error) {
        return null;
        
    }

}

module.exports={setUser,getUser};