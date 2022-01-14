var express = require('express');
var router = express.Router();
const apiController = require('../Controllers/api');
const middleWare = require('../Controllers/middleWare');


router.post('/resources/is-valid-email', apiController.isValidEmail);
router.post('/resources/verify-user', apiController.verifyUser);

//private api - can ask for api with TOKEN only! 
router.put('/resources/add-image',middleWare.checkToken, apiController.addImage);
router.get('/resources/saved-image-list',middleWare.checkToken, apiController.geSavedImageList);
router.delete('/resources/delete-image', middleWare.checkToken, apiController.deleteImage);
router.delete('/resources/delete-all-image-list',middleWare.checkToken, apiController.deleteAllImages);

module.exports = router;