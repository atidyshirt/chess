const db = require("../../config/db");

exports.getUserById = async function(id) {
  let query = `select first_name, last_name, email, auth_token from user where id=${id}`;
  const conn = await db.getPool().getConnection();
  const [[rows]] = await conn.query(query);
  conn.release();
  return rows;
};
