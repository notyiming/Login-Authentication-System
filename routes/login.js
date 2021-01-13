const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require("../model/Account").Account;
const LoginManager = require("../loginManager").LoginManager;


router.get('/', (req, res) => {
    res.render('../views/pages/login', {errorMessage: null, pageTitle:'Login'});
});

router.post('/',  (req, res) => {
    //get all accounts
    Account.all(async rows =>{
        //get the user that has the requested username
        let user = rows.find(user => user.username === req.body.username);
        //return 404 if user not found
        if(user == null){
            res.status(404);
            res.render('../views/pages/login', {errorMessage: "User doesn't exist", pageTitle:"Login"});
        } else {
            try {
                //check hashed password
                if (await bcrypt.compare(req.body.password, user.password)) {
                    //check user role
                    LoginManager.setUsername(req.body.username);
                    LoginManager.login();
                    const role = user.role;
                    if (role === 'admin')
                        res.redirect('/admin');
                    else if (role === 'ordinary')
                        res.redirect('/about');
                    else if (role === 'guest')
                        res.redirect('/contacts');
                    console.log("Logged in");
                } else {
                    //password incorrect
                    console.log("Password Incorrect");
                    res.status(401);
                    res.render('../views/pages/login', {errorMessage: "Password Incorrect", pageTitle:'Login'});
                }
            } catch {
                res.status(500);
                console.log("Something went wrong")
                res.redirect('/login');
            }
        }
    });
});

module.exports = router;