const { pool } = require("../Database/DatabaseConfig");

const  getAllSemester = (req, res, next) =>{
    const query = "SELECT * FROM semester"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

module.exports = {
    getAllSemester,
};