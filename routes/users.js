const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/profile", ctrl.users.renderProfile);


router.put("/:index", ctrl.users.updateProfile);


router.delete("/:index", ctrl.users.deleteUser);

module.exports = router;