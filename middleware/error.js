const logger = require('winston');

const errorMiddleware = (req, res, next) => {
  res.error = err => {
    logger.error(err);
    const code = (err.statusCode || 500);
    res.status(code).json(err);
  };
  next();
};

module.exports = errorMiddleware;
