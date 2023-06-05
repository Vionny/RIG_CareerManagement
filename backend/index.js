const express = require('express');
const app = express()
const router = express.Router()

const divisionRoutes = require('./Routes/DivisionRoutes')
const semesterRoutes = require('./Routes/SemesterRoutes')
const roleRoutes = require('./Routes/RoleRoutes')
const userRoutes = require('./Routes/UserRoutes')

app.use(divisionRoutes)
app.use(semesterRoutes)
app.use(roleRoutes)
app.use(userRoutes);

app.listen(8080)

module.exports = {router}