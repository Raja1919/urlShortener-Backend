require("dotenv").config()
const express =require('express')
const mongoose=require('mongoose');
const userRoutes=require("./Routes/userauth");
const urlRoutes=require("./Routes/urlshortener.js")
const cors=require("cors");
const isAuthendicated = require("./authendication/userauth");


const PORT=process.env.PORT

const url=process.env.MONGO_URL

const app=express();

app.use(express.json());

app.use(cors())

app.use('/url',isAuthendicated,urlRoutes)

app.use('/api',userRoutes)



// connect to mongodb

mongoose.set("strictQuery",false);

mongoose.connect(url)
.then(result=>{console.log("connected to mongodb")})
.catch((error)=>{
    console.log(error)
}) 




app.listen(PORT,()=>console.log(`server started localHost:${PORT}`))