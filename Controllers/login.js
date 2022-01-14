'use strict';

exports.getLogin = (req, res) => {

    if (req.session.isConnected)
        res.redirect('/');

    else res.render('login', {
        pageTitle: "NASA Login",
        scriptPath: "javaScript/login.js",
    });
}

exports.postLogin = (req, res) => {
    res.redirect('/login')
}