const express = require('express');
const cors = require('cors');  
const payments = require('./routes/payments');
const client = require('./connection.js');
const bodyParser = require("body-parser");
 
const app = express();
 
// Connecting with local Postgres Database
client.connect();
console.log('DB Connected...');
 
// Application Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
 
app.use('/payments', payments);
 
// Port Configuration
app.listen(5000, ()=>{
    console.log('API is running on port 5000...');
});