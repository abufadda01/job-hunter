const mongoose = require("mongoose")


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



const User = mongoose.model("users" , userSchema)


module.exports = User