const { pool } = require("../Database/DatabaseConfig");

function getAllSemester(){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM semester"

        pool.query(query, (error, result) => {
            if (error) {
                console.log(error)
                reject(error);
            res.status(500).send('Error fetching semester');
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
    getAllSemester,
};