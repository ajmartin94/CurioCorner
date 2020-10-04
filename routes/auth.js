const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/login',ctrl.auth.renderLogin);
router.get('/signup',ctrl.auth.renderSignUp)

module.exports = router;