const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/login',ctrl.auth.renderLogin);
router.get('/signup',ctrl.auth.renderSignUp)
router.post('/signUp',ctrl.auth.signUp)

module.exports = router;