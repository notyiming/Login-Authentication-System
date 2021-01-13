const Account = require("../model/Account").Account;
const LoginManager = require("../loginManager").LoginManager;


let checkIfUserExistRegister = (req, res, next) => {
    Account.all(rows =>{
        let user = rows.find(user => user.username === req.body.username);
        if(user != null){
            console.log("exist");
            res.render('../views/pages/register', {errorMessage: "Username Taken", pageTitle:'Register'});
        } else {
            next();
        }
    });

}

let checkIfUserExistAdmin = (req, res, next) => {
    Account.all(rows =>{
        let user = rows.find(user => user.username === req.body.username);
        if(user != null){
            console.log("exist");
            res.render('../views/pages/addAccount', {isLoggedIn:LoginManager.getLoginStatus(),user: LoginManager.getUserObj(), errorMessage: "Username Taken", pageTitle:'Admin Board | Create Account'});
        } else {
            next();
        }
    });

}

module.exports = {
    checkIfUserExistRegister, checkIfUserExistAdmin
}