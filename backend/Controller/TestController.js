const { pool } = require("../Database/DatabaseConfig");

const BATestHandler = (req, res) => {
  
  const semesterid = req.body.semesterid;
  const batestdate = req.body.batestdate;
  const batestid = 'BA'+semesterid;

  const query = `INSERT INTO batestschedule (batestscheduleid, semesterid, batestdate) VALUES ($1, $2, $3) `;
    console.log(batestid, semesterid,batestdate);
  pool.query(query, [batestid, semesterid, batestdate], (err, result) => {
    if (err) {
        if(err.constraint == 'batestschedule_pkey'){
            const query2 = ` UPDATE batestschedule SET batestdate =$1 WHERE batestscheduleid = $2`
            pool.query(query2, [batestdate,batestid], (err, result) => {
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

const getRoleToTest = (req,res)=>{
  
  const query =`SELECT * FROM role r LEFT JOIN testallocation ta ON r.roleid = ta.roleid WHERE r.roleid NOT IN ('RL002','RL014','RL013')`

}

module.exports = {
  BATestHandler,
  getBATestSchedule
};
