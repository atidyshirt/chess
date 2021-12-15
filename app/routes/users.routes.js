const users = require("../controllers/users.controller");

module.exports = function(app) {
  app.route(app.rootUrl + "/users/:id").get(users.getUser);
}
