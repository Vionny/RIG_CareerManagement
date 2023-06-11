
const express = require('express');
const { getAllSemester, getCurrentSemester, getSelectedSemester, updatePromotionDate, getPromotionStart } = require('../Controller/SemesterController');
const router = express.Router()

router.get('/getAllSemester',getAllSemester)
router.get('/getCurrSemester',getCurrentSemester)
router.get('/getSelectedSemester/:semesterid',getSelectedSemester)
router.get('/getPromotionStart/:semesterid',getPromotionStart)

router.post('/updatePromotionDate', updatePromotionDate)

module.exports = router