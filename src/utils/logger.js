const winston = require("winston");
const morgan = require("morgan"); // write morgan configuration.
const config = require("config");
const path = require("path");
const { format, transports } = require("winston");

// Custom format to include the module name and handle errors with stack trace
const loggerFormat = (callingModule) => {
  const moduleLabel = path.basename(callingModule.filename);

  return format.combine(
    format.colorize(),
    format.label({ label: moduleLabel }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, label, level, message, stack }) => {
      const baseLog = `${timestamp} : [${label}] : ${level} : ${message}`;
      return stack ? `${baseLog}\nStack trace:\n${stack}` : baseLog;
    })
  );
};

// Function to create a logger instance for a specific module
const createLogger = (callingModule) => {
  const logger = winston.createLogger({
    level: config.get("logging.level"),
    format: loggerFormat(callingModule),
    transports: [new transports.Console()],
  });

  return logger;
};

module.exports = createLogger;
