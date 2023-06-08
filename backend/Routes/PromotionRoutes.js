const express = require('express');
const { insertPromotionRegistration, getLastPriorityInsert } = require('../Controller/PromotionController');
const router = express.Router()

router.post('/promotion/registerPromotion',insertPromotionRegistration)
router.get('/promotion/getLastPriorityInsert/:initial/:semesterid',getLastPriorityInsert)

module.exports = router
