const express = require("express");
const router = express.Router();
const {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosByUser,
  getTodoById,
} = require("../controllers/todo.controller");
const { verifyToken } = require("../middleware/verifyToken");

router.post("/todos", verifyToken, createTodo);
router.put("/todos/:id", verifyToken, updateTodo);
router.delete("/todos/:id", verifyToken, deleteTodo);
router.get("/todos", verifyToken, getTodosByUser);
router.get("/todos/:id", verifyToken, getTodoById);

module.exports = router;
