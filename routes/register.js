const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../model/User").User;
const Account = require("../model/Account").Account;
const { checkIfUserExistRegister } = require('../middleware/checkIfUserExists');

router.get('/', (req, res) => {
    res.render('../views/pages/register', {pageTitle:'Register for an Account', errorMessage: null});
});


router.post('/', checkIfUserExistRegister, async (req, res) => {
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
        res.redirect('/login');
    } catch {
        res.redirect('/register');
    }
});

module.exports = router;