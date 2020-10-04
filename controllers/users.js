const Users = require("../models").Users;

const renderProfile = (req, res) => {
    Users.findOne({
        where:{
            username: req.user.username
        }
    })
    .then( foundUser => {
        res.render("users/profile.ejs", {
            user: foundUser
        })
    })
    
}

module.exports = {
    renderProfile,
}