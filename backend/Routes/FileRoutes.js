const express = require('express');
const { readCSVAstInput, readAstLeaderInput } = require('../Controller/FileController');
const router = express.Router();


router.post('/readCSVAstInput', readCSVAstInput);
router.post('/readAstLeaderInput',readAstLeaderInput)
module.exports = router;
