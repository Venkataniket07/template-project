const winston = require("winston");
const config = require("config");

const logger = winston.createLogger({
  level: config.get("logging.level"),
  format: winston.format.json(),
  transports: new winston.transports.Console(),
});

module.exports = logger;
