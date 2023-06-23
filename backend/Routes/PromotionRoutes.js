const express = require('express');
const { insertPromotionRegistration, getLastPriorityInsert, getPromotionRegistrant } = require('../Controller/PromotionController');
const router = express.Router()

router.post('/promotion/registerPromotion',insertPromotionRegistration)
router.get('/promotion/getLastPriorityInsert/:initial/:semesterid',getLastPriorityInsert)
router.get('/promotion/getPromotionRegistrant/:semesterid',getPromotionRegistrant)

module.exports = router
