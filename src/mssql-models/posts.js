const { DataTypes } = require("sequelize");
const JOI = require("joi");
const sequelize = require("../utils/sequelize");
const User = require("./User");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Posts",
    tableName: "posts",
    timestamps: false,
  }
);

const joiSchema = JOI.object({
  id: JOI.string().uuid(),
  title: JOI.string().required(),
  content: JOI.string().required(),
  userId: JOI.string().uuid().required(),
});

const JOIvalidationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

const create = async function (data) {
  const value = await validate(data);
  return await Post.create(value);
};

const update = async function (id, data) {
  const value = await validate(data);
  const record = await get(id);
  if (!record) throw new Error("Record not found");
  return await record.update(value);
};

const get = async function (id) {
  return await Post.findByPk(id);
};

const del = async function (id) {
  const record = await get(id);
  if (!record) throw new Error("Record not found");
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

module.exports = { Post, create, update, get, del };
