const Users = require('../models').Users;
const Posts = require('../models').Posts;
const Categories = require("../models").Category;
const Comments = require('../models').Comments;

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
        
        res.redirect(`/posts/${newPost.id}?require=false`)
    })
}

const renderPost = (req,res) => {
    Posts.findByPk(req.params.id, {
        include: [
            {
                model: Users,
                as: 'Like'
            },
            {
                model: Users,
                as: 'Comment'
            }
        ]
    })
    .then(foundPost => {
        console.log(JSON.stringify(foundPost,null,2))
        if(req.user) {
            Users.findByPk(req.user.id)
            .then(foundUser => {
                res.render('posts/postpage.ejs', {
                    post: foundPost,
                    user: foundUser
                })
            })
        } else {
            res.render('posts/postpage.ejs', {
                post: foundPost
            })
        }
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
            res.redirect(`/posts/${req.params.id}?require=false`);
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
            res.redirect(`/posts/${req.params.id}?require=false`);
        })
    })
}

const addComment = (req,res) => {
    Comments.create(
        {
            userId: req.user.id,
            postId: req.params.id,
            text: req.body.text
        }
    )
    .then(newComment => {
        res.redirect(`/posts/${req.params.id}?require=false`);
    })
}



function postBody(req, post) {
    if(req.body.selectedCategories.length < 2) {
        req.body.selectedCategories = [`${req.body.selectedCategories}`];
    }
    req.body.selectedCategories.forEach(id => {
        Categories.findByPk(id)
        .then(found => {
            post.addCategory(found);
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
    likePost,
    addComment
}