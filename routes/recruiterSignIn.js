const express = require("express");
const router = express.Router();

//import the models
const Recruiter = require("../models/Recruiter");
const UserSession = require("../models/UserSession");
/*
Sign In 
*/

router.post("/", (req, res) => {
  const { body } = req;
  const { userName, password } = body;

  //make sure they are not blank
  if (!userName) {
    return res.send({
      success: false,
      message: "customerName field should not be empty",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "password field should not be empty",
    });
  } //field are not empty

  //make sure that the admin exists
  Recruiter.find({ recruiterName: userName }, (err, recruiter) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    if (recruiter == 0) {
      return res.send({
        success: false,
        message: "The user name does not exist",
      });
    }

    //user does exist
    //check if password is correct for that particular admin
    const currentRecruiter = recruiter[0];
    if (currentRecruiter.password != password ) {
      return res.send({
        success: false,
        message: "The password is incorrect",
      });
    }

    //Everything is OK
    //create an Admin session

    const newUserSession = new UserSession({
      userId: currentRecruiter.id,
    });

    //save the new user session

    newUserSession.save((err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: " User Session Server Error",
        });
      }

      res.send({
        success: true,
        message: "Recruiter Successfully Signed In",
        token: session.id,
      });
    });
  });
});

module.exports = router;