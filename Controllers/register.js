'use strict';
var Cookies = require('cookies')

const keys = ['keyboard cat']

const dbModels = require("../models"); //contain the User model


exports.addUserToDataBase = (req, res) => {

        dbModels.User.findOne({where: {email: req.body.email}})
        .then((user) => {
            let v_email =  (!user) ? true : false;

            let v_first_name = /^[a-zA-Z]+$/.test(req.body.first_name);
            let v_last_name = /^[a-zA-Z]+$/.test(req.body.last_name);
            let v_password = req.body.password.length > 7;
    
            let v = v_email && v_first_name && v_last_name && v_password;
    
            if (v) {
                const { first_name, last_name, email, password } = req.body; // req.body.firstName, req.body.lastName, req.body.phone
                dbModels.User.create({ first_name, last_name, email, password })
                    .then((user) => {
                        (user) ? res.send(true) : res.send(false) ;
                    })
                    .catch((err) => {
                        console.log('***There was an error creating a contact', JSON.stringify(contact))
                        return res.status(400).send(err)
                    })
            }
            else
                res.send(false);
        })
        .catch((err) => {
            console.log('***There was an error check if email')
            return res.status(400).send(err)
        })
       


}

