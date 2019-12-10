const { createLogger, transports } = require('winston');
require("winston-mongodb");

module.exports = function(err, req, res, next) {
    // Log the exception
    const logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({ filename: 'logfile.log' }),
        new transports.MongoDB( { db: 'mongodb://localhost/vidly', level: 'error'})
      ],
      exceptionHandlers: [
        new transports.Console(),
        new transports.File({ filename: 'exceptions.log' }),
        new transports.MongoDB( { db: 'mongodb://localhost/vidly', level: 'error'})
      ]
    });

      logger.error(err.message, err)

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send("Something failed.");
  }