require("dotenv").config();
const express = require("express");
const config = require("config");
const logger = require("./src/utils/logger")(module);
const sequelize = require("./src/utils/sequelize");
const router = require("./src/routes/index");
const responseHandler = require("./src/utils/responseHandler");

const app = express();

app.use(express.json());
app.use(responseHandler);

const connect = async () => {
  try {
    await sequelize.authenticate();
    logger.info(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    logger.info("Exiting the code.");
    process.exit(1); // Exit the process with an error code
  }
};

connect();

app.get("/", (req, res) => {
  logger.info("testing /GET call.");
  res.send("Hello from new application.");
});

app.use("/User", router.UserRoute);

const port = process.env.APP_PORT || config.get("app.port");
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

module.exports = app;
