const mongoose= require("mongoose");
const express=require('express');
const cors=require('cors')
const routesApi=require('./routes/api/index')
const dotenv=require('dotenv')
dotenv.config()
const MONGO_DB_CONNECTION=process.env.MONGO_DB_CONNECTION
console.log(MONGO_DB_CONNECTION)

mongoose.connect(`${MONGO_DB_CONNECTION}/generate_link`).then(res=>console.log('connected to mongoose')).catch(error=>console.log(error))

const api=express()

api.use(express.json())
api.use(cors())

api.use('/api',routesApi)

api.listen(3000,()=>{
    console.log('listening on port 3000')
})