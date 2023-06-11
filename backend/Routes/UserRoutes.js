
const express = require('express');
const { getUser, insertCareerChoice, finalizeCareerChoice, getTeamMember } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial',getUser)
router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.get('/getTeamMember/:roleid', getTeamMember)


module.exports = router