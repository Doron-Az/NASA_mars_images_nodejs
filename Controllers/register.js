'use strict';
var Cookies = require('cookies');
const e = require('express');
const { is } = require('express/lib/request');
const res = require('express/lib/response');
const keys = ['keyboard cat']
const dbModels = require("../models"); //contain the User model

exports.addUserToDataBase = async (req, res) => {

    const { cookies } = req;
    if (!('registerTimer' in cookies))
        return res.render('myError', {
            pageTitle: "NASA Error",
            scriptPath: "",
            message: "Too late, hurry up next time"
        });


    const { firstNameInput, lastNameInput, emailInput, passwordInput } = req.body;
    const user = await dbModels.User.findOne({ where: { email: emailInput } });
    const v_email = user ? false : true;
    const v_first_name = /^[a-zA-Z]+$/.test(firstNameInput);
    const v_last_name = /^[a-zA-Z]+$/.test(lastNameInput);
    const v_password = passwordInput.length > 7;

    if (!(v_first_name && v_last_name && v_email && v_password))
        return res.render('myError', {
            pageTitle: "NASA Error",
            scriptPath: "",
            message: 'Sorry we could not register you \n Please try again'
        });


    dbModels.User.create({ firstName: firstNameInput, lastName: lastNameInput, email: emailInput, password: passwordInput })
        .then(() => {
            return res.render('success', {
                pageTitle: "NASA Success",
                scriptPath: "",
                user_name: firstNameInput.charAt(0).toUpperCase() + firstNameInput.slice(1) + " " + lastNameInput.charAt(0).toUpperCase() + lastNameInput.slice(1)
            })

        })
        .catch(() => {
            return res.render('myError', {
                pageTitle: "NASA Error",
                scriptPath: "",
                message: "req.session.error"
            });
        })
}




