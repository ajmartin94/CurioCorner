const Posts = require('../models').Posts;

const renderNewPost = (req,res) => {
    res.render('posts/new.ejs');
}

const newPost = (req,res) => {
    Posts.create(req.body)
    .then(newPost => {
        res.redirect(`/posts/${newPost.id}`)
    })
}

const renderPost = (req,res) => {
    Posts.findByPk(req.params.id)
    .then(foundPost => {
        res.render('posts/postpage.ejs', {
            post: foundPost
        });
    })
}

module.exports = {
    renderNewPost,
    newPost,
    renderPost
}