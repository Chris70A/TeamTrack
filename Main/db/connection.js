// Package to connect to a MySQL database 
const { createPromptModule } = require("inquirer");
const mysql = require("mysql2");

// connection to a MySQL database with the createconnection method 
const connection = mysql.createConnection({

    host: "127.0.0.1", // IP address // on Mac its 127.0.0.1
    user: "root", 
    password: " ",
    database: "employees" // Name of the database 
});


// Checking for errors.
connection.connect(function (err) {
    if (err) throw err;
});

// export the connection object
module.exports = connection;