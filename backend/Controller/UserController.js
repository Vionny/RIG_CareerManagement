const { pool } = require("../Database/DatabaseConfig");

const getUser = (req, res, next) =>{
    const initial = req.params.initial
    const query = "SELECT * FROM assistant WHERE initial = $1"

    pool.query(query, [initial], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    })
}

const getAllUser = (req, res, next) =>{
    const query = "SELECT initial, assistantname, rolename, ast.careerchoice, ast.eligiblepromotionstatus, ast.eligibleforresign  FROM assistant ast JOIN role rl ON ast.roleid = rl.roleid ORDER BY initial ASC"

    pool.query(query,(error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    })
}



const insertCareerChoice = (req, res, next) =>{
    const initial = req.body.initial
    const careerchoice = req.body.careerchoice
    const futureplan = req.body.futureplan

    const query = "UPDATE assistant SET careerchoice = $1 , futureplan = $2 WHERE initial = $3"
    
    pool.query(query,[careerchoice,futureplan,initial], (error, result) =>{
        if (error) {
            console.log(error)
            res.status(500).send('Error updating table');
        } else {
            console.log(result)
            res.status(200).send('Success')
        }
    })

}

const finalizeCareerChoice = (req, res, next) =>{
    const initial = req.body.initial

    const query = "UPDATE assistant SET fpfinalize = true WHERE initial = $1"
    
    pool.query(query,[initial], (error, result) =>{
        if (error) {
            console.log(error)
            res.status(500).send('Error finalizing');
        } else {
            console.log(result)
            res.status(200).send('Success')
        }
    })
}

const getTeamMember = (req, res, next) => {
    const roleid = req.params.roleid
    const query = "SELECT * FROM assistant a JOIN role r ON r.roleid = a.roleid WHERE a.roleid = $1"
    console.log(query);

    pool.query(query, [roleid], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send(result.rows);
        }
    
    })
}

const updateAstCareerChoice = (req,res)=>{
    const initial = req.body.initial
    const careerchoice = req.body.careerchoice
    const query = "UPDATE assistant SET careerchoice = $1 WHERE initial = $2"

    console.log(initial)
    console.log(careerchoice)

    pool.query(query, [careerchoice,initial], (error, result) => {
        if (error) {
            res.status(500).send('Error fetching user');
        } else {
           res.status(200).send('Success');
        }
    
    })

}


const updateAssistant = (req, res, next) =>{
    const eligiblepromotionstatus = req.body.eligiblepromotionstatus
    const eligibleforresign = req.body.eligibleforresign
    const initial = req.body.initial
    
    const query = "UPDATE assistant SET eligiblepromotionstatus = $1, eligibleforresign = $2 WHERE initial = $3 "

    pool.query(query,[eligiblepromotionstatus, eligibleforresign, initial], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error update semester');
        } else {
            res.status(200).send("Success");
        }
    });
}

const deleteAssistant = (req, res, next) =>{
    const initial = req.params.initial
    
    const query = "DELETE FROM assistant WHERE initial = $1"

    pool.query(query,[initial], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Error fetching delete ast');
        } else {
            res.status(200).send("Success");
        }
    });
}

const inputManyAssistant = (assistants) =>{
    const data = assistants;
    let success = true;
  
    data.forEach((item) => {
      const { initial, name } = item;
  
      const query = `INSERT INTO public.assistant(
        initial, roleid, assistantname, eligiblepromotionstatus, eligibleforresign, careerchoice, futureplan, fpfinalize, assistantphotourl, assistantleader)
        VALUES ($1, 'RL011', $2, false, false,  'tentative', null, false, '','')`;
  
      pool.query(query, [initial, name], (error, results) => {
        if (error) {
          success = false;
          console.error(error);
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

const insertAssistantLeader = (data)=>{

    
    data.forEach((item) => {
        const { initial, leader } = item;
    
        const query = "UPDATE assistant SET assistantleader = $1 WHERE initial = $2";
    
        pool.query(query, [initial, leader], (error, results) => {
          if (error) {
            success = false;
            console.error(error);
          } else {
            console.log('Success');
          }
        });
      });
}

module.exports = {
    getUser,
    insertCareerChoice,
    finalizeCareerChoice,
    getTeamMember,
    getAllUser,
    updateAstCareerChoice,
    updateAssistant,
    deleteAssistant,
    inputManyAssistant,
    insertAssistantLeader
}