const config = require("config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  port: config.get("db.port"),
  dialect: config.get("db.dialect"),
  host: config.get("db.host"),
  username: config.get("db.user"),
  dialect: config.get("db.password"),
  database: config.get("db.database"),
});

module.exports = sequelize;
