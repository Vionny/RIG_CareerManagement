const { pool } = require("../Database/DatabaseConfig");

function getAllDivision(){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM division"

        pool.query(query, (error, result) => {
            if (error) {
                console.log(error)
                reject(error);
            res.status(500).send('Error fetching division');
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    getAllDivision,
 };