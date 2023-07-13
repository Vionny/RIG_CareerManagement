const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package

const divisionRoutes = require('./Routes/DivisionRoutes');
const semesterRoutes = require('./Routes/SemesterRoutes');
const roleRoutes = require('./Routes/RoleRoutes');
const userRoutes = require('./Routes/UserRoutes');
const promotionRoutes = require('./Routes/PromotionRoutes');
const candidateRoutes = require('./Routes/CandidateRoutes');
const fileRoutes = require('./Routes/FileRoutes');


app.use(bodyParser.json());
app.use(cors());
app.use(divisionRoutes);
app.use(semesterRoutes);
app.use(roleRoutes);
app.use(userRoutes);
app.use(promotionRoutes);
app.use(candidateRoutes);
app.use(fileRoutes);


app.listen(8080);
module.exports = { router };
