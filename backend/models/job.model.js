const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema({
    title : {
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true ,
    },
    requirments : [{type : String }] ,
    salary : {
        type : Number ,
        required : true ,
    },
    location : {
        type : String ,
        required : true ,
    },
    jobType : {
        type : String ,
        required : true ,
    },
    position : {
        type : Number ,
        required : true ,
    },
    company : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "companies" ,
        required : true ,
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "users" ,
        required : true ,
    },
    requirments : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "applications" ,        
        }
    ]
} , {timestamps : true})



const Job = mongoose.model("jobs" , jobSchema)


module.exports = Job