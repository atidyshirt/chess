const db = require("../../config/db");

exports.getUserById = async function(id) {
  let query = `select first_name, last_name, email, auth_token from user where id=${id}`;
  const conn = await db.getPool().getConnection();
  const [[rows]] = await conn.query(query);
  if (rows.count >= 1) {
    return 400;
  }
  conn.release();
  return rows;
};

exports.setChessUsername = async function(token, username) {
  const conn = await db.getPool().getConnection();
  let query = `update user set chess_username='${username}' where auth_token='${token}'`;
  const result = await conn.query(query);
  if (result[0].affectedRows == 0) {
    return 400;
  }
  conn.release();
  return 200;
};

exports.loginAccount = async function(email) {
  try {
    const post = `select email, password, id from user where email='${email}'`;
    const conn = await db.getPool().getConnection();
    const [[response]] = await conn.query(post);
    conn.release();
    if (response == undefined) {
      return null;
    }
    return response;
  } catch (err) {
    return null;
  }
};

exports.logoutAccount = async function(token) {
  const update = `update user set auth_token=null where auth_token ='${token}'`;
  const conn = await db.getPool().getConnection();
  const response = await conn.query(update);
  conn.release();
  return response;
};

exports.registerAccount = async function(
  first_name,
  last_name,
  email,
  password
) {
  const conn = await db.getPool().getConnection();
  const selectCheck = `select count(*) as count from user where email='${email}'`;
  const insert = `insert into user(first_name, last_name, email, password) values ('${first_name}', '${last_name}', '${email}', '${password}')`;
  let [[select]] = await conn.query(selectCheck);
  if (select.count >= 1) {
    return 400;
  } else {
    await conn.query(insert);
    [[select]] = await conn.query(`select id from user where email='${email}'`);
    conn.release();
    return select;
  }
};

exports.setToken = async function(newToken, id) {
  const update = `update user set auth_token='${newToken}' where id=${id}`;
  const conn = await db.getPool().getConnection();
  await conn.query(update);
  conn.release();
};
