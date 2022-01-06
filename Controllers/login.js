'use strict';
var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
const dbModels = require("../models"); //contain the User model


exports.getLogin = (req, res) => {
    if (req.session.isConnected)
        res.redirect('/');

    else if (req.session.errorEmail || req.session.errorPassword) {
        res.render('login', {
            pageTitle: "NASA Login",
            scriptPath: "javaScript/login.js",
            error_msg_email: req.session.errorEmail,
            error_msg_password: req.session.errorPassword,
            email_hidden: req.session.emailHidden
        });
    } else res.render('login', {
        pageTitle: "NASA Login",
        scriptPath: "javaScript/login.js",
        error_msg_email: "",
        error_msg_password: "",
        email_hidden: ""
    });
}

exports.postLogin = (req, res) => {
    req.session.errorEmail = "";
    req.session.errorPassword = "";
    req.session.emailHidden = "";

    const { emailInput, passwordInput } = req.body;
    dbModels.User.findOne({ where: { email: emailInput } })
        .then((user) => {
            if (user.password === passwordInput) {
                req.session.isConnected = emailInput;
                res.redirect('/');
            } else {
                req.session.errorPassword = 'The password you entered is incorrect';
                req.session.emailHidden = emailInput;
                res.redirect('/login');
            }
        })
        .catch(() => {
            req.session.errorEmail = 'There is no user with this email, please try another email';
            res.redirect('/login');
        })
}