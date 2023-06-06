const { pool } = require("../Database/DatabaseConfig");

const insertPromotionRegistration = (req, res, next) =>{
    console.log(req)
    console.log('hi')
    // res.send(req)
}

const getLastPriorityInsert = (req, res, next) =>{
    const query = "SELECT priority FROM promotionregistration pr JOIN promotionregistrationdetail prd ON pr.promotionregistrationid = prd.promotionregistrationid WHERE initial = 'VA22-1' ORDER BY priority DESC LIMIT 1"

    pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching semester');
        } else {
            if(result.rowCount == 0) res.status(200).send('0')
            else res.status(200).send(result.rowCount)
        }
    });
}
module.exports={
    insertPromotionRegistration,
    getLastPriorityInsert
}