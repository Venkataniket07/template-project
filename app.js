require("dotenv").config();
const express = require("express");
const config = require("config");
const logger = require("./src/utils/logger");
const sequelize = require("./src/utils/sequelize");

const app = express();

const connect = async () => {
  try {
    await sequelize.authenticate();
    logger.info(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    // process.exit(1); Exit the process with an error code
  }
};

connect();

app.get("/", (req, res) => {
  res.send("Hello from new application.");
});

const port = process.env.APP_PORT || config.get("app.port");
app.listen(port, (err) => {
  if (err) {
    logger.error("Failed to start the server:", err);
    process.exit(1);
  }
  logger.info(`Server running on port ${port}`);
});

module.exports = app;
