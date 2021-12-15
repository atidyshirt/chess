const express = require('express');
const { allowCrossOriginRequestsMiddleware } = require('../app/middleware/cors.middleware');
const rawBodyParser = require('../app/middleware/rawbodyparser');
const bodyParser = require('body-parser');
const multer = require('multer');

// Determine correct body parser to use
const jsonParser = bodyParser.json();
const rawParser = rawBodyParser.rawParser;
const upload = multer({ limits: { fileSize: 20e6 } });
const multipartParser = upload.single('photo');  // 20 MB

function dynamicBodyParser(req, res, next) {
  const contentType = req.header('Content-Type') || '';
  if (contentType === 'image/jpeg' || contentType === 'image/png' || contentType === 'image/gif' || contentType === 'text/plain') {
    rawParser(req, res, next);
  } else if (contentType.startsWith('multipart/form-data')) {
    multipartParser(req, res, next);
  } else {
    jsonParser(req, res, next);
  }
}

module.exports = function() {
  // INITIALISE EXPRESS //
  const app = express();
  app.use(dynamicBodyParser);
  app.use(allowCrossOriginRequestsMiddleware);
  app.use((req, res, next) => {
    console.log(`##### ${req.method} ${req.path} #####`);
    next();
  });
  app.rootUrl = '/api/v1';

  // ROUTES //
  // require('../app/routes/backdoor.routes')(app);
  // require('../app/routes/users.routes')(app);
  // require('../app/routes/users.images.routes')(app);
  // require('../app/routes/events.routes')(app);
  // require('../app/routes/events.images.routes')(app);
  // require('../app/routes/attendees.routes')(app);

  return app;
};
