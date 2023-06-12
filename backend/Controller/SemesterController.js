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

    console.log(req.body.promotionstartdate,req.body.promotionenddate)
    console.log(promotionstartdate,promotionenddate)

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


const updateChoiceDate = (req, res, next) =>{
    const choicestartdate = req.body.choicestartdate
    const choiceenddate = req.body.choiceenddate
    const semesterid = req.body.semesterid

    const query = "UPDATE semester SET choicestartdate = $1, choiceenddate=$2 WHERE semesterid = $3"
    
    
    pool.query(query,[choicestartdate, choiceenddate, semesterid], (error, result) =>{
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

    const semesterid = req.params.semesterid
    const query = "SELECT TO_CHAR(promotionstartdate:: DATE, 'yyyy-mm-dd') promotionstartdate, TO_CHAR(promotionenddate:: DATE, 'yyyy-mm-dd') promotionenddate, TO_CHAR(choicestartdate:: DATE, 'yyyy-mm-dd') choicestartdate, TO_CHAR(choiceenddate:: DATE, 'yyyy-mm-dd') choiceenddate FROM semester WHERE semesterid=$1"

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows);
        }
    });
}

const getPromotionEnd = (req, res, next) =>{

    const semesterid = req.body.semesterid
    const query = "SELECT  choiceenddate FROM semester WHERE semesterid=$1"

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

const getChoiceEnd = (req, res, next) =>{

    const semesterid = req.body.semesterid
    const query = "SELECT  promotionenddate FROM semester WHERE semesterid=$1"

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

const insertSemester = (req, res, next) =>{
    const semesterid = req.body.semesterid
    const semestername = req.body.semestername
    const semesterstartdate = req.body.semesterstartdate
    const semesterenddate = req.body.semesterstartdate

    const query = "insert into semester  values ($1, $2, $3, $4)"

    pool.query(query,[semesterid, semestername, semesterstartdate, semesterenddate], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

const deleteSemester = (req, res, next) =>{
    const semesterid = req.params.semesterid
    
    const query = "DELETE FROM semester WHERE semesterid = $1"

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching current semester');
        } else {
            res.status(200).send(result.rows)
        }
    });
}

const updateSemester = (req, res, next) =>{
    const semesterid = req.body.semesterid
    const semesterstartdate = req.body.semesterstartdate
    const semesterenddate = req.body.semesterstartdate
    
    const query = "UPDATE semester SET semesterstartdate = $2, semesterenddate=$3 WHERE semesterid = $1"

    pool.query(query,[semesterid, semesterstartdate, semesterenddate], (error, result) => {
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
    getPhases,
    getPromotionEnd,
    getChoiceEnd,
    insertSemester,
    deleteSemester,
    updateSemester,
    updatePromotionDate,
    updateChoiceDate
};