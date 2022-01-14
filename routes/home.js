var express = require('express');
const middleWare = require('../Controllers/middleWare');
var router = express.Router();
const dbModels = require("../models"); //contain the User model
const homePageController = require('../Controllers/home');


/* GET home page. */
router.get('/', middleWare.isConnected, homePageController.getHome);
router.post('/', (req, res) => { res.redirect('/'); });

router.get('/logout', (req, res) => { res.redirect('/'); });
router.post('/logout', homePageController.postLogout);

module.exports = router;

