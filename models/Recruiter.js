const mongoose = require('mongoose');


const recruiterSchema = mongoose.Schema({
    recruiterName: {
        type: String,
        default: "",
        required: true,
      },
      password: {
        type: String,
        default: "",
        required: true,
      },
    email: {
        type:String,
        required: true ,
        default:""
    },
   
   
})




module.exports = mongoose.model('Recruiter', recruiterSchema);