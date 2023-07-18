const jwt=require("jsonwebtoken");

const isAuthendicated=(req,res,next)=>{
    const token=req.headers["x-auth-token"]
    console.log(token)
    if(!token){
         return res.status(400).json({message:"invalid Authorization"})
    }
    const decode= jwt.verify(token,process.env.SECERT_KEY);
    console.log(decode)
    next()
}
  
module.exports=isAuthendicated