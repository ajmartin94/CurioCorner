const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/profile/edit',ctrl.users.renderEditProfile);

router.get("/profile/:username", ctrl.users.renderProfile);

router.put("/profile", ctrl.users.updateProfile);

router.delete("/profile", ctrl.users.deleteUser);

module.exports = router;