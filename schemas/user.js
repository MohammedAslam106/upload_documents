
const validateEmail=(email)=>{
    const pattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return pattern.test(email)
}
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,minLength:3},
    username:{type:String,
        required:'This field is mandatory',
        unique:true,
        trim:true,
        lowercase:true,
        validate:[validateEmail,'Please fill a valid email address']
    },
    password:{type:String,required:true},
},
    {timestamps:true}
)


const User=new mongoose.model('User',userSchema)

module.exports=User;