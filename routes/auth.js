const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const multer = require("multer");
const uploadProf = multer({dest:"public/images/profile/"});

router.get('/login',ctrl.auth.renderLogin);
router.get('/signup',ctrl.auth.renderSignUp);
router.get('/logout', ctrl.auth.logout);
router.post('/signUp', uploadProf.single("profileImg") , ctrl.auth.signUp);
router.post('/login', ctrl.auth.login);

module.exports = router;