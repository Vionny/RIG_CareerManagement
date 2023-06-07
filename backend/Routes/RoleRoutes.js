
const express = require('express');
const { getRoleByDivision, getAllRole, getAstRegisteredRole } = require('../Controller/RoleController');
const router = express.Router()

router.get('/getAllRole',getAllRole)
router.get('/getAstRegisteredRole/:initial/:semesterid',getAstRegisteredRole)
router.get('/getRoleByDivision/:divID', getRoleByDivision)

module.exports = router