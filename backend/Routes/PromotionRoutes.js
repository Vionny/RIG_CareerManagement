const express = require('express');
const { insertPromotionRegistration, getLastPriorityInsert, getPromotionRegistrant, getRegistrees, getAllCurrentSemesterPromotionRanking , getRegistrantChoices} = require('../Controller/PromotionController');
const router = express.Router()

router.post('/promotion/registerPromotion',insertPromotionRegistration)
router.get('/promotion/getLastPriorityInsert/:initial/:semesterid',getLastPriorityInsert)
router.get('/promotion/getPromotionRegistrant/:semesterid',getPromotionRegistrant)
router.get('/promotion/getRegistrees/:semesterid',getRegistrees)
router.get('/promotion/getRegistrantChoices/:initial/:semesterid',getRegistrantChoices)

module.exports = router
