const express = require("express");
const router = express.Router();
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosByUser,
} = require("../controllers/todo.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/todos", verifyToken, createTodo);
router.put("/todos/:id", verifyToken, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);
router.get("/todos", verifyToken, getTodosByUser);

module.exports = router;
