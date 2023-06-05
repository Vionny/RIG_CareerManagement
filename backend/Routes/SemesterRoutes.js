
const express = require('express');
const { getAllSemester } = require('../Controller/SemesterController');
const router = express.Router()

router.get('/getAllSemester',async (req,res)=>{
    const semesters = await getAllSemester()
    res.send(semesters)
    // console.log(semesters)
})


module.exports = router