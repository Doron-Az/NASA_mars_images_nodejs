const registerController = require('../Controllers/register');
var express = require('express');
const Cookies = require("cookies");
const { sequelize } = require('../models');
var router = express.Router();

const keys = ['keyboard cat']


router.get('/', function(req, res) {
    if (req.session.isConnected)
        res.redirect('/');

    res.render('register', { pageTitle: "NASA Sign Up", scriptPath: "javaScript/register.js", error_msg: "" });
});

router.post('/', function(req, res) {
    res.redirect('register');
});


router.post('/result', registerController.addUserToDataBase);

router.get('/result', function(req, res) {
    res.redirect('/');
});

module.exports = router;