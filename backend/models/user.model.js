const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")



const userSchema = new mongoose.Schema({
    fullname : {
        type : String ,
        required : true
    },
    email : {
        type : String ,
        required : true ,
        unique : true
    },
    phone : {
        type : Number ,
        required : true ,
    },
    password : {
        type : String ,
        required : true ,
        select : false
    },
    role : {
        type : String ,
        required : true ,
        enum : ["student" , "recruiter"]
    },
    profile : {
        bio : {type : String} ,
        skills : [{type : String}] ,
        resume : {type : String} ,
        resumeOriginalName : {type : String} ,
        company : {type : mongoose.Schema.Types.ObjectId} ,
        profilePhoto : {
            type : String ,
            default : ""
        }
    }
} , {timestamps : true})



userSchema.pre("save" , async function(next){

    if(!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password , salt)
    this.password = hashedPassword
 
})



userSchema.methods.signJWT = function(){
    return jwt.sign({userId : this._id} , process.env.JWT_SECRET , {expiresIn : process.env.JWT_EXPIRE})
}


const User = mongoose.model("users" , userSchema)


module.exports = User