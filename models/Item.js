const mongoose = require('mongoose');


const itemSchema = mongoose.Schema({
    jobTitle: {
        type:String,
        required: true,
        default:""
    },
    jobDescription: {
        type:String,
        required: true ,
        default:""
    },
    jobLocation: {
        type:String,
        required: true ,
        default:""
    },
    workExperience: {
        type:String,
        required: true ,
        default:""
    },
   
   
   
})




module.exports = mongoose.model('Item', itemSchema);