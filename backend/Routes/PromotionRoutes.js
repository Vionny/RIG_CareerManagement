const express = require('express');
const { insertPromotionRegistration, getLastPriorityInsert, getPromotionRegistrant, getRegistrees, getAllCurrentSemesterPromotionRanking } = require('../Controller/PromotionController');
const router = express.Router()

router.post('/promotion/registerPromotion',insertPromotionRegistration)
router.get('/promotion/getLastPriorityInsert/:initial/:semesterid',getLastPriorityInsert)
router.get('/promotion/getPromotionRegistrant/:semesterid',getPromotionRegistrant)
router.get('/promotion/getRegistrees/:semesterid',getRegistrees)

module.exports = router
