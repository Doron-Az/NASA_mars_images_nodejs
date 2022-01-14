'use strict';
var express = require('express');
var router = express.Router();
const registerController = require('../Controllers/register');
const middleWare = require('../Controllers/middleWare');


router.get('/', registerController.getRegister);
router.post('/', (req, res) => { res.redirect('/register'); });

router.get('/result', (req, res) => { res.redirect('/'); });
router.post('/result', [middleWare.checkTimerCookie, middleWare.valitadeRgester], registerController.addUserToDataBase);

router.get('/timeout', (req, res) => { res.redirect('/'); });
router.post('/timeout', registerController.postTimeOut);

module.exports = router;