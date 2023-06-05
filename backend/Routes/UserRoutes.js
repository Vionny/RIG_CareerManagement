
const express = require('express');
const { getUser } = require('../Controller/UserController');
const router = express.Router()


router.get('/getUser/:initial', async (req,res)=>{
    const astInitial = req.params.initial
    console.log(astInitial)
    const ast = await getUser(astInitial)
    res.send(ast)
    // console.log(ast)
})


module.exports = router