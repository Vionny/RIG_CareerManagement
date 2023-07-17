const express = require('express');
const { BATestHandler, getBATestSchedule } = require('../Controller/TestController');
const router = express.Router();

router.get('/getBATestSchedule/:semesterid',getBATestSchedule)

router.post('/BATestHandler',BATestHandler)

module.exports = router;