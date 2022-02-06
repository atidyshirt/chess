require('dotenv').config();
const db = require('./config/db');
const express = require('./config/express');

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: "Chess API",
      verison: '1.0.0',
      description: "Chess API for monitoring chess information from chess.com",
      contact: {
        name: 'Jordan Pyott',
        email: 'jordanpyott@gmail.com'
      },
      servers: [
        "http://localhost:4040"
      ]
    },
  },
  apis: ["./app/routes/*.js"]
}


const app = express();
const port = process.env.PORT || 4040;

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Test connection to MySQL on start-up
async function testDbConnection() {
  try {
    await db.createPool();
    await db.getPool().getConnection();
  } catch (err) {
    console.error(`Unable to connect to MySQL: ${err.message}`);
    process.exit(1);
  }
}

testDbConnection()
  .then(function() {
    app.listen(port, function() {
      console.log(`Listening on port: ${port}`);
    });
  });
