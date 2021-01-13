const path = require('path');
const sqlite3 = require('sqlite3').verbose();

let DB_PATH = path.join(__dirname, "project2020.db");
let db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, (err) => {
    if (err)
        console.error(err.message);
    console.log('Connected to ' + DB_PATH + ' database.')

    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON;', (error) => {
        if (error)
            console.error("Pragma statement didn't work.");
        else
            console.log("Foreign Key Enforcement is on.");
    });
});

module.exports = db;
