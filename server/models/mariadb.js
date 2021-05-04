const mariadb = require('mariadb');
const dbConfig = require("../../config/db.config");

const pool = mariadb.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  connectionLimit: 5,
  multipleStatements: true,
});
pool.getConnection()
  .catch(err => {
  });

module.exports = {
  pool
};