const Users = require("../models").Users;
const Posts = require('../models').Posts;

const renderProfile = (req, res) => {
    Users.findOne({
        where:{
            username: req.params.username
        },
        include: [
            {
                model:Posts
            },
            {  
                model: Users,
                as: 'follower'
            }
        ]
    })
    .then(profileUser => {
        console.log(profileUser)
        if(req.user) {
            Users.findByPk(req.user.id)
            .then( viewingUser => {
                res.render("users/profile.ejs", {
                    profileUser: profileUser,
                    user: viewingUser,
                    allCategories: req.categories
                })
            })
        } else {
            res.render("users/profile.ejs", {
                profileUser: profileUser,
                user: null,
                allCategories: req.categories
            })
        }
    })
}

const renderEditProfile = (req,res) => {
    Users.findByPk(req.user.id)
    .then( foundUser => {

        if(!req.query.valid){
            req.query.valid=null;
        }
        res.render('users/editProfile.ejs', {
            user: foundUser,
            allCategories: req.categories,
            correct: req.query.valid
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
    .catch(err => {
        console.log(`err: ${err}`)
        if(err.errors[0].message === "username must be unique") {
            res.redirect('/users/profile/edit?valid=0')
        }
    
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
        res.clearCookie("jwt");
        res.redirect("/");
    })
}

const image = (req, res) => {
    if (req.file.name === '') {
        req.body.profileImg = `/images/profile/kindpng_248253.png`;
    } else {
        const filename = req.file.filename;
        req.body.profileImg = `/images/profile/${filename}`;
    }
}

const followUser = (req,res) => {
    Users.findByPk(req.params.id)
    .then(baseUser => {
        Users.findByPk(req.user.id)
        .then(followingUser => {
            baseUser.addFollower(followingUser);

            res.redirect(`/users/profile/${baseUser.username}`);
        })
    })
}

module.exports = {
    renderProfile,
    updateProfile,
    deleteUser, 
    image,
    renderEditProfile,
    followUser
}