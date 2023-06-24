const express = require('express');
const { getCandidateList } = require('../Controller/CandidateController');
const router = express.Router()

router.get('/getCandidateList/:semesterid',getCandidateList)

module.exports = router