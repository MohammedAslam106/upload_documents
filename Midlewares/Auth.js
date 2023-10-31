const jwt=require('jsonwebtoken')

function jwtVerify(req,res,next){
    const authorization=req.headers.authorization
    if(!authorization){
        res.json({message:'signin first'})
        return
    }
    const token=authorization.replace('Bearer ','').trim()
    jwt.verify(token,"I don't know",(error,user)=>{
        if(error){
            res.json({error:error})
            return
        }
        req.user=user.response
        next()
    })
}

module.exports=jwtVerify