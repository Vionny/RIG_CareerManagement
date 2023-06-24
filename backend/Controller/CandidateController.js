const { pool } = require("../Database/DatabaseConfig");

const getCandidateList = (req,res,next) =>{

    const semesterid = req.params.semesterid
    const query = "SELECT DISTINCT ast.initial, MAX(CASE WHEN prd.priority = 1 THEN rolename END),MAX(CASE WHEN prd.priority = 2 THEN rolename END), MAX(CASE WHEN prd.priority = 3 THEN rolename END)FROM assistant ast JOIN promotionregistration pr ON pr.initial = ast.initial JOIN promotionregistrationdetail prd ON pr.promotionregistrationid = prd.promotionregistrationid JOIN role rl ON rl.roleid = prd.roleid  WHERE pr.semesterid = $1 GROUP BY ast.initial, period, iscandidate"

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.send('Error fetching promotion registrant');
        } else {
           
             res.status(200).send(result.rows);
        }
    });
}




module.exports={
    getCandidateList
}