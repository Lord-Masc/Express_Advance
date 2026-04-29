const jwt = require("jsonwebtoken")
module.exports = (req,res,next)=>{
  const token = req.cookies.token
  if(!token) return res.redirect("/login")
 
    try{
        const decode = jwt.verify(token,"secretkey")
        req.user = decode;
        next()
    }catch(err){
        res.redirect("/login")
    }
}