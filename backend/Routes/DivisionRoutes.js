
const express = require('express');
const { getAllDivision, getDivisionByRole } = require('../Controller/DivisionController');
const router = express.Router()

router.get('/getAllDivision',getAllDivision)
router.get('/getDivisionByRole/:divisionid',getDivisionByRole)
module.exports = router