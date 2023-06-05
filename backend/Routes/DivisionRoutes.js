
const express = require('express');
const { getAllDivision } = require('../Controller/DivisionController');
const router = express.Router()

router.get('/getAllDivision',async (req,res)=>{
    const divisions = await getAllDivision()
    res.send(divisions)

})

module.exports = router