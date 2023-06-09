
const express = require('express');
const { getUser, insertCareerChoice, finalizeCareerChoice } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial',getUser)
router.post('/insertCareerChoice',insertCareerChoice)
router.post('/finalizeCareerChoice',finalizeCareerChoice)


module.exports = router