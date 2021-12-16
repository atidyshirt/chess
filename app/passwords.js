const bcrypt = require("bcrypt");
const SALT = 11;

exports.hash = async function(password) {
  return bcrypt.hash(password, SALT);
};
