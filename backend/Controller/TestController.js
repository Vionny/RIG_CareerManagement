const { pool } = require("../Database/DatabaseConfig");
const { generateRandomId } = require("./UserController");

const BATestHandler = (req, res) => {
  
  const semesterid = req.body.semesterid;
  const batestdate = req.body.batestdate;
  const batestid = 'BA'+semesterid;
  const batestenddate = req.body.batestenddate
  const query = `INSERT INTO batestschedule (batestscheduleid, semesterid, batestdate,batestenddate) VALUES ($1, $2, $3,$4) `;
    console.log(batestid, semesterid,batestdate);
  pool.query(query, [batestid, semesterid, batestdate,batestenddate], (err, result) => {
    if (err) {
        if(err.constraint == 'batestschedule_pkey'){
            const query2 = ` UPDATE batestschedule SET batestdate =$1, batestenddate = $3 WHERE batestscheduleid = $2`
            pool.query(query2, [batestdate,batestid,batestenddate], (err, result) => {
                if(err){

                }else{
                    res.send('Update')
                }
            })
        }
      console.log(err.constraint)
    } else {
      res.send('Success')
    }
    
  });
};

const getBATestSchedule=(req,res)=>{

    const semesterid = req.params.semesterid

    const query = `SELECT * FROM batestschedule WHERE semesterid = $1`

    pool.query(query,[semesterid],(err,result)=>{
        if(err){
            res.status(400).send(err)
        }else{
            // console.log(result.rows)
            res.status(200).send(result.rows)
        }
    })

}

const getRoleNotInserted = (req,res)=>{

  const semesterid = req.params.semesterid
  const initial = req.params.initial
  console.log(semesterid,initial)
  const query = `SELECT r.roleid, rolename FROM promotionregistration p JOIN promotionregistrationdetail pd  ON p.promotionregistrationid = pd.promotionregistrationid JOIN role r ON r.roleid = pd.roleid WHERE semesterid = $1 AND initial = $2 AND pd.roleid NOT IN ( SELECT roleid FROM interviewallocation WHERE interviewinitial = $2)`
  pool.query(query,[semesterid,initial],(err,result)=>{
    if(err){
        res.status(400).send(err)
    }else{
        console.log(result.rows)
        res.status(200).send(result.rows)
    }
  })

}
const getInterviewer = (req,res)=>{

  const semesterid = req.params.semesterid
  const initial = req.params.initial
  console.log(semesterid,initial)
  const query = `SELECT initial,assistantname FROM assistant WHERE roleid NOT IN ('RL002','RL013','RL014','RL011','RL012')`

  pool.query(query,(err,result)=>{
    if(err){
        res.status(400).send(err)
    }else{
        // console.log(result.rows)
        res.status(200).send(result.rows)
    }
  })

}

const InterviewTestInputHandler = (req, res) => {
  const initial = req.body.initial
  const semesterid = req.body.semesterid;
  const interviewdate = req.body.interviewdate;
  const interviewroom = req.body.interviewroom
  const roleid = req.body.roleid
  const interviewid = generateRandomId(10)

  const query = `INSERT INTO interviewallocation( interviewid, interviewinitial, interviewdatetime, interviewroom, roleid,semesterid) VALUES ($1, $2, $3, $4, $5,$6)`;
  pool.query(query, [interviewid,initial,interviewdate,interviewroom,roleid,semesterid], (err, result) => {
    if (err) {
      console.log(err.constraint)
    } else {
      res.send('Success')
    }
    
  });
};

const getInterviewSchedule = (req, res) => {
  const initial = req.params.initial
  const query = `SELECT * FROM interviewallocation WHERE initial = $1`

  pool.query(query, [initial],(err,result)=>{
    if(!err){
      res.status(200).send(result.rows)
    }
  })

}

const getSchedule = (req, res) => {

  const semesterid = req.params.semesterid
  const initial = req.params.initial

  const query = `SELECT interviewdatetime,interviewroom,rolename FROM interviewallocation i LEFT JOIN role r ON i.roleid = r.roleid WHERE interviewinitial = $1 AND semesterid = $2`
  // console.log(semesterid,initial)
  pool.query(query, [initial,semesterid], (err, result) => {
    if (err) {
      // console.log(err.constraint)
    } else {
      res.send(result.rows)
    }
    
  });
}

module.exports = {
  BATestHandler,
  getBATestSchedule,
  getRoleNotInserted,
  InterviewTestInputHandler,
  getInterviewer,
  getInterviewSchedule,
  getSchedule
};
