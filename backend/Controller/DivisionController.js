const { pool } = require("../Database/DatabaseConfig");

const getAllDivision = (req, res, next) =>{
    const query = "SELECT * FROM division"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching division');
        } else {
            res.status(200).send(result.rows);
        }
    });
}

const getDivisionByRole = (req, res, next) =>{

    const divisionid = req.params.divisionid
    const query = "SELECT * FROM division WHERE divisionid = $1"

    pool.query(query,[divisionid], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching division');
        } else {
            console.log(result.rows)
            res.status(200).send(result.rows);
        }
    });

}


const updateDivision = (req, res, next) =>{
    const divisionname = req.body.divisionname
    const divisiondescription = req.body.divisiondescription
    const divisionid = req.body.divisionid
    
    const query = "UPDATE division SET divisionname = $1, divisiondescription = $2 WHERE divisionid = $3"

    pool.query(query,[divisionname, divisiondescription, divisionid], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error update division');
        } else {
            res.status(200).send("Success");
        }
    });
}



module.exports = {
    getAllDivision,
    getDivisionByRole,
    updateDivision
 };