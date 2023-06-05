
const express = require('express');
const { getRoleByDivision, getAllRole } = require('../Controller/RoleController');
const router = express.Router()

router.get('/getAllRole',async (req,res)=>{
    const roles = await getAllRole()
    res.send(roles)

})

router.get('/getRoleByDivision/:divID',async (req,res)=>{
    const divID = req.params.divID
    const roles = await getRoleByDivision(divID)
    res.send(roles)
})

module.exports = router