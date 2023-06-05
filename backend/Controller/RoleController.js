const { pool } = require("../Database/DatabaseConfig");

function getAllRole(){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM role"

        pool.query(query, (error, result) => {
            if (error) {
                console.log(error)
                reject(error);
            res.status(500).send('Error fetching role');
            } else {
                resolve(result.rows);
            }
        });
    });
}

function getRoleByDivision(divID){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM role WHERE divisionid = $1"

        pool.query(query,[divID], (error, result) => {
            if (error) {
                console.log(error)
                reject(error);
            res.status(500).send('Error fetching role');
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    getAllRole,
    getRoleByDivision
 };