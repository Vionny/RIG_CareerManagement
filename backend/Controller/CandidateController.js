const { pool } = require("../Database/DatabaseConfig");

const getCandidateList = (req,res,next) =>{

    const semesterid = req.params.semesterid
    const query = "SELECT " +
        "promotionrankingid, ast.initial, " +
        "MAX(CASE WHEN prd.priority = 1 THEN rolename END) AS priorityOne, " +
        "MAX(CASE WHEN prd.priority = 2 THEN rolename END) AS priorityTwo, " +
        "MAX(CASE WHEN prd.priority = 3 THEN rolename END) AS priorityThree, " +
        "commentCount.commentAmount, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff, period, iscandidate " +
    "FROM assistant ast " +
    "JOIN promotionregistration pr ON pr.initial = ast.initial " +
    "JOIN promotionregistrationdetail prd ON pr.promotionregistrationid = prd.promotionregistrationid " +
    "JOIN role rl ON rl.roleid = prd.roleid " +
    "LEFT JOIN ( " +
        "SELECT initial, COUNT(a.commentcollectionid) AS commentAmount FROM commentcollection c " +
        "JOIN assistantcomment a ON a.commentcollectionid = c.commentcollectionid " +
        "WHERE c.semesterid = $1 " +
        "GROUP BY initial " +
    ") commentCount ON ast.initial = commentCount.initial " +
    "JOIN promotionranking pra ON pra.initial = ast.initial " +
    "WHERE pr.semesterid = $1 " +
    "GROUP BY ast.initial, period, iscandidate, commentCount.commentAmount, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff,promotionrankingid";


    pool.query(query,[semesterid], (error, result) => {
        if (error) {
            console.log(error)
            res.send('Error fetching promotion registrant');
        } else {
           
             res.status(200).send(result.rows);
        }
    });
}

const updateCandidateRanking = (req,res)=>{
    let success = false;
    // console.log(req.body.data)
    data = req.body.data
    data.forEach((item) => {
        const { promotionrankingid, initial, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff} = item;
        console.log({ initial, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff})
  
        const query = "UPDATE promotionranking "+
        "SET opofficer=$2, resmanoff=$3, astdev=$4, subco=$5, subdev=$6, dbstaff=$7,"+ "naofficer=$8, nastaff=$9, rndofficer=$10, rndstaff=$11 "+
        "WHERE promotionrankingid = $1"
        pool.query(query, [promotionrankingid, opofficer, resmanoff, astdev, subco, subdev, dbstaff, naofficer, nastaff, rndofficer, rndstaff], (error, results) => {
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
        return res.send(200).send('Success');
      } else {
        return res.send(200).send('Failed');
      }
  }


module.exports={
    getCandidateList,
    updateCandidateRanking
}