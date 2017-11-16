require('dotenv').config()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('winston');

const apiRoutes = require('./api/_index');
const errorMiddleware = require('./middleware/error');

logger.cli();
logger.level = 'debug';

const app = express();
const httpServer = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorMiddleware);
app.use('/api/v1', apiRoutes);

console.log('Starting server...');

global.__basepath = __dirname;
httpServer.listen(process.env.SERVER_PORT, () => {
  let addr = httpServer.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  logger.info('Listening on ' + bind);
});

module.exports = app;
