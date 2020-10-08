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
const uploadProf = multer({
    storage: multerS3({
        s3:s3,
        bucket: "curiocorner",
        key: function(req,file, cb) {
            cb(null,Date.now().toString())
        }
    })
});
router.get('/login',ctrl.auth.renderLogin);
router.get('/signup',ctrl.auth.renderSignUp);
router.get('/logout', ctrl.auth.logout);
router.post('/signUp', uploadProf.single("profileImg") , ctrl.auth.signUp);
router.post('/login', ctrl.auth.login);

module.exports = router;