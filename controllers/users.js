const Users = require("../models").Users;

const renderProfile = (req, res) => {
    Users.findOne({
        where:{
            username: req.user.username
        }
    })
    .then(foundUser => {

        res.render("users/profile.ejs", {
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
    image
}