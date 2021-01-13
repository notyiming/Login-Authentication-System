const express = require('express');
const router = express.Router();
const LoginManager = require("../loginManager").LoginManager;

router.get('/', (req, res) => {
    res.render('../views/pages/contacts', {isLoggedIn: LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'Contact Us'});
});


module.exports = router;
