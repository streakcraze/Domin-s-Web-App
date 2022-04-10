const express = require('express');
const router = express.Router();
const Item = require("../models/Item");


//=================================
//             Item
//=================================

router.post("/",(req,res) => {
const {body} = req;
const {jobTitle,jobDescription,jobLocation,workExperience} = body;

if(!jobTitle){
    return( res.send({
        success: false,
        message:"name required"
    }))
}
if(!jobDescription){
    return( res.send({
        success: false,
        message:"owner required"
    }))
}
if(!jobLocation){
    return( res.send({
        success: false,
        message:"owner required"
    }))
}
if(!workExperience){
    return( res.send({
        success: false,
        message:"owner required"
    }))
}


//save 
const newItem = new Item({
    jobTitle,
    jobDescription,
    jobLocation,
    workExperience
})

newItem.save((error,item) => {
    if(error){
        return res.send({
            success: false,
            message: "error"
        })
    }


    res.send({
        success: true,
        message:"New Vacancy added successfully!"
    })
})


})

module.exports = router;
