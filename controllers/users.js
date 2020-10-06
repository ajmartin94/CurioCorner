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


const updateProfile = (req, res) => {
    Users.update(req.body, {
        where: {id: req.user.id},
        returning: true
    })
    .then(updatedProfile => {
        Users.findOne({
            where:{
                id: req.user.id
            }
        })
        .then( foundUser => {
            res.redirect("/users/profile")
        })
    })
    
}

const deleteUser = (req,res) => {
    Users.destroy({
        where: {id: req.user.id}
    })
    .then(() => {
        res.redirect("/");
    })
}

module.exports = {
    renderProfile,
    updateProfile,
    deleteUser
}