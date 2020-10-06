const Users = require("../models").Users;
const Posts = require('../models').Posts;

const renderProfile = (req, res) => {
    if(req.user) {
        Users.findOne({
            where:{
                username: req.params.username
            },
            include: [Posts]
        })
        .then( profileUser => {
            Users.findByPk(req.user.id)
            .then( viewingUser => {
                res.render("users/profile.ejs", {
                    user: profileUser,
                    viewing: viewingUser
                })
            })
        })
    }
}

const renderEditProfile = (req,res) => {
    Users.findByPk(req.user.id)
    .then( foundUser => {
        console.log(foundUser);
        res.render('users/editProfile.ejs', {
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
            res.redirect(`/users/profile/${foundUser.username}`)
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
    deleteUser,
    renderEditProfile
}