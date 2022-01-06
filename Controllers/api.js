const session = require("express-session");
const dbModels = require("../models"); //contain the User model

exports.isValidEmail = (req, res) => {

    dbModels.User.findOne({ where: { email: req.body.email } })
        .then((user) => {
            (!user) ? res.send(false): res.send(true);
        })
        .catch((err) => {
            console.log('***There was an error check if email')
            return res.status(400).send(err)
        })
}

exports.addImage = async(req, res) => {

    const { image } = req.body;

    const isExist = await dbModels.MarsImage.findOne({ where: { email: req.session.isConnected, imageId: image.id } });

    if (!isExist)
        dbModels.MarsImage.create({
            url: image.source,
            email: req.session.isConnected,
            imageId: image.id,
            date: image.earthDate,
            sol: image.sol,
            mission: image.mission,
            camera: image.camera
        })
        .then((image) => {
            (image) ? res.send(true): res.send(false);
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
    else
        res.send(false);

}


exports.deleteImage = async(req, res) => {

    const result = await dbModels.MarsImage.destroy({ where: { email: req.session.isConnected, imageId: req.body.imageId } })
    result ? res.send(true) : res.send(false);
}

exports.deleteAllImages = async(req, res) => {

    const result = await dbModels.MarsImage.destroy({ where: { email: req.session.isConnected } })
    result ? res.send(true) : res.send(false);
}


exports.geSavedImageList = async(req, res) => {

    dbModels.MarsImage.findAll({ where: { email: req.session.isConnected } })
        .then((savedImage) => {
            res.send(savedImage);
        })
        .catch((err) => {
            return res.status(400).send(err)
        })
}

exports.errorApi = (req, res) => {
    res.json().status(404).send("Your API request is invalid.");
}

exports.deleteUser = async(req, res) => {
    const requestedEmail = req.params.email;
    await dbModels.User.destroy({ where: { email: requestedEmail } });
    res.send('removed');
}

exports.deleteAllUser = async(req, res) => {
    const max = req.params.max;

    for (let i = 1; i <= max; i++) {
        await dbModels.User.destroy({ where: { id: i } });
    }
    res.send('removed');
}