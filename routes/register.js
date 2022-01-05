const registerController = require('../Controllers/register');
var express = require('express');
const Cookies = require("cookies");
var router = express.Router();

const keys = ['keyboard cat']


router.get('/', function (req, res) {
    res.render('register', {pageTitle: "NASA Sign Up", scriptPath: "javaScript/register.js", error_msg: ""});
});

router.post('/', function (req, res) {
    res.redirect('register');
});

router.put('/add-user', registerController.addUserToDataBase);

router.post('/add-user/success', function (req, res) {
    res.render('success', {
        pageTitle: "NASA Success",
        scriptPath: "",
        error_msg: "",
        user_name: req.body.firstNameInput + " " + req.body.lastNameInput
    });
});

router.get('/add-user/success', function (req, res) {
    res.redirect('/login')
});

module.exports = router;

