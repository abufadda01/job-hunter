const mongoose = require("mongoose")


const applicationSchema = new mongoose.Schema({
    job : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "jobs" ,
        required : true ,
    },
    applicant : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true ,
    },
    status : {
        type : String ,
        enum : ["pending" , "accepted" , "rejected"] ,
        default : "pending"
    }
} , {timestamps : true})



const Application = mongoose.model("applications" , applicationSchema)


module.exports = Application