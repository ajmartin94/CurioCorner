const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/profile", ctrl.users.renderProfile);


router.put("/profile", ctrl.users.updateProfile);


router.delete("/profile", ctrl.users.deleteUser);

module.exports = router;