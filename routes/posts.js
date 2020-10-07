const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const multer = require("multer");
const uploadPost = multer({dest:"public/images/posts/"});

router.get('/new',ctrl.posts.renderNewPost);
router.post('/new',uploadPost.single("image"),ctrl.posts.newPost);

router.get('/:id',ctrl.posts.renderPost);

router.get('/:id/edit',ctrl.posts.renderEditPost);
router.put('/:id/edit', uploadPost.single("image"), ctrl.posts.editPost);

router.delete('/:id',ctrl.posts.deletePost);

router.post('/:id/like',ctrl.posts.likePost);
router.post('/:id/unlike',ctrl.posts.unlikePost);

router.post('/:id/comment',ctrl.posts.addComment);

router.post('/search',ctrl.posts.renderSearch);

router.get('/category/:catName',ctrl.posts.renderCategory);

module.exports = router;