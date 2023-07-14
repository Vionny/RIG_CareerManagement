const express = require('express');
const { readCSVAstInput, readAstLeaderInput, readPromotionRankingInput } = require('../Controller/FileController');
const router = express.Router();


router.post('/readCSVAstInput', readCSVAstInput);
router.post('/readAstLeaderInput',readAstLeaderInput)
router.post('/readPromotionRankingInput',readPromotionRankingInput)

module.exports = router;
