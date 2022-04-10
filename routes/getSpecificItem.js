const express = require("express");
const router = express.Router();

const Item = require("../models/Item");

router.get("/", (req, res) => {
    
    const {body} = req;
const {jobTitle} = body;

if(!jobTitle){
    return( res.send({
        success: false,
        message:"name required"
    }))
}

  Item.find({jobTitle:jobTitle}, (err, items) => {
    if (err) {
      return res.send({
        success: false,
        message: "Server Error",
      });
    }
    if (items == 0) {
        return res.send({
          success: false,
          message: "The vacancy you're looking for is unavailable",
        });
      }

      res.send(items);
   
  });
});

module.exports = router;