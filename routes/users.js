const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get("/profile", ctrl.users.renderProfile)


module.exports = router;