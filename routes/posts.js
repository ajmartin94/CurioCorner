const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/new',ctrl.posts.renderNewPost);
router.post('/new',ctrl.posts.newPost);


router.get('/:id/edit',ctrl.posts.renderEditPost);
router.put('/:id/edit',ctrl.posts.editPost);

router.delete('/:id',ctrl.posts.deletePost);

router.post('/:id/like',ctrl.posts.likePost);

module.exports = router;