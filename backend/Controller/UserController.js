const { pool } = require("../Database/DatabaseConfig");

const getUser = (req, res, next) =>{
    const initial = req.params.initial
    const query = "SELECT * FROM assistant WHERE initial = $1"

    pool.query(query, [initial], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    })
}

const getAllUser = (req, res, next) =>{
    const query = "SELECT initial, assistantname, rolename, ast.careerchoice, ast.eligiblepromotionstatus, ast.eligibleforresign,assistantleader FROM assistant ast JOIN role rl ON ast.roleid = rl.roleid ORDER BY initial ASC"

    pool.query(query,(error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    })
}



const insertCareerChoice = (req, res, next) =>{
    const initial = req.body.initial
    const careerchoice = req.body.careerchoice
    const futureplan = req.body.futureplan

    const query = "UPDATE assistant SET careerchoice = $1 , futureplan = $2 WHERE initial = $3"
    
    pool.query(query,[careerchoice,futureplan,initial], (error, result) =>{
        if (error) {
            console.log(error)
            res.status(500).send('Error updating table');
        } else {
            console.log(result)
            res.status(200).send('Success')
        }
    })

}

const finalizeCareerChoice = (req, res, next) =>{
    const initial = req.body.initial

    const query = "UPDATE assistant SET fpfinalize = true WHERE initial = $1"
    
    pool.query(query,[initial], (error, result) =>{
        if (error) {
            console.log(error)
            res.status(500).send('Error finalizing');
        } else {
            console.log(result)
            res.status(200).send('Success')
        }
    })
}

const getTeamMember = (req, res, next) => {
    const roleid = req.params.roleid
    const query = "SELECT * FROM assistant a JOIN role r ON r.roleid = a.roleid WHERE a.roleid = $1"
    console.log(query);

    pool.query(query, [roleid], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    
    })
}

const updateAstCareerChoice = (req,res)=>{
    const initial = req.body.initial
    const careerchoice = req.body.careerchoice
    const query = "UPDATE assistant SET careerchoice = $1 WHERE initial = $2"

    console.log(initial)
    console.log(careerchoice)

    pool.query(query, [careerchoice,initial], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send('Success');
        }
    
    })

}


const updateAssistant = (req, res, next) =>{
    const eligiblepromotionstatus = req.body.eligiblepromotionstatus
    const eligibleforresign = req.body.eligibleforresign
    const assistantleader = req.body.assistantleader
    const initial = req.body.initial
    
    const query = "UPDATE assistant SET eligiblepromotionstatus = $1, eligibleforresign = $2,  assistantleader= $3 WHERE initial = $4"

    pool.query(query,[eligiblepromotionstatus, eligibleforresign,assistantleader, initial], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error update semester');
        } else {
            res.status(200).send("Success");
        }
    });
}


module.exports = {
    getUser,
    insertCareerChoice,
    finalizeCareerChoice,
    getTeamMember,
    getAllUser,
    updateAstCareerChoice,
    updateAssistant,
    deleteAssistant,
    inputManyAssistant,
    insertAssistantLeader
}