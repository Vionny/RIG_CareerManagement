const express = require('express');

const app = express();

app.get('/users', (req, res, next)=>{
    console.log("Hi");
    next();
})

app.get('/', (req, res) => {
    // try {

    // }
    // const users = db.get.....where...
    // return res.send({users: [{name: "asd"}, {name: "test"}]});
})

app.listen(8080)