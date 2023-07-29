const mysql = require('mysql2/promise');
const dbConfig = require("./config");


async function query(sql: string, params: Array<string>) {
  const connection = await mysql.createConnection(dbConfig);
  const [results] = await connection.query(sql, params);
  return results;
}

async function execute(sql: string, params: Array<string>) {
  const connection = await mysql.createConnection(dbConfig);
  const res = connection.execute(sql, params);
  return res;
}

module.exports = {
  query,
  execute
};