const Auth = require('../models').Auth;
const Users = require('../models').Users;

const renderLogin = (req,res) => {
    res.render('login.ejs')
}

const renderSignUp = (req,res) => {
    res.render('signUp.ejs')
}

module.exports = {
    renderLogin,
    renderSignUp
}