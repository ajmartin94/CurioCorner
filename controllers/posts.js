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
    console.log(req.body)
    Posts.create(req.body)
    .then(newPost => {
        req.body.selectedCategories.forEach(id => {
            Categories.findByPk(id)
            .then(found => {
                newPost.addCategory(found)
            })
        })
        
        res.redirect(`/view/${newPost.id}`)
    })
}

// const renderPost = (req,res) => {
//     Posts.findByPk(req.params.id)
//     .then(foundPost => {
//         res.render('posts/postpage.ejs', {
//             post: foundPost
//         });
//     })
// }

const renderEditPost = (req,res) => {
    Posts.findByPk(req.params.id)
    .then(foundPost => {
        res.render('posts/editPost.ejs', {
            post: foundPost
        })
    })
}

const editPost = (req,res) => {
    Posts.update(req.body, {
        where: {id: req.params.id},
        returning: true
    })
    .then(edittedPost => {
        res.redirect(`/view/${req.params.id}`);
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

module.exports = {
    renderNewPost,
    newPost,
    // renderPost,
    renderEditPost,
    editPost,
    deletePost
}