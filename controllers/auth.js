const Auth = require('../models').Auth;
const Users = require('../models').Users;

const renderLogin = (req,res) => {
    res.render('users/login.ejs')
}

module.exports = {
    renderLogin
}