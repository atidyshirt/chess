const users = require("../models/users.model");

exports.getUser = async function(req, res) {
  if (req.params.id == undefined) {
    res.status(404).send(`ERROR: User Not Found`);
  }
  try {
    const id = req.params.id;
    const result = await users.getUserById(id);

    if (result == undefined) {
      res.status(404).send(`ERROR: No User Matches Given ID`);
    } else {
      const token = result.auth_token;
      if (
        token == null ||
        token == undefined ||
        !req.header("X-Authorization")
      ) {
        res.status(200).send({
          firstName: result.first_name,
          lastName: result.last_name,
        });
      } else {
        res.status(200).send({
          firstName: result.first_name,
          lastName: result.last_name,
          email: result.email,
        });
      }
    }
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}
