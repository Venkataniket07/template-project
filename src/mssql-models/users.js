const { DataTypes } = require("sequelize");
const JOI = require("joi");
const sequelize = require("../utils/sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false, // try true
  }
);

const joiSchema = JOI.object({
  id: JOI.string().uuid(),
  googleId: JOI.string().optional(),
  username: JOI.string().required(),
  email: JOI.string().email().required(),
  password: JOI.string().optional(),
});

const JOIvalidationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

const create = async function (data) {
  const value = await validate(data);
  console.log("Value:", JSON.stringify(value)); // Log the value
  return await User.create(value);
};

const update = async function (id, data) {
  const value = await validate(data);
  const record = await get(id);
  if (!record) throw new Error(`No data found with id: ${id}`);
  return await record.update(value);
};

const get = async function (id) {
  return await User.findByPk(id);
};

const del = async function (id) {
  const record = await get(id);
  if (!record) throw new Error(`No data found with id: ${id}`);
  return await record.destroy();
};

const validate = async (data) => {
  const { error, value } = joiSchema.validate(data, JOIvalidationOptions);

  if (error) {
    throw `Validation error: ${error.details.map((x) => x.message).join(", ")}`;
  } else {
    return value;
  }
};

module.exports = { User, create, update, get, del };
