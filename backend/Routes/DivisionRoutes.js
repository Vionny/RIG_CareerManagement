
const express = require('express');
const { getAllDivision } = require('../Controller/DivisionController');
const router = express.Router()

router.get('/getAllDivision',getAllDivision)

module.exports = router