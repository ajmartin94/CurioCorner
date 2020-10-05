const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/login',ctrl.auth.renderLogin);
router.get('/signup',ctrl.auth.renderSignUp);
router.get('/logout', ctrl.auth.logout);
router.post('/signUp',ctrl.auth.signUp);
router.post('/login', ctrl.auth.login);

module.exports = router;