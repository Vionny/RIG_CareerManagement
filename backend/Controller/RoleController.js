const { pool } = require("../Database/DatabaseConfig");

const getAllRole = (req, res, next) =>{
    const query = "SELECT * FROM role"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching role');
        } else {
            res.status(200).send(result.rows);
        }
    });
}

const getRoleByDivision = (req, res, next) =>{
    const query = "SELECT * FROM role WHERE divisionid = $1"
    const divID = req.params.divID
    pool.query(query,[divID], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching role');
        } else {
            res.status(200).send(result.rows);
        }
    });
}

module.exports = {
    getAllRole,
    getRoleByDivision
};