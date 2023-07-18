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

const getRoleStatistics = (req, res) => {

    const query = "SELECT divisionid,r.roleid, r.rolename, r.maximumslot, COUNT(a.roleid) AS assistant_count, SUM(CASE WHEN a.careerchoice = 'tentative' THEN 1 ELSE 0 END) AS tentative_count, SUM(CASE WHEN a.careerchoice = 'willing' THEN 1 ELSE 0 END) AS willing_count, SUM(CASE WHEN a.careerchoice = 'not willing' THEN 1 ELSE 0 END) AS not_willing_count FROM role AS r LEFT JOIN assistant AS a ON r.roleid = a.roleid GROUP BY r.roleid, r.rolename, r.maximumslot"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching role');
        } else {
            res.status(200).send(result.rows);
        }
    });

}

const getRegistCount = (req, res) => {

    const smt = req.params.smt
    const query = "SELECT r.roleid, rolename, COUNT(CASE WHEN pr.semesterid = $1 THEN 1 ELSE NULL END) AS count FROM role r LEFT JOIN promotionregistrationdetail prd ON r.roleid = prd.roleid LEFT JOIN promotionregistration pr ON pr.promotionregistrationid = prd.promotionregistrationid GROUP BY r.roleid, rolename;"

    pool.query(query,[smt], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching count');
        } else {
            res.status(200).send(result.rows);
        }
    });

}

const getRoleAvailSlot = (req, res) => {

    const query = "SELECT r.roleid, r.rolename, r.maximumslot, (r.maximumslot - COUNT(a.roleid)) AS available_slot FROM role AS r LEFT JOIN assistant AS a ON r.roleid = a.roleid GROUP BY r.roleid, r.rolename, r.maximumslot;"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching slot');
        } else {
            res.status(200).send(result.rows);
        }
    });

}

const getRoleCandidate = (req, res) => {

    const smt = req.params.smt
    const query = "SELECT COUNT(CASE WHEN opofficer > '0' THEN 1 END) AS opofficer_count, COUNT(CASE WHEN resmanoff > '0' THEN 1 END) AS resmanoff_count, COUNT(CASE WHEN astdev > '0' THEN 1 END) AS astdev_count, COUNT(CASE WHEN subco > '0' THEN 1 END) AS subco_count, COUNT(CASE WHEN subdev > '0' THEN 1 END) AS subdev_count, COUNT(CASE WHEN dbstaff > '0' THEN 1 END) AS dbstaff_count, COUNT(CASE WHEN naofficer > '0' THEN 1 END) AS naofficer_count, COUNT(CASE WHEN nastaff > '0' THEN 1 END) AS nastaff_count, COUNT(CASE WHEN rndofficer > '0' THEN 1 END) AS rndofficer_count, COUNT(CASE WHEN rndstaff > '0' THEN 1 END) AS rndstaff_count FROM promotionranking WHERE semesterid = $1"

    pool.query(query, [smt], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching candidate');
        } else {
            res.status(200).send(result.rows);
        }
    });

}


const updateRole = (req, res, next) =>{
    const rolename = req.body.rolename
    const maximumslot = req.body.maximumslot
    const rolerequirements = req.body.rolerequirements
    const roleid = req.body.roleid
    
    const query = "UPDATE role SET rolename = $1, maximumslot = $2, rolerequirements = $3 WHERE roleid = $4"

    pool.query(query,[rolename, maximumslot, rolerequirements, roleid], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error update role');
        } else {
            res.status(200).send("Success");
        }
    });
}



module.exports = {
    getAllRole,
    getAstRegisteredRole,
    getRoleByDivision,
    getRoleStatistics,
    updateRole,
    getRoleAvailSlot,
    getRegistCount,
    getRoleCandidate
};