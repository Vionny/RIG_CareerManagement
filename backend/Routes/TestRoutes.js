const express = require('express');
const { BATestHandler, getBATestSchedule, getRoleNotInserted, getInterviewer, InterviewTestInputHandler } = require('../Controller/TestController');
const router = express.Router();

router.get('/getBATestSchedule/:semesterid',getBATestSchedule)
router.get('/getRoleNotInserted/:semesterid/:initial',getRoleNotInserted)
router.get('/getInterviewer',getInterviewer)

router.post('/BATestHandler',BATestHandler)
router.post('/InterviewTestInputHandler',InterviewTestInputHandler)
module.exports = router;