
const express = require('express');
const { getUser } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial',getUser)


module.exports = router