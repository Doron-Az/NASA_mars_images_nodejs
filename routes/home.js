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
            user_first_name: user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1),
            user_last_name: user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1)
        });
    } else
        res.redirect('login');
});

router.post('/', function(req, res) {
    res.redirect('/');
});

router.post('/logout', async function(req, res) {
    req.session.destroy({ email: req.session.isConnected });
    res.redirect('/login');
});


module.exports = router;