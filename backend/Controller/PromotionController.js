const { pool } = require("../Database/DatabaseConfig");

const insertPromotionDetail= ()=>{

}

const insertPromotionRegistration = (req, res, next) =>{
    console.log(req.body)
    console.log('hi')

    const promoregisid = req.body.initial.substring(0,2) + req.body.semesterid
    const insertTableHeader = "INSERT INTO promotionregistration VALUES ($1,$2,$3)"
    const insertTableDetail = "INSERT INTO promotionregistrationdetail VALUES($1,$2,$3,$4,$5,$6)"
    if(req.body.priority ==1 ){
        pool.query(query, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching semester');
        } else {
            if(result.rowCount == 0) res.status(200).send('0')
            else res.status(200).send(result.rowCount)
        }
    });
    }else{
        getLastPriorityInsert((error, data) => {
            if (error) {
              console.error(error);
            } else {
              console.log(data);
            }
          });
    }
    

}

const getLastPriorityInsert = (res) =>{
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