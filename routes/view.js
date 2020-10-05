const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/:id', ctrl.view.renderPost);

module.exports = router;