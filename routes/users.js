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
const upload = multer({
    storage: multerS3({
        s3:s3,
        bucket: "curiocorner",
        key: function(req,file, cb) {
            cb(null,Date.now().toString())
        }
    })
});

router.get('/profile/edit',ctrl.users.renderEditProfile);

router.get("/profile/:username", ctrl.users.renderProfile);

router.put("/profile", upload.single("profileImg"), ctrl.users.updateProfile);

router.delete("/profile", ctrl.users.deleteUser);

router.get('/profile/follow/:id', ctrl.users.followUser);

module.exports = router;