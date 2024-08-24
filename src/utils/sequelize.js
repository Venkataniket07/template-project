const { Sequelize } = require("sequelize");
const config = require("config");
const logger = require("./logger")(module);

const defaultDialect = "mssql";

const poolConfig = {
  max: config.sequelize_config.max,
  min: config.sequelize_config.min,
  acquire: config.sequelize_config.acquire,
  idle: config.sequelize_config.idle,
};
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || defaultDialect,
    pool: poolConfig,
    logging:
      process.env.DB_LOGGING === "true" ? (msg) => logger.debug(msg) : false,
  },
);

module.exports = sequelize;
