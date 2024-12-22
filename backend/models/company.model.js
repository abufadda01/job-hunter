const mongoose = require("mongoose")


const companySchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
    },
    website : {
        type : String ,
    },
    location : {
        type : String ,
    },
    logo : {
        type : String ,
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true ,
    },
} , {timestamps : true})



const Company = mongoose.model("companies" , companySchema)


module.exports = Company