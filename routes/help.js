const express = require('express');
const router = express.Router();
const LoginManager = require("../loginManager").LoginManager;

router.get('/', (req, res) => {
    res.render('../views/pages/help', {isLoggedIn: LoginManager.getLoginStatus(), user: LoginManager.getUserObj(), pageTitle:'Help Center'});
});

module.exports = router;
