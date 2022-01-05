var express = require('express');
var router = express.Router();
const apiController = require('../Controllers/api');


router.post('/resources/isValidEmail',apiController.isValidEmail);

router.delete('/delete-user/:email',apiController.deleteUser);

module.exports = router;
