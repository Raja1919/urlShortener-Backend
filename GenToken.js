const jwt=require ("jsonwebtoken")

const generateToken=(id)=>jwt.sign(
    {id},
    process.env.SECERT_KEY,
    {expiresIn:"1d"}

)
module.exports=generateToken
