const mysql = require('mysql');

    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sagar",
        database: "Detail_Management"
    });

    db.connect(function (err) {
        if (err) {
            throw err;
        }
        else {
            process.env.db = db;
            console.log("Connected to database successfully...");
           
        }
    })
    
module.exports.db = db;


