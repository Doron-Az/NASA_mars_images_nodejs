var express = require('express');
var router = express.Router();
const apiController = require('../Controllers/api');


router.post('/resources/isValidEmail', apiController.isValidEmail);

router.put('/resources/add-image', apiController.addImage);

router.get('/resources/saved-image-list', apiController.geSavedImageList);

router.delete('/resources/delete-image', apiController.deleteImage);

router.delete('/resources/delete-all-image-list', apiController.deleteAllImages);

router.delete('/delete-user/:email', apiController.deleteUser);

router.delete('/delete-users/:max', apiController.deleteAllUser);

module.exports = router;