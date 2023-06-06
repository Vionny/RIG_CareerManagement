const { pool } = require("../Database/DatabaseConfig");

const insertPromotionDetail= ()=>{

}

const insertPromotionRegistration = (req, res, next) =>{
    console.log(req.body)
    console.log('hi')

    const initial = req.body.initial
    const semesterid = req.body.semesterid
    const roleID = req.body.roleid.substring(0,req.body.roleid.indexOf(' '))
    const priority = req.body.priority
    const registrationreason = req.body.registrationreason
    const iscandidate = req.body.iscandidate
    const period = req.body.period

    const promoRegisID = initial.substring(0,2) + semesterid
    const insertTableHeaderQuery = "INSERT INTO promotionregistration VALUES ($1,$2,$3)"
    const insertTableDetailQuery = "INSERT INTO promotionregistrationdetail VALUES($1,$2,$3,$4,$5,$6)"
    if(req.body.priority ==1 ){
        pool.query(insertTableHeaderQuery,[promoRegisID,initial,semesterid], (error, res) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error adding table header promotion registration');
        } else {
            res.status(200).send('Success')
        }
        });
    }

    pool.query(insertTableDetailQuery,[promoRegisID,roleID,priority, registrationreason, iscandidate,period], (error, res) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error adding table detail promotion registration');
        } else {
            res.status(200).send('Success')
            
        }
    });
}

const getLastPriorityInsert = (req,res,next) =>{
    const query = "SELECT priority FROM promotionregistration pr JOIN promotionregistrationdetail prd ON pr.promotionregistrationid = prd.promotionregistrationid WHERE initial = 'VA22-1' ORDER BY priority DESC LIMIT 1"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching semester');
        } else {
            if(result.rowCount == 0) res.status(200).send('0')
            else result.status(200).send(result.rowCount)
        }
    });

}
module.exports={
    insertPromotionRegistration,
    getLastPriorityInsert
}