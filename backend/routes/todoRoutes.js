const express = require("express");
const { body, validationResult } = require("express-validator");
const Todo = require("../models/Todo");

const router = express.Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// GET all todos with filtering
router.get("/", async (req, res) => {
  try {
    const { filter, category, priority, search, sort } = req.query;
    let query = {};

    // Apply filters
    if (filter === "active") {
      query.completed = false;
    } else if (filter === "completed") {
      query.completed = true;
    }

    if (category) {
      query.category = category;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    let todos = Todo.find(query);

    // Apply sorting
    if (sort === "date-desc") {
      todos = todos.sort({ createdAt: -1 });
    } else if (sort === "date-asc") {
      todos = todos.sort({ createdAt: 1 });
    } else if (sort === "priority") {
      todos = todos.sort({ priority: 1 });
    } else if (sort === "duedate") {
      todos = todos.sort({ dueDate: 1 });
    }

    const result = await todos.exec();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single todo by ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new todo
router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("title")
      .isLength({ max: 100 })
      .withMessage("Title cannot exceed 100 characters"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Invalid priority"),
    body("category")
      .optional()
      .isIn(["work", "personal", "shopping", "health", "other"])
      .withMessage("Invalid category"),
    body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const newTodo = new Todo({
        title: req.body.title,
        description: req.body.description || "",
        priority: req.body.priority || "medium",
        category: req.body.category || "personal",
        dueDate: req.body.dueDate,
        tags: req.body.tags || [],
      });

      const savedTodo = await newTodo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

// UPDATE todo
router.put(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("priority")
      .optional()
      .isIn(["low", "medium", "high"])
      .withMessage("Invalid priority"),
    body("category")
      .optional()
      .isIn(["work", "personal", "shopping", "health", "other"])
      .withMessage("Invalid category"),
    body("dueDate").optional().isISO8601().withMessage("Invalid date format"),
  ],
  handleValidationErrors,
  async (req, res) => {
    try {
      const updateData = {};

      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.description !== undefined)
        updateData.description = req.body.description;
      if (req.body.completed !== undefined)
        updateData.completed = req.body.completed;
      if (req.body.priority !== undefined)
        updateData.priority = req.body.priority;
      if (req.body.category !== undefined)
        updateData.category = req.body.category;
      if (req.body.dueDate !== undefined) updateData.dueDate = req.body.dueDate;
      if (req.body.tags !== undefined) updateData.tags = req.body.tags;

      updateData.updatedAt = new Date();

      const updatedTodo = await Todo.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true },
      );

      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json(updatedTodo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
);

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully", todo: deletedTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE all completed todos
router.delete("/completed/delete-all", async (req, res) => {
  try {
    const result = await Todo.deleteMany({ completed: true });
    res.json({ message: `${result.deletedCount} completed todos deleted` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get statistics
router.get("/stats/summary", async (req, res) => {
  try {
    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });
    const active = await Todo.countDocuments({ completed: false });
    const overdue = await Todo.countDocuments({
      completed: false,
      dueDate: { $lt: new Date() },
    });

    res.json({
      total,
      completed,
      active,
      overdue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
