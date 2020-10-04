const Auth = require('../models').Auth;
const Users = require('../models').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const renderLogin = (req,res) => {
    res.render('login.ejs')
}

const renderSignUp = (req,res) => {
    res.render('signUp.ejs')
}

const signUp = (req,res) => {
    bcrypt.genSalt(10,(err,salt) => {
        if(err) {
            return res.send(err);
        }
        bcrypt.hash(req.body.password, salt, (err, hashedPswd) => {
            if(err) {
                return res.send(err);
            }
            req.body.password = hashedPswd;

            Users.create(req.body)
            .then(newUser => {
                const token = jwt.sign(
                    {
                        id: newUser.id,
                        username: newUser.username
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1 day'
                    }
                );

                res.cookie('jwt',token);
                res.redirect('/')
            })
        })
    })
}

module.exports = {
    renderLogin,
    renderSignUp,
    signUp
}