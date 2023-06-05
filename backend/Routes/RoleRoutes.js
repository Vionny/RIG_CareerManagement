
const express = require('express');
const { getRoleByDivision, getAllRole } = require('../Controller/RoleController');
const router = express.Router()

router.get('/getAllRole',getAllRole)
router.get('/getRoleByDivision/:divID', getRoleByDivision)

module.exports = router