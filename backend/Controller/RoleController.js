const { pool } = require("../Database/DatabaseConfig");

const getAllRole = (req, res, next) =>{
    const query = "SELECT * FROM role ORDER BY roleid"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching role');
        } else {
            res.status(200).send(result.rows);
        }
    });
}


const getAstRegisteredRole = (req, res, next) =>{

    const initial = req.params.initial
    const semesterid = req.params.semesterid
    const query = "SELECT * FROM role WHERE roleid NOT IN ( SELECT roleid FROM promotionregistrationdetail prd JOIN promotionregistration pr ON pr.promotionregistrationid = prd.promotionregistrationid  WHERE initial = $1 AND semesterid = $2 ) AND roleid NOT IN ('RL002','RL013','RL014') ORDER BY roleid"
    pool.query(query,[initial, semesterid], (error, result) => {
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
    getAstRegisteredRole,
    getRoleByDivision
};