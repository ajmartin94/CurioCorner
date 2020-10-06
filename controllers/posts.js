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
            },
            {
                model: Users
            }
        ]
    })
    .then(foundPost => {
        if(req.user) {
            Users.findByPk(req.user.id)
            .then(foundUser => {
                console.log(JSON.stringify(foundPost,null,2))
                res.render('posts/postpage.ejs', {
                    post: foundPost,
                    user: foundUser
                })
            })
        } else {
            res.render('posts/postpage.ejs', {
                post: foundPost,
                user: null
            })
        }
    })
}

const renderEditPost = (req,res) => {
    Posts.findByPk(req.params.id, {
        include: [Categories]
    })
    .then(foundPost => {
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
    // This block removes all the categories on the post
    Categories.findAll()
    .then(allCategories => {
        allCategories.forEach(category => {
            post.removeCategory(category)
        })
    })

    // This block adds all the categories the user selected
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