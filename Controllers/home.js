'use strict';
const dbModels = require("../models"); //contain the User model

exports.getHome = (req, res) => {
    if (req.session.isConnected) {
        return dbModels.User.findOne({ where: { email: req.session.isConnected } })
            .then((user) => {
                if (user)
                    return res.render('home', {
                        pageTitle: "NASA",
                        scriptPath: "javaScript/home.js",
                        user_first_name: user.firstName,
                        user_last_name: user.lastName
                    });
                else
                    throw "";

            }).catch((msg) => {
                res.render('myError', {
                    pageTitle: "NASA Error",
                    scriptPath: "",
                    message: "Something went wrong, we were unable to verify the account, please try logging in again"
                });
            })
    }
    else
        res.redirect("/login");
}

exports.postLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login'); // will always fire after session is destroyed
}