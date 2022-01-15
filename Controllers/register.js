'use strict';
const dbModels = require("../models"); //contain the User model
const bcrypt = require("bcrypt");
const SALT_HASH = 10;

exports.addUserToDataBase = (req, res) => {

    const { firstNameInput, lastNameInput, emailInput, passwordInput } = req.body;

    return bcrypt.hash(passwordInput, SALT_HASH)
        .then((encryptedPassword) => {
            return dbModels.User.create({
                firstName: firstNameInput,
                lastName: lastNameInput,
                email: emailInput,
                password: encryptedPassword
            })

        }).then((isRegister) => {
            if (isRegister)
                res.render('success', {
                    pageTitle: "NASA Success",
                    scriptPath: "",
                    user_name: firstNameInput + " " + lastNameInput
                });

            else
                throw "";

        }).catch(() => {
            res.render('myError', {
                pageTitle: "NASA Error",
                scriptPath: "",
                message: "Sorry, registration failed Please try again."
            });
        })
}

exports.getRegister = (req, res) => {

    if (req.session.isConnected)
        res.redirect('/');

    res.render('register', {
        pageTitle: "NASA Sign Up",
        scriptPath: "javaScript/register.js",
        error_msg: ""
    });
}

exports.postTimeOut = (req, res) => {

    res.render('myError', {
        pageTitle: "NASA Error",
        scriptPath: "",
        message: "Too late, hurry up next time"
    });
}


