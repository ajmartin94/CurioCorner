const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/profile", ctrl.users.renderProfile);

router.get('/profile/edit',ctrl.users.renderEditProfile);

router.put("/profile", ctrl.users.updateProfile);

router.delete("/profile", ctrl.users.deleteUser);

module.exports = router;