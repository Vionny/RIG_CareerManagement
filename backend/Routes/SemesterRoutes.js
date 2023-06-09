
const express = require('express');
const { getAllSemester, getCurrentSemester, getSelectedSemester } = require('../Controller/SemesterController');
const router = express.Router()

router.get('/getAllSemester',getAllSemester)
router.get('/getCurrSemester',getCurrentSemester)
router.get('/getSelectedSemester/:semesterid',getSelectedSemester)
module.exports = router