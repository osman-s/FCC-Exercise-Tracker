var winston = require('winston');
const { createLogger, transports } = require("winston");
const config = require('config')
// require("winston-mongodb");
require("express-async-errors");

module.exports = function() {
  const db = config.get('db')
    const logger = createLogger({
        transports: [
          new transports.Console({ colorize: true, prettyPrint: true }),
          new transports.File({ filename: "logfile.log" }),
          // new transports.MongoDB({ db: db, level: "error" })
        ],
        exceptionHandlers: [
            new transports.Console({ colorize: true, prettyPrint: true }),
          new transports.File({ filename: "exceptions.log" }),
          // new transports.MongoDB({ db: db, level: "error" })
        ]
      });
      // winston.add(new winston.transports.MongoDB({ db: db, level: "error"}));
      
      process.on("uncaughtException", ex => {
        logger.error(ex.message, ex)
        logger.exceptions.handle(new transports.File({ filename: "exceptions.log" }));
        process.exit(1);
      });
      
      process.on("unhandledRejection", ex => {
        throw ex
      });
}