'use strict';
var express = require('express');
var router = express.Router();
const loginController = require('../Controllers/login');

router.get('/', loginController.getLogin);
router.post('/', loginController.postLogin);

module.exports = router;