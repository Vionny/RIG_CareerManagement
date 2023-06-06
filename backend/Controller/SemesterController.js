const { pool } = require("../Database/DatabaseConfig");

const  getAllSemester = (req, res, next) =>{
    const query = "SELECT RTRIM(semesterid) semesterid, semestername, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterstartdate, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterenddate FROM semester"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

const getCurrentSemester = (req, res, next) =>{
    const query = "SELECT RTRIM(semesterid) semesterid, semestername, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterstartdate, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterenddate FROM semester WHERE NOW() BETWEEN semesterstartdate AND semesterenddate "

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

module.exports = {
    getAllSemester,
    getCurrentSemester
};