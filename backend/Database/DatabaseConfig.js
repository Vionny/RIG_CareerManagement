const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cm',
  password: 'postgres',
  port: 5432, 
});
// pool.query('SELECT * FROM testtype', (error, results) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log(results.rows);
//   }
// });

module.exports = {
  pool
}