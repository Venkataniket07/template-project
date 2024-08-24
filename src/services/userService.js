const { create, update, get, del } = require("../models/users");
const logger = require("../utils/logger")(module);
const httpCode = require("../utils/httpCodes.json");

async function createUser(req, res) {
  logger.info("/POST call.");
  try {
    const savedData = await create(req.body);
    logger.info(`Created User with ${savedData.id}`);
    res.success(savedData, httpCode.OK);
  } catch (error) {
    logger.error(error);
    res.error(error, httpCode.BAD_REQUEST);
  }
}

async function getUser(req, res) {
  try {
    const id = req.params.id;
    const data = await get(id);

    if (!data) {
      throw new Error(`No data found with id: ${id}`);
    }
    logger.info(`Retrieved data with id: ${id}`);
    res.success(data, httpCode.OK);
  } catch (error) {
    logger.error(error);
    res.error(error, httpCode.BAD_REQUEST);
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const data = await update(id, req.body);
    logger.info(`Updated data with id ${id}`);
    res.success(data, httpCode.OK);
  } catch (error) {
    logger.error(error);
    res.error(error, httpCode.BAD_REQUEST);
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    await del(id);
    logger.info(`Deleted data with id ${id}`);
    res.success({}, httpCode.OK);
  } catch (error) {
    logger.error(error);
    res.error(error, httpCode.BAD_REQUEST);
  }
}

module.exports = { createUser, getUser, updateUser, deleteUser };
