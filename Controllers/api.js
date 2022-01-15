const dbModels = require("../models"); //contain the User model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.isValidEmail = (req, res) => {

    return dbModels.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            if (user)
                res.send({email_exist: true });
            else
                res.send({email_exist: false });
        })
        .catch((err) => {
            res.status(400).send(err)
        })
}

exports.addImage = (req, res) => {

    const { image } = req.body;

    return dbModels.MarsImage.findOne({ where: { email: req.session.isConnected, imageId: image.id } })
        .then((imageExist) => {
            if (!imageExist)
                return dbModels.MarsImage.create({
                    url: image.source,
                    email: req.session.isConnected,
                    imageId: image.id,
                    date: image.earthDate,
                    sol: image.sol,
                    mission: image.mission,
                    camera: image.camera
                });
            else
                res.send({"add_new_image": false});
        })
        .then((crateResult) => {
            res.send({access: true , "add_new_image": crateResult });
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.deleteImage = (req, res) => {

    return dbModels.MarsImage.findOne({ where: { email: req.session.isConnected, imageId: req.body.imageId } })
        .then((image) => { image.destroy({ force: true }) })
        .then(() => { return dbModels.MarsImage.findAll({ where: { email: req.session.isConnected } }) })
        .then((count) => { res.json({access: true , isDelete: true, image_left: count.length }); })
        //the api task return if the image deleted and how much images left at the data. 
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.deleteAllImages = (req, res) => {

    return dbModels.MarsImage.destroy({ where: { email: req.session.isConnected } })
        .then((isDeleted) => { res.send({access: true , deleted_all_images: isDeleted }); })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.geSavedImageList = (req, res) => {

    return dbModels.MarsImage.findAll({ where: { email: req.session.isConnected } })
        .then((imageList) => { res.send({access: true ,image_list: imageList}); })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.verifyUser = (req, res) => {

    const { email, password } = req.body;

    return dbModels.User.findOne({ where: { email: email } })
        .then((user) => { return bcrypt.compare(password, user.password); })
        .then((verify) => {
            if (verify) {
                req.session.isConnected = email;
                const TOKEN_SECRET = "tokenSecret";
                const token = jwt.sign({ email: email }, TOKEN_SECRET);
                res.send({verify: true, token: token });
            }
            else
                res.send({verify: false, verifyPassword: "The password you entered is incorrect" });
        })
        .catch((err) => {
            res.status(400).send(err);
        })
}

exports.errorApi = (req, res) => {
    res.json().status(404).send("Your API request is invalid.");
}
