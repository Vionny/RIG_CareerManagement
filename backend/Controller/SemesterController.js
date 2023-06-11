const { pool } = require("../Database/DatabaseConfig");

const  getAllSemester = (req, res, next) =>{
    const query = "SELECT semesterid, semestername, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterstartdate, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterenddate FROM semester"

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
    const query = "SELECT semesterid, semestername, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterstartdate, TO_CHAR(semesterstartdate:: DATE, 'yyyy-mm-dd') semesterenddate FROM semester WHERE NOW() BETWEEN semesterstartdate AND semesterenddate "

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

const getSelectedSemester = (req, res, next) =>{

    const query = "SELECT * FROM semester WHERE semesterid = $1"
    const semesterid = req.params.semesterid

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}


const updatePromotionDate = (req, res, next) =>{
    const promotionstartdate = req.body.promotionstartdate
    const promotionenddate = req.body.promotionenddate
    const semesterid = req.body.semesterid

    const query = "UPDATE semester SET promotionstartdate = $1, promotionenddate=$2 WHERE semesterid = $3"
    
    
    pool.query(query,[promotionstartdate, promotionenddate, semesterid], (error, result) =>{
        if (error) {
            console.log(error)
            res.status(500).send('Error updating');
        } else {
            console.log(result)
            res.status(200).send('Success')
        }
    })
}

const getPhases = (req, res, next) =>{

    const semesterid = req.body.semesterid
    const query = "SELECT promotionstartdate FROM semester WHERE semesterid=$1"

    pool.query(query,[semesterid], (error, result) => {
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
    getCurrentSemester,
    getSelectedSemester,
    updatePromotionDate,
    getPhases
};