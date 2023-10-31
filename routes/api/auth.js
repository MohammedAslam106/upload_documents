const express=require('express')
const userSchema=require('../../schemas/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const routes=express.Router()

routes.post('/signup',async(req,res)=>{
    try{
        const body=req.body
        console.log(body.username)
        if(!body.name || !body.username || !body.password){
            res.status(400).json({message:'Provide the valide information'})
            return
        }
        const hashedPassword=bcrypt.hashSync(body.password,10)
        const response=await userSchema.create({
            ...body,password:hashedPassword
        })
        res.json({message:response})
    }
    catch(error){
        res.json({error:error})
    }
})

routes.post('/signin',async(req,res)=>{
    const body=req.body
    if(!body.username || !body.password){
        res.status(400).json({message:'Put the valide login cradential'})
        return
    }
    try{
        const response=await userSchema.findOne({
        username:body.username,
    })
    if(!response){
        res.status(400).json({message:"User not found"})
        return
    }
    const verifyPassword=bcrypt.compareSync(body.password,response.password)
    if(!verifyPassword){
        res.status(400).json({message:'Wrong password'})
        return
    }
    const token=jwt.sign({response},"I don't know")
    res.json({token:token})
}
    catch(error){
        res.json({error:'error is here'})
    }
})

module.exports=routes;