const express = require('express');
const router = express.Router();
const LoginManager = require("../loginManager").LoginManager;

router.get('/', (req, res) => {
    res.render('../views/pages/about', {isLoggedIn: LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'About Us'});
});



module.exports = router;
