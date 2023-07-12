const express = require('express');
const { getAllDivision, getDivisionByRole, getRoleByDivision, updateDivision } = require('../Controller/DivisionController');
const router = express.Router()

router.get('/getAllDivision',getAllDivision)
router.get('/getDivisionByRole/:divisionid',getDivisionByRole)
router.get('/getRoleByDivision/:divisionid',getRoleByDivision)
router.post('/updateDivision',updateDivision)

module.exports = router