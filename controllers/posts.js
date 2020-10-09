const Users = require('../models').Users;
const Posts = require('../models').Posts;
const Categories = require("../models").Category;
const Comments = require('../models').Comments;
const PostsCategory = require('../models').PostsCategory;
const { Op } = require('sequelize');

const renderNewPost = (req,res) => {
    res.render('posts/new.ejs', {
        allCategories: req.categories
    });
}

const newPost = (req,res) => {
    req.body.userId = req.user.id;
    if(req.file) {
        req.body.image = `https://curiocorner.s3.us-east-2.amazonaws.com/${req.file.originalname}_${req.user.username}`;
    } else {
        req.body.image = "/images/posts/4ee872b797951c7e97730fa814be7a1b";
    }
    Posts.create(req.body)
    .then(newPost => {
        postBody(req, newPost)
        
        res.redirect(`/posts/${newPost.id}?require=false`)
    })
}
//https://stackoverflow.com/questions/49395973/how-to-return-non-unique-join-table-records-in-sequelize

const renderPost = (req,res) => {
    Posts.findByPk(req.params.id, {
        include: [
            {
                model: Users,
                as: 'Like'
            },
            {
                model: Comments,
                include: [{model: Users}]
            },
            {
                model: Comments,
                include: [{
                    model: Users,
                    as: 'CommentLike'
                }]
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
                res.render('posts/postpage.ejs', {
                    post: foundPost,
                    user: foundUser,
                    allCategories: req.categories
                })
            })
        } else {
            res.render('posts/postpage.ejs', {
                post: foundPost,
                user: null,
                allCategories: req.categories
            })
        }
    })
}

const renderEditPost = (req,res) => {
    Posts.findByPk(req.params.id, {
        include: [Categories]
    })
    .then(foundPost => {
        res.render('posts/editPost.ejs', {
            post: foundPost,
            allCategories: req.categories
        })
    })
}

const editPost = (req,res) => {
    console.log(req.user)
    if(req.file) {
        req.body.image = `https://curiocorner.s3.us-east-2.amazonaws.com/${req.file.originalname}_${req.user.username}`;
    }

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

const unlikePost = (req,res) => {
    Posts.findByPk(req.params.id)
    .then(foundPost => {
        Users.findByPk(req.user.id)
        .then(foundUser => {
            foundUser.removeLike(foundPost);
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

const renderSearch = (req,res) => {
    let searchCrit = '%'+req.body.searchCriteria.replace(' ','%')+'%';
    Posts.findAll({
        where: {
            [Op.or]: [
                {title: {[Op.iLike]: searchCrit}},
                {content: {[Op.iLike]: searchCrit}}
            ]
        }
    })
    .then(foundPosts => {
        if(req.user) {
            Users.findByPk(req.user.id)
            .then(foundUser => {
                res.render('index.ejs', {
                    posts: foundPosts,
                    user: foundUser,
                    allCategories: req.categories
                })
            })
        } else {
            res.render('index.ejs', {
                posts: foundPosts,
                user: null,
                allCategories: req.categories
            })
        }
    })
}

const renderCategory = (req,res) => {
    Categories.findOne({
        where: {
            name: req.params.catName
        }
    })
    .then(desiredCategory => {
        Categories.findOne({
            where: {
                id: desiredCategory.id
            },
            include: [Posts]
        })
        .then(foundCategory => {
            if(req.user) {
                Users.findByPk(req.user.id)
                .then(foundUser => {
                    res.render('index.ejs', {
                        posts: foundCategory.Posts,
                        user: foundUser,
                        allCategories: req.categories
                    })
                })
            } else {
                res.render('index.ejs', {
                    posts: foundCategory.Posts,
                    user: null,
                    allCategories: req.categories
                })
            }
        })
    })
}

const likeComment = (req,res) => {
    Comments.findByPk(req.params.commentid)
    .then(foundComment => {
        Users.findByPk(req.user.id)
        .then(user => {
            foundComment.addCommentLike(user);

            res.redirect(`/posts/${req.params.postid}?require=false`)
        })
    })
}

const unlikeComment = (req,res) => {
    Comments.findByPk(req.params.commentid)
    .then(foundComment => {
        Users.findByPk(req.user.id)
        .then(user => {
            foundComment.removeCommentLike(user);

            res.redirect(`/posts/${req.params.postid}?require=false`)
        })
    })
}

const renderEditComment = (req,res) => {
    Comments.findByPk(req.params.commentid)
    .then(foundComment => {
        res.render('posts/editComment.ejs', {
            comment: foundComment,
            postId: req.params.id,
            allCategories: req.categories
        })
    })
}

const editComment = (req,res) => {
    Comments.update(req.body, {
        where: {id: req.params.commentid},
        returning: true
    })
    .then(edittedComment => {
        res.redirect(`/posts/${req.params.id}?require=false`)
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
    unlikePost,
    addComment,
    renderSearch,
    renderCategory,
    likeComment,
    unlikeComment,
    renderEditComment,
    editComment
}