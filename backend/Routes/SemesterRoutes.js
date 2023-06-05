
const express = require('express');
const { getAllSemester } = require('../Controller/SemesterController');
const router = express.Router()

router.get('/getAllSemester',getAllSemester)


module.exports = router