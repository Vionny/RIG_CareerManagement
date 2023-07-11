
const express = require('express');
const { getUser, insertCareerChoice, finalizeCareerChoice, getTeamMember, getAllUser, updateAstCareerChoice } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial',getUser)
router.get('/getTeamMember/:roleid', getTeamMember)
router.get('/getAllUser', getAllUser)

router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)

router.patch('/updateAstCareerChoice',updateAstCareerChoice)

module.exports = router