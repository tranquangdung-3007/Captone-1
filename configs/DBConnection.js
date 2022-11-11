require('dotenv').config();
const mysql = require("mysql2");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dung3007",
    database: "hostelmanagementsystem"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;