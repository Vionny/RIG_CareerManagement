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

const getPromotionRegistrant = (req,res,next) =>{

    const semesterid = req.params.semesterid
    const query = "SELECT pr.initial, ast.assistantname, rolename, priority, prd.registrationreason, prd.period, ast.eligiblepromotionstatus FROM role r JOIN promotionregistrationdetail prd ON prd.roleid = r.roleid JOIN promotionregistration pr ON prd.promotionregistrationid = pr.promotionregistrationid JOIN assistant ast ON pr.initial = ast.initial WHERE pr.semesterid = $1"

    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.send('Error fetching promotion registrant');
        } else {
            
            // console.log(result.rows[0].priority)
            if (result.rows.length === 0) {
                res.status(200).send('0');
              } 
            else res.status(200).send(result.rows);
        }
    });
}

const getRegistrees = (req, res) => {
  const query = "SELECT DISTINCT initial FROM promotionregistration p JOIN promotionregistrationdetail pd ON p.promotionregistrationid = pd.promotionregistrationid WHERE semesterid = $1 ORDER BY initial ASC"
  const semesterid = req.params.semesterid
  pool.query(query,[semesterid], (error, result) => {
    if (error) {
        console.log(error)
        res.send('Error fetching promotion registrant');
    } else {
        
        // console.log(result.rows[0].priority)
        if (result.rows.length === 0) {
            res.status(200).send('0');
          } 
        else res.status(200).send(result.rows);
    }
});

}
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  return id;
}
const insertPromotionRanking = (data,semesterid)=>{
  let success = false;
  console.log(data)
  console.log(semesterid)
  data.forEach((item) => {
      const { initial, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff} = item;
      console.log(item)

      const query = "INSERT INTO promotionranking (promotionrankingid, initial, semesterid, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff) SELECT $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13 WHERE NOT EXISTS (  SELECT * FROM promotionranking WHERE initial = $2 AND semesterid = $3 )";
      let promotionrankingid = generateRandomId(10)
      console.log(promotionrankingid)
      pool.query(query, [promotionrankingid, initial,semesterid, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff], (error, results) => {
        if (error) {
          success = false;
          // console.error(error);
          console.log(error)
        } else {
          console.log('Success');
        }
      });
    });
    if (success) {
      return 'Success';
    } else {
      return 'False';
    }
}

module.exports={
    insertPromotionRegistration,
    getLastPriorityInsert,
    getPromotionRegistrant,
    getRegistrees,
    insertPromotionRanking,
    generateRandomId
}