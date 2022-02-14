const users = require("../controllers/users.controller");

module.exports = function(app) {
  /**
  *  @swagger
  *  components:
  *    schemas:
  *      User:
  *        type: object
  *        properties:
  *          id:
  *            type: integer
  *          first_name:
  *            type: string
  *          last_name:
  *            type: string
  *          email:
  *            type: string
  *          auth_token:
  *            type: string
  *          password:
  *            type: string
  *          chess_username:
  *            type: string
  */

  /**
  *  @swagger
  *  /users/{id}:
  *    get:
  *      summary: Get a user by ID
  *      responses:
  *        '200':
  *          description: Return a single user by ID
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                properties:
  *                  id:
  *                    type: integer
  *                  name:
  *                    type: string
  */
  app.route(app.rootUrl + "/users/:id").get(users.getUser);

  app.route(app.rootUrl + "/users/userinfo").post(users.getUserInfo);

  app.route(app.rootUrl + "/users/userstats").post(users.getUserStats);

  /**
  *  @swagger
  *  /users/login:
  *    post:
  *      summary: Login request
  *      parameters:
  *        - in: body
  *          properties:
  *            email:
  *              type: string
  *            password:
  *              type: string
  *      responses:
  *        '200':
  *          description: Return a single user by ID
  *          content:
  *            application/json:
  *              schema:
  *                type: object
  *                properties:
  *                  id:
  *                    type: integer
  *                  token:
  *                    type: string
  */
  app.route(app.rootUrl + "/users/login").post(users.login);

  /**
  *  @swagger
  *  /users/logout:
  *    post:
  *      summary: Logout request
  *      responses:
  *        '200':
  *          description: Return nothing if successful, user token will be set to null
  *        '401':
  *          description: Throw error, unauthorized
  */
  app.route(app.rootUrl + "/users/logout").post(users.logout);


  /**
  *  @swagger
  *  /users/register:
  *    post:
  *      summary: Register request
  *      parameters:
  *        - in: body
  *          properties:
  *            first_name:
  *              type: string
  *            last_name:
  *              type: string
  *            email:
  *              type: string
  *            password:
  *              type: string
  *      responses:
  *        '201':
  *          description: Return new users id if successful
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                id:
  *                  type: integer
  */
  app.route(app.rootUrl + "/users/register").post(users.register);


  /**
  *  @swagger
  *  /users/link:
  *    post:
  *      summary: link a chess.com username
  *      parameters:
  *        - in: body
  *          properties:
  *            chess_username:
  *              type: string
  *      responses:
  *        '200':
  *          description: Store username if user is logged in and body is correct
  *        '401':
  *          description: unauthorized if user is not logged in
  *        '400':
  *          description: error, Account cannot be linked
  *        '500':
  *          description: error, internal server error
  */
  app.route(app.rootUrl + "/users/link").post(users.linkAccount);
}
