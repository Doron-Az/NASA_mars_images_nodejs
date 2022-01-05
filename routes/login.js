var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('login', {pageTitle: "NASA Login", scriptPath: ""});
});

router.post('/', function (req, res) {
    res.render('login', {});
});



module.exports = router;


