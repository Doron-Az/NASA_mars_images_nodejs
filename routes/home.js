var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('home', {pageTitle: "NASA", scriptPath: "javaScript/home.js", error_msg: ""});
});

router.post('/', function (req, res) {
    res.redirect('/');
});

module.exports = router;


