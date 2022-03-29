const {Client} = require('pg'); 
const { DB_NAME, USER, DB_PASSWORD } = require('./constants');

const client = new Client({
    host: "localhost",
    user: USER,
    port: 5432,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = client;