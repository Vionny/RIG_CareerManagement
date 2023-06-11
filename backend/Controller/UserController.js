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
    const query = "SELECT * FROM assistant WHERE roleid = $1"
    console.log(query);

    pool.query(query, [roleid], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    
    })
}
module.exports = {
    getUser,
    insertCareerChoice,
    finalizeCareerChoice,
    getTeamMember
}