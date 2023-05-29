const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const todoRoutes = require("./todo.routes");

router.use("/user", userRoutes);
router.use("/todos", todoRoutes);

module.exports = router;
