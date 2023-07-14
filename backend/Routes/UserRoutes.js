
const express = require('express');
const { getUser, insertCareerChoice, finalizeCareerChoice, getTeamMember, getAllUser, updateAstCareerChoice,updateAssistant, deleteAssistant } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial',getUser)
router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.post('/updateAssistant',updateAssistant)
router.get('/getTeamMember/:roleid', getTeamMember)
router.get('/getAllUser', getAllUser)

router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.delete('/deleteAssistant/:initial', deleteAssistant)
router.patch('/updateAstCareerChoice',updateAstCareerChoice)

module.exports = router