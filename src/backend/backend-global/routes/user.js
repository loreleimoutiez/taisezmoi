/* eslint-disable */
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.get('/status', userCtrl.checkAuthStatus);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/logout', userCtrl.logout);

module.exports = router;