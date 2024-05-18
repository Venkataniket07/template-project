const config = require("config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.get("db.database"),
  config.get("db.username"),
  config.get("db.password"),
  {
    host: config.get("db.host"),
    port: config.get("db.port"),
    dialect: config.get("db.dialect"),
  }
);

module.exports = sequelize;
