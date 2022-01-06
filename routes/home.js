var express = require('express');
var router = express.Router();
const dbModels = require("../models"); //contain the User model


/* GET home page. */
router.get('/', async function(req, res) {
    if (req.session.isConnected) {
        const user = await dbModels.User.findOne({ where: { email: req.session.isConnected } });
        res.render('home', {
            pageTitle: "NASA",
            scriptPath: "javaScript/home.js",
            error_msg: "",
            user_name: user.firstName + " " + user.lastName
        });
    } else
        res.redirect('login');
});

router.post('/', function(req, res) {
    res.redirect('/');
});


module.exports = router;