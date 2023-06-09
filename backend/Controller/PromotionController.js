const { pool } = require("../Database/DatabaseConfig");


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
        pool.query(insertTableHeaderQuery,[promoRegisID,initial,semesterid], (error, result) => {
          if (error) {
            console.log(insertTableDetailQuery,insertTableDetailQuery)
              console.log(error)
              res.status(500).send('Error adding table header promotion registration');
          } else {
              // res.status(200).send('Success')
              insertTableDetail()
          }
        });
    }else{
        insertTableDetail()
    }

  function insertTableDetail() {
    pool.query(insertTableDetailQuery, [promoRegisID, roleID, priority, registrationreason, iscandidate, period], (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error adding table detail promotion registration');
      } else {
        res.status(200).send('Success');
      }
    });
  }
}

const getLastPriorityInsert = (req,res,next) =>{

    const initial = req.params.initial
    const semesterid = req.params.semesterid
    const query = "SELECT priority FROM promotionregistration pr JOIN promotionregistrationdetail prd ON pr.promotionregistrationid = prd.promotionregistrationid WHERE initial = $1 AND semesterid = $2 ORDER BY priority DESC LIMIT 1"

    pool.query(query,[initial,semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.send('Error fetching semester');
        } else {
            
            // console.log(result.rows[0].priority)
            if (result.rows.length === 0) {
                res.status(200).send('0');
              } 
            else res.status(200).send(result.rows);
        }
    });
}
module.exports={
    insertPromotionRegistration,
    getLastPriorityInsert
}