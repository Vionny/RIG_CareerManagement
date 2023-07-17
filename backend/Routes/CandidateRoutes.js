const express = require('express');
const { getCandidateList, updateCandidateRanking } = require('../Controller/CandidateController');
const router = express.Router()

router.get('/getCandidateList/:semesterid',getCandidateList)

router.patch('/updateCandidateRanking',updateCandidateRanking)

module.exports = router