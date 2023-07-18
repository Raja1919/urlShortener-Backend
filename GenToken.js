const jwt=require ("jsonwebtoken")

const generateToken=(id)=>jwt.sign(
    {id},
    process.env.SECERT_KEY,
    {expiresIn:"20d"}

)
module.exports=generateToken