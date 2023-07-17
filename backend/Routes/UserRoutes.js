
const express = require('express');
const { getUser, insertCareerChoice, finalizeCareerChoice, getTeamMember, getAllUser, updateAstCareerChoice,updateAssistant, deleteAssistant, insertComment, getComment, getProblem, resetFinalize } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial',getUser)
router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.post('/updateAssistant',updateAssistant)
router.get('/getTeamMember/:roleid', getTeamMember)
router.get('/getAllUser', getAllUser)
router.get('/getComment/:initial/:semesterid', getComment)
router.get('/getProblem/:initial', getProblem)

router.post('/insertCareerChoice',insertCareerChoice)
router.post('/insertComment',insertComment)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.delete('/deleteAssistant/:initial', deleteAssistant)
router.patch('/updateAstCareerChoice',updateAstCareerChoice)
router.patch('/resetFinalize',resetFinalize)

module.exports = router