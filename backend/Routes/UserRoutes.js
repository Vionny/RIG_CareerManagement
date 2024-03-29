
const express = require('express');
const { getUser, insertCareerChoice, finalizeCareerChoice, getTeamMember, getAllUser, updateAstCareerChoice,updateAssistant, deleteAssistant, insertComment, getComment, getProblem, updateRecords,resetFinalize} = require('../Controller/UserController');
const { getAnnouncement } = require('../Controller/SemesterController');
const router = express.Router()


router.get('/getUser/:initial',getUser)
router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.post('/updateAssistant',updateAssistant)
router.get('/getTeamMember/:roleid', getTeamMember)
router.get('/getAllUser', getAllUser)
router.get('/getComment/:initial/:semesterid', getComment)
router.get('/getProblem/:initial/:semesterid', getProblem)
router.get('/getAnnouncement/:semesterid',getAnnouncement)

router.post('/insertCareerChoice',insertCareerChoice)
router.post('/insertComment',insertComment)
router.post('/finalizeCareerChoice',finalizeCareerChoice)
router.post('/updateRecords',updateRecords)
router.delete('/deleteAssistant/:initial', deleteAssistant)
router.patch('/updateAstCareerChoice',updateAstCareerChoice)
router.patch('/resetFinalize',resetFinalize)

module.exports = router