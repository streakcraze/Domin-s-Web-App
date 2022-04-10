const express = require('express');
const router = express.Router();
const Recruiter = require("../models/Recruiter");


//=================================
//             Recruiter
//=================================

router.post("/",(req,res) => {
const {body} = req;
const {userName,password,email} = body;

if(!userName){
    return( res.send({
        success: false,
        message:"Recruiter name required"
    }))
}
if(!password){
    return( res.send({
        success: false,
        message:"Password required"
    }))
}

if(!email){
    return( res.send({
        success: false,
        message:"Email required"
    }))
}
//save 
const newRecruiter = new Recruiter({
    recruiterName: userName,
    password,
    email
})

newRecruiter.save((error, recruiter) => {
    if(error){
        return res.send({
            success: false,
            message: "Failed. Server Error"
        })
    }


    res.send({
        success: true,
        message:"New Recruiter added!"
    })
})


})

module.exports = router;
