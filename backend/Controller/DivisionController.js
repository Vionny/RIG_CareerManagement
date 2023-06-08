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

module.exports = {
    getAllDivision,
    getDivisionByRole
 };