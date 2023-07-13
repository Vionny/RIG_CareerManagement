const fs = require('fs');
const csv = require('csv-parser');
const { IncomingForm } = require('formidable');
const { inputManyAssistant, insertAssistantLeader } = require('./UserController');

const readCSVAstInput = (req, res, next) => {
  const form = new IncomingForm({ multiples: false });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to process form data' });
      return;
    }
  const assistants = [];    
    const file = files.file[0];
    const filePath = file.filepath; 
    
    let isFirstRow = true;
    fs.createReadStream(filePath)
      .pipe(csv({ headers: false }))
      .on('data', (row) => {
        if (!isFirstRow) {
            assistants.push({ initial: row[0], name: row[1] });
          } else {
            isFirstRow = false;
          }
      })
      .on('end', () => {
        const result = inputManyAssistant(assistants);
        console.log(result);
        if (result === 'Success') {
          const responseData = { message: 'Success', data: assistants };
          res.json(responseData);
        }
        
      })
      .on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'Failed to process CSV file' });
      });
  });
};
const readAstLeaderInput = (req, res, next) => {
    const form = new IncomingForm({ multiples: false });
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process form data' });
        return;
      }
    const assistants = [];    
      const file = files.file[0];
      const filePath = file.filepath; 
      
      let isFirstRow = true;
      fs.createReadStream(filePath)
        .pipe(csv({ headers: false }))
        .on('data', (row) => {
          if (!isFirstRow) {
              assistants.push({ initial: row[0], leader: row[1] });
            } else {
              isFirstRow = false;
            }
        })
        .on('end', () => {
          const result = insertAssistantLeader(assistants);
          console.log(result);
          if (result === 'Success') {
            const responseData = { message: 'Success', data: assistants };
            res.json(responseData);
          }
          
        })
        .on('error', (error) => {
          console.error(error);
          res.status(500).json({ error: 'Failed to process CSV file' });
        });
    });
  };
module.exports = {
  readCSVAstInput,
  readAstLeaderInput
};
