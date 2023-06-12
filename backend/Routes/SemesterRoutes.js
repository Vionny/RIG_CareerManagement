
const express = require('express');
const { getAllSemester, getCurrentSemester, getSelectedSemester, updatePromotionDate, updateChoiceDate, getPhases, getChoiceEnd, getPromotionEnd, insertSemester, deleteSemester, updateSemester} = require('../Controller/SemesterController');
const router = express.Router()

router.get('/getAllSemester',getAllSemester)
router.get('/getCurrSemester',getCurrentSemester)
router.get('/getSelectedSemester/:semesterid',getSelectedSemester)
router.get('/getPhases/:semesterid',getPhases)
router.get('/getPromotionEnd/:semesterid',getPromotionEnd)
router.get('/getChoiceEnd/:semesterid',getChoiceEnd)

router.post('/updatePromotionDate', updatePromotionDate)
router.post('/updateChoiceDate', updateChoiceDate)
router.post('/updateSemester', updateSemester)
router.post('/insertSemester', insertSemester)
router.delete('/deleteSemester/:semesterid', deleteSemester)

module.exports = router