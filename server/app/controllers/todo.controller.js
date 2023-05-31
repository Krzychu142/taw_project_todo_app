const Todo = require("../db/models/todo.model");

const getTodosByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const todos = await Todo.find({ user: userId });

    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving todos." });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const todo = new Todo({
      title,
      content,
      user: userId,
    });

    await todo.save();

    res.status(201).json({ message: "Todo created successfully.", todo });
  } catch (error) {
    res.status(500).json({ error: "Error creating todo." });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, content, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res
      .status(200)
      .json({ message: "Todo updated successfully.", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Error updating todo." });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.status(200).json({ message: "Todo deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting todo." });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found." });
    }

    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving todo." });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  deleteTodo,
  getTodosByUser,
  getTodoById,
};
