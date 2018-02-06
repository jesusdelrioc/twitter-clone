const express = require('express');
const auth = express.Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

auth.get('/signup', (req, res, next) => {
    res.render('signup')
})
auth.post('/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.render('signup', { errorMessage: "error empty field" })
        return;
    }

    User.findOne({ "username": username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signup", {
                errorMessage: "The username already exists"
            });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = User({
            username,
            password: hashPass
        });

        newUser.save((err) => {
            if (err) {
                res.render("auth/signup", {
                    errorMessage: "Something went wrong when signing up"
                });
            } else {
                res.redirect("/")
                // User has been created...now what?
            }
        });
    });


})

auth.get('/login', (req, res, next) => {
    res.render('login')
})
auth.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.render('login', { errorMessage: "error empty field" })
        return;
    }

    User.findOne({ "username": username }, (err, user) => {
        if (user == null) {
            res.render("auth/login", {
                errorMessage: "The username doesnt exists"
            });
            return;
        } else {
            if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                console.log("user");
                res.redirect("/private")
            } else {
                res.render("auth/login", {
                    errorMessage: "Incorrect password"
                });
            }
        }
    });
})

auth.get('/private', (req, res, next) => {
    console.log(req.session.currentUser)
    if (req.session.currentUser) {
        res.render('private')
    } else {
        res.redirect('/')
        console.log("no existe el usuario")
    }

});

module.exports = auth