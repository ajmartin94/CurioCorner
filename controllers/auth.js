require('dotenv').config;

const Users = require('../models').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const renderLogin = (req,res) => {
    if(req.query.redirect) {
        res.render('login.ejs', {
            correct: req.query.valid,
            allCategories: req.categories,
            redirect: req.query.redirect
        })
    } else {
        res.render('login.ejs', {
            correct: req.query.valid,
            allCategories: req.categories,
            redirect: req.headers.referer
        })
    }
    
}

const renderSignUp = (req,res) => {
    res.render('signUp.ejs', {
        allCategories: req.categories
    })
}

const signUp = (req,res) => {
    if(req.file) {
        if (req.file.name === '') {
            req.body.profileImg = `/images/profile/kindpng_248253.png`;
        } else {
            const filename = req.file.filename;
            req.body.profileImg = `/images/profile/${filename}`;
        }
    } else {
        req.body.profileImg = `/images/profile/kindpng_248253.png`;
    }
    
    
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
                res.redirect(`/users/profile/${newUser.username}`)
            })
        })
    })
}

const login = (req,res) => {
    Users.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(foundUser => {
        if(foundUser !== null) {
            bcrypt.compare(req.body.password, foundUser.password, (err, match) => {
                if(match) {
                    const token = jwt.sign(
                        {
                            id: foundUser.id,
                            username: foundUser.username
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "1 day"
                        }
                    );
                    res.cookie("jwt", token);
                    res.redirect(req.query.redirect);
                
                } else {
                    res.redirect("/auth/login?valid=0");
                }
            })
        } else {
            res.redirect("/auth/login?valid=0")
        }
    })
    .catch(err => {
        console.log(err)
        res.send("OMG WE FINALLY GOT HERE")
    })
}

const logout = (req,res) => {
    res.clearCookie("jwt");
    res.redirect(req.headers.referer)
}


module.exports = {
    renderLogin,
    renderSignUp,
    signUp,
    login,
    logout
}