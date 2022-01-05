const dbModels = require("../models"); //contain the User model

exports.isValidEmail = (req, res) => {

     dbModels.User.findOne({where: {email: req.body.email}})
        .then((user) => {
           (!user) ? res.send(false) : res.send(true);
        })
        .catch((err) => {
            console.log('***There was an error check if email')
            return res.status(400).send(err)
        })
}

exports.errorApi = (req, res) => {
    res.json().status(404).send("Your API request is invalid.");
}

exports.deleteUser = async (req , res) => {
    const requestedEmail = req.params.email;
    await dbModels.User.destroy({where:{email : requestedEmail}});
    res.send('removed');
}



