const express = require('express');
const router = express.Router();
const AuthFunction = require('../function/auth.function');

router.post('/register', AuthFunction.register);

router.post('/login', AuthFunction.login);

router.post('/get-all', AuthFunction.getAllUser);

module.exports = router;