const express = require('express');
const router = express.Router();
const ClassFunction = require('../function/classes.function');

router.get('/get-all', ClassFunction.getAllClass);

router.post('/search', ClassFunction.search);

router.post('/get-by-admin-id', ClassFunction.getByAdmin);

router.post('/create', ClassFunction.createClass);

module.exports = router;