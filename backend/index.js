const express = require('express');
const app = express()
const router = express.Router()
const bodyParser = require('body-parser');

const divisionRoutes = require('./Routes/DivisionRoutes')
const semesterRoutes = require('./Routes/SemesterRoutes')
const roleRoutes = require('./Routes/RoleRoutes')
const userRoutes = require('./Routes/UserRoutes')
const promotionRoutes = require('./Routes/PromotionRoutes')

app.use(bodyParser.json());
app.use(divisionRoutes)
app.use(semesterRoutes)
app.use(roleRoutes)
app.use(userRoutes);
app.use(promotionRoutes);


app.listen(8080);
module.exports = {router}