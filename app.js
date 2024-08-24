// Loading the .env file
require("dotenv").config();

// Loading the express module
const express = require("express");
// const config = require("config");
// use Helmet to secure your Express apps by setting various HTTP headers
// swagger documentation
// morgan logger
// cors
// httpCodes
const logger = require("./src/utils/logger")(module);
const sequelize = require("./src/utils/sequelize");
const router = require("./src/routes/index");
const responseHandler = require("./src/utils/responseHandler");

const app = express();
app.set("port", process.env.APP_PORT);

app.use(express.json());
app.use(responseHandler);

const connect = async () => {
  try {
    await sequelize.authenticate();
    logger.info(
      "Connection to the database has been established successfully.",
    );
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    logger.info("Exiting the code.");
    // process.exit(1); // Exit the process with an error code
  }
};

connect();

app.get("/", (req, res) => {
  logger.info("testing /GET call.");
  res.send("Hello from new application.");
});

app.use("/User", router.UserRoute);

const server = app.listen(app.get("port"), () => {
  logger.info(`API server listening on port: ${server.address().port}`);
});

module.exports = app;
