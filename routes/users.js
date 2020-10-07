const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const multer = require("multer");
const upload = multer({dest:"public/images/profile/"});

router.get('/profile/edit',ctrl.users.renderEditProfile);

router.get("/profile/:username", ctrl.users.renderProfile);

router.put("/profile", upload.single("profileImg"), ctrl.users.updateProfile);

router.delete("/profile", ctrl.users.deleteUser);

router.get('/profile/follow/:id', ctrl.users.followUser);

module.exports = router;