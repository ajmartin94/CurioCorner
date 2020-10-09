const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-east-2'
})
const s3 = new aws.S3({});
const uploadPost = multer({
    storage: multerS3({
        s3:s3,
        bucket: "curiocorner",
        key: function(req,file, cb) {
            cb(null,`${file.originalname}_${req.user.username}`)
        },
        ACL: 'public-read'
    })
});

router.get('/new',ctrl.posts.renderNewPost);
router.post('/new',uploadPost.single("image"),ctrl.posts.newPost);

router.get('/:id',ctrl.posts.renderPost);

router.get('/:id/edit',ctrl.posts.renderEditPost);
router.put('/:id/edit',uploadPost.single("image"),ctrl.posts.editPost);

router.delete('/:id',ctrl.posts.deletePost);

router.get('/:id/like',ctrl.posts.likePost);
router.get('/:id/unlike',ctrl.posts.unlikePost);

router.post('/:id/comment',ctrl.posts.addComment);
router.get('/:id/comment/:commentid/edit',ctrl.posts.renderEditComment);
router.put('/:id/comment/:commentid/edit',ctrl.posts.editComment);

router.post('/search',ctrl.posts.renderSearch);

router.get('/category/:catName',ctrl.posts.renderCategory);

router.get('/:postid/likecomment/:commentid', ctrl.posts.likeComment);
router.get('/:postid/unlikecomment/:commentid', ctrl.posts.unlikeComment);

module.exports = router;

