const db = require('./db');

class User {
    //add a user
    static create(data, callback)
    {   let sql = 'insert into User(username, name, email)'+
        ' values (?, ?, ?)';
        db.run(sql, data.username, data.name, data.email, callback);

    }

    //To remove a specific user
    static delete(username, callback)
    {
        db.run('delete from User where username = ?', username, callback);
    }

}

module.exports = db;
module.exports.User = User;