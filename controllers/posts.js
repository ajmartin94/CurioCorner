const Posts = require('../models').Posts;

const renderNewPost = (req,res) => {
    res.render('posts/new.ejs');
}

const newPost = (req,res) => {
    req.body.userId = req.user.id;
    Posts.create(req.body)
    .then(newPost => {
        res.redirect(`/posts/${newPost.id}`)
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
        res.redirect(`/posts/${req.params.id}`);
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