const express = require('express');
const { getAllDivision, getDivisionByRole, updateDivision } = require('../Controller/DivisionController');
const router = express.Router()

router.get('/getAllDivision',getAllDivision)
router.get('/getDivisionByRole/:divisionid',getDivisionByRole)
router.post('/updateDivision',updateDivision)

module.exports = router