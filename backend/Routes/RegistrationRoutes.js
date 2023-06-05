const express = require('express');
const { getAllSemester, getCurrentSemester } = require('../Controller/SemesterController');
const router = express.Router()

// router.post('/get',getAllSemester)