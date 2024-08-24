const winston = require("winston");
const path = require("path");

const { format, transports } = winston;
const { combine, timestamp, label, printf, splat, simple, colorize } = format;

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const DEFAULT_LOG_LEVELS = {
  models: process.env.MODELS_LOG_LEVEL || LOG_LEVEL,
  routes: process.env.ROUTES_LOG_LEVEL || LOG_LEVEL,
  utils: process.env.UTILS_LOG_LEVEL || LOG_LEVEL,
  services: process.env.SERVICES_LOG_LEVEL || LOG_LEVEL,
  middleware: process.env.MIDDLEWARE_LOG_LEVEL || LOG_LEVEL,
};

const logFormat = printf((info) => {
  const pid = info.pid || process.pid;
  return `${info.timestamp} : [${info.label}] : ${pid} : ${info.level} : ${info.message}`;
});

const getLabel = (callingModule) => {
  const parts = callingModule.filename.split(path.sep);
  return `${parts[parts.length - 2]}/${parts.pop()}`;
};

const getLogLevel = (callingModule) => {
  const parts = callingModule.filename.split(path.sep);
  const componentName = parts[parts.length - 2].toLowerCase();
  return DEFAULT_LOG_LEVELS[componentName] || LOG_LEVEL;
};

const logger = (callingModule) => {
  const moduleLabel = getLabel(callingModule);
  const moduleLogLevel = getLogLevel(callingModule);

  const consoleTransport = new transports.Console({
    format: combine(
      colorize(),
      splat(),
      simple(),
      label({ label: moduleLabel }),
      timestamp(),
      logFormat,
    ),
    level: moduleLogLevel,
  });

  const loggerTransports = [consoleTransport];

  return winston.createLogger({
    level: moduleLogLevel,
    transports: loggerTransports,
  });
};

module.exports = logger;
