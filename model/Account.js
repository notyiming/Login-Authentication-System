const db = require('./db');

class Account {

    //get all accounts
    static all(callback)
    {   const sql = "SELECT * FROM Account"
        db.all(sql, [], (err, rows) => {
            if (err)
                return console.error(err.message);
            callback(rows);
        });
    }

    //get all data for the selected user
    static userAllData(username, callback)
    {   db.get('select * from User INNER JOIN Account on User.username = Account.username where User.username = ?', username, (err, row) => {
        if (err)
            return console.error(err.message);
        callback(row);
        });
    }

    //get all ordinary or guest users
    static allUser(role, callback)
    {   db.all('select * from User INNER JOIN Account on User.username = Account.username where (role = ? or role = ?)', role[0], role[1], (err, row) => {
        if (err)
            return console.error(err.message);
        callback(row);
    });
    }

    //get a specific user
    static find(username, callback)
    {   db.get('select * from Account where username = ?', username, (err, row) => {
            if (err)
                return console.error(err.message);
            callback(row);
        });
    }

    //Create a new user
    static create(data, callback)
    {   let sql = 'insert into Account(username, password, role)'+
        ' values (?, ?, ?)';
        db.run(sql, data.username, data.password, data.role, callback);
    }

    //Delete a specific user
    static delete(username, callback)
    {
        db.run('delete from Account where username = ?', username, callback);
    }

    //change a password for a specific user
    static changePassword(data, callback){
        db.run('update Account set password = ? where username = ?', data.hashedPassword, data.username, callback);
    }

    //change a role for a specific user
    static changeRole(data, callback){
        db.run('update Account set role = ? where username = ?', data.role, data.username, callback);
    }


}

module.exports = db;
module.exports.Account = Account;