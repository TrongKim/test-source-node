const express = require('express');
const router = express.Router();
const TestFunction = require('../function/tests.function');

router.get('/get-all', TestFunction.getTests);

router.post('/create-test', TestFunction.createTest);

module.exports = router;