const mongoose=require('mongoose')

const documentSchema=new mongoose.Schema({
    title:{type:String},
    document:{
        data:Buffer,
        contentType:String
    },
    user:{
        type:mongoose.Types.ObjectId,ref:'User',required:true
    }
},
    {timestamps:true}
)

const Document=new mongoose.model('Document',documentSchema)

module.exports=Document