const express = require("express");
const router = express.Router(); 
const bcrypt = require("bcrypt");
const client = require('../connection.js');

router.get("/", async (req, res) => {
  res.status(200).json({ message: 'Get Request Working' });
}); 

router.post("/", async (req, res) => { 
  const {ccn, ccv, name, expiry} = req.body.payment;
 
  bcrypt.hash(ccn, 10, (err, encyptedCCN) => { 
    bcrypt.hash(ccv, 10, (err, encyptedCCV) => {
      
      let insertQuery = `insert into payments( ccn, ccv, name, expiry) 
      values( '${encyptedCCN}', '${encyptedCCV}', '${name}', '${expiry}')`

      client.query(insertQuery, (err, result)=>{
        if(!err){
          res.send('Insertion was successful')
        }
        else{ console.log(err.message) }
      })

      client.end;
    }); 
  }); 
});

module.exports = router;
