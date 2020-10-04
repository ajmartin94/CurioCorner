const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/login',ctrl.auth.renderLogin);

module.exports = router;