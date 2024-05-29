const { DataTypes } = require("sequelize");
const JOI = require("joi");
const sequelize = require("../utils/sequelize");
const User = require("./users");
const Post = require("./posts");

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Post,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Comments",
    tableName: "comments",
    timestamps: false,
  }
);

const joiSchema = JOI.object({
  id: JOI.string().uuid(),
  content: JOI.string().required(),
  userId: JOI.string().uuid().required(),
  postId: JOI.string().uuid().required(),
});

const JOIvalidationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true, // remove unknown keys from the validated data
};

const create = async function (data) {
  const value = await validate(data);
  return await Comment.create(value);
};

const update = async function (id, data) {
  const value = await validate(data);
  const record = await get(id);
  if (!record) throw new Error("Record not found");
  return await record.update(value);
};

const get = async function (id) {
  return await Comment.findByPk(id);
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

module.exports = { Comment, create, update, get, del };
