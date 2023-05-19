const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
