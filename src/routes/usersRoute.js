const express = require("express");

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userService");

const router = express.Router();

router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
