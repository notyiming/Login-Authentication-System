const Account = require("../model/Account").Account;
const LoginManager = require("../loginManager").LoginManager;


let setUser = (req, res, next) => {
        const username = LoginManager.getUsername();
        Account.all(rows =>{
            if (username) {
                req.user = rows.find(user => user.username === username);

            }
            LoginManager.setUserObj(req.user);
            next();
        });
}

module.exports = {
    setUser
}