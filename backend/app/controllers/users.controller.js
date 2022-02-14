const users = require("../models/users.model");
const rt = require("rand-token");
const hash = require("../passwords");
const bcrypt = require("bcrypt");
const chessWebAPI = require("chess-web-api");

exports.linkAccount = async function(req, res) {
  var chess = new chessWebAPI();
  try {
    const token = req.header("X-Authorization");
    if (token == null || token == undefined || !req.header("X-Authorization")) {
      res.status(401).send(`ERROR: Unauthorized`);
    }
    const username = req.body.username;
    const result = await chess.getPlayer(username);
    if (result != undefined) {
      await users.setChessUsername(token, username);
      res.status(200).send(`SUCCESS: Chess.com Account Linked`);
    } else {
      res.status(400).send(`ERROR: Cannot Link Account`);
    }
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}

exports.getUserInfo = async function(req, res) {
  var chess = new chessWebAPI();
  try {
    const username = req.body.username;
    const result = await chess.getPlayer(username);
    res.status(200).send({
      "avatar": result.body.avatar,
      "username": result.body.username,
      "country": result.body.country,
      "player_id": result.body.player_id,
      "url": result.body.url,
      "followers": result.body.followers,
      "joined": result.body.joined,
      "status": result.body.status,
      "is_streamer": result.body.is_streamer,
    });
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}

exports.getUserStats = async function(req, res) {
  var chess = new chessWebAPI();
  try {
    const username = req.body.username;
    const result = await chess.getPlayerStats(username);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}

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

exports.login = async function(req, res) {
  try {
    const email = req.body.email;
    const password = await hash.hash(req.body.password);
    const token = rt.generate(32);
    if (
      !email.includes("@") ||
      email == undefined ||
      email.length < 1 ||
      password == undefined ||
      password.length < 1
    ) {
      res.status(400).send(`ERROR: Bad Request`);
    } else {
      const response = await users.loginAccount(email);
      if (response == null) {
        res.status(400).send(`ERROR: User Not Found`);
      } else if (
        (await bcrypt.compare(req.body.password, response.password)) == false
      ) {
        res.status(400).send(`ERROR: Bad Request`);
      } else if (
        (await bcrypt.compare(req.body.password, response.password)) == true
      ) {
        await users.setToken(token, response.id);
        res.status(200).send({
          userId: response.id,
          token: token,
        });
        return token;
      }
    }
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}

exports.logout = async function(req, res) {
  try {
    const token = req.header("X-Authorization");
    if (token == null || token == undefined) {
      res.status(401).send(`ERROR: Unauthorized`);
    } else {
      const response = await users.logoutAccount(token);
      if (response[0].affectedRows == 0) {
        res.status(401).send(`ERROR: Unauthorized`);
      } else {
        res.status(200).send();
      }
    }
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}

exports.register = async function(req, res) {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = await hash.hash(req.body.password);
    if (
      !email.includes("@") ||
      email == undefined ||
      email.length < 1 ||
      password == undefined ||
      password.length < 1 ||
      first_name == undefined ||
      first_name.length < 1 ||
      last_name == undefined ||
      last_name.length < 1
    ) {
      res.status(400).send("Error: Bad Request");
    } else {
      const post = await users.registerAccount(
        first_name,
        last_name,
        email,
        password,
      );
      if (post == 400) {
        res.status(400).send("Error: Bad Request");
      } else {
        res.status(201).send({ id: post.id });
      }
    }
  } catch (err) {
    res.status(500).send(`ERROR: Internal Server Error`);
  }
}
