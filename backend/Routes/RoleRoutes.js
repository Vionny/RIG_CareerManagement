
const express = require('express');
const { getRoleByDivision, getAllRole, getAstRegisteredRole, getRoleStatistics, updateRole } = require('../Controller/RoleController');
const router = express.Router()

router.get('/getAllRole',getAllRole)
router.get('/getAstRegisteredRole/:initial/:semesterid',getAstRegisteredRole)
router.get('/getRoleByDivision/:divID', getRoleByDivision)
router.get('/getRoleStatistics',getRoleStatistics)
router.post('/updateRole',updateRole)

module.exports = router