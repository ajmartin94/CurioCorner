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

    if(req.file) {
        req.body.profileImg = `/images/profile/${req.file.filename}`
    }
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

const image = (req, res) => {
    if (req.file.name === '') {
        req.body.profileImg = `/images/kindpng_248253.png`;
    } else {
        const filename = req.file.filename;
        req.body.profileImg = `/images/${filename}`;
    }
}

module.exports = {
    renderProfile,
    updateProfile,
    deleteUser, 
    image,
    renderEditProfile
}