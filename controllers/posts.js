const Users = require('../models').Users;
const Posts = require('../models').Posts;
const Categories = require("../models").Category;

const renderNewPost = (req,res) => {
    Categories.findAll()
    .then(allCategories => {
        res.render('posts/new.ejs', {
            categories: allCategories
        });
    })
    
}

const newPost = (req,res) => {
    req.body.userId = req.user.id;
    Posts.create(req.body)
    .then(newPost => {
        postBody(req, newPost)
        
        res.redirect(`/view/${newPost.id}`)
    })
}

const renderPost = (req,res) => {
    Users.findByPk(req.user.id)
    .then(foundUser => {
        Posts.findByPk(req.params.id, {
            include: {
                model: Users,
                as: 'Likes'
            }
        })
        .then(foundPost => {
            res.render('posts/postpage.ejs', {
                post: foundPost,
                user: foundUser
            });
        })
    })
}

const renderEditPost = (req,res) => {
    Posts.findByPk(req.params.id, {
        include: [Categories]
    })
    .then(foundPost => {
        console.log(foundPost)
        Categories.findAll()
        .then(allCategories => {
            res.render('posts/editPost.ejs', {
                post: foundPost,
                categories: allCategories
            })
        })
        
    })
}

const editPost = (req,res) => {
    Posts.update(req.body, {
        where: {id: req.params.id},
        returning: true
    })
    .then(edittedPost => {
        Posts.findByPk(req.params.id)
        .then(foundEditPost => {
            postBody(req, foundEditPost)
            res.redirect(`/view/${req.params.id}`);
        })
    })
}

const deletePost = (req,res) => {
    Posts.destroy({
        where: {id: req.params.id}
    })
    .then(() => {
        res.redirect('/');
    })
}

const likePost = (req,res) => {
    Posts.findByPk(req.params.id)
    .then(foundPost => {
        Users.findByPk(req.user.id)
        .then(foundUser => {
            foundUser.addLike(foundPost);
            res.redirect(`/view/${req.params.id}`);
        })
    })
}



function postBody(req, post) {
    if(req.body.selectedCategories.length < 2) {
        req.body.selectedCategories = [`${req.body.selectedCategories}`];
    }
    req.body.selectedCategories.forEach(id => {
        Categories.findByPk(id)
        .then(found => {
            post.addCategory(found)
        })
    })
}

module.exports = {
    renderNewPost,
    newPost,
    renderPost,
    renderEditPost,
    editPost,
    deletePost,
    likePost
}