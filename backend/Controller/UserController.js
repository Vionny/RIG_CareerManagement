const { pool } = require("../Database/DatabaseConfig");

function getUser(initial){
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM assistant WHERE initial = $1"

        pool.query(query, [initial], (error, result) => {
            if (error) {
                reject(error);
            res.status(500).send('Error fetching user');
            } else {
                resolve(result.rows);
            }
        });
    });
}

module.exports = {
   getUser,
};