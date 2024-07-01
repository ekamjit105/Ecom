const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    wishlist:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    addresses:{
        type:Array
    }

},{timestamp:true}
)

const userModel = mongoose.model('users',userSchema)
module.exports =userModel


