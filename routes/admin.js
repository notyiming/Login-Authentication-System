const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Account = require("../model/Account").Account;
const User = require("../model/User").User;
const { authUser, authRole } = require('../middleware/authenticate');
const LoginManager = require("../loginManager").LoginManager;
const { checkIfUserExistAdmin } = require('../middleware/checkIfUserExists');

router.get('/', authUser, authRole('admin'), (req, res) => {
    const roles = ['guest', 'ordinary'];
    Account.allUser(roles, row => {
        res.render('../views/pages/admin', {userToDisplay:row, isLoggedIn:LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'Admin Board'});
    })
});

router.get('/edit/:username',(req, res) => {
    const username = req.params.username;
    Account.find(username,row => {
        res.render('../views/pages/editAccount', {userToDisplay:row, isLoggedIn:LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'Admin Board | Edit Account'});
    })
});

router.post('/edit/:username', async (req, res) => {
    const username = req.params.username;
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const role = req.body.role;
    if(req.body.password!==''){
        Account.changePassword({username, hashedPassword}, err =>{
            if (err)
                console.error(err.message);
        });
    }
    Account.changeRole({username, role}, err =>{
        if (err)
            console.error(err.message);
    });
    res.redirect('/admin');
});

router.get('/delete/:username',(req, res) => {
    const username = req.params.username;
    Account.userAllData(username,row => {
        res.render('../views/pages/deleteAccount', {userToDisplay:row, isLoggedIn:LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'Admin Board | Delete Account'});
    })
});

router.post('/delete/:username',  (req, res) => {
   const username = req.params.username;
    Account.delete(username, (err) =>{
        if (err)
            console.error(err.message);
    });

    User.delete(username, (err) =>{
        if (err)
            console.error(err.message);
    });
    res.redirect('/admin');
});

router.get('/create',(req, res) => {
    res.render('../views/pages/addAccount', {isLoggedIn:LoginManager.getLoginStatus(),user: LoginManager.getUserObj(), pageTitle:'Admin Board | Create Account', errorMessage: null});
});

router.post('/create', checkIfUserExistAdmin, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {
            username:req.body.username,
            name: req.body.name,
            email: req.body.email
        }
        const account = {
            username:req.body.username,
            password:hashedPassword,
            role:'ordinary'
        }
        User.create(user);
        Account.create(account);
        res.redirect('/admin');
    } catch {
        res.redirect('/admin/create');
    }
});

router.get('/view/:username',(req, res) => {
    const username = req.params.username;
    Account.userAllData(username,row => {
        res.render('../views/pages/viewAccount', {userToDisplay:row, isLoggedIn:LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'Admin Board | View Account'});
    })
});

module.exports = router;
