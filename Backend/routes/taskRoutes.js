const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Routes for tasks
router
  .route("/")
  .get(protect, getTasks) // Users get their tasks, Admins get all tasks
  .post(protect, createTask); // Both users and admins can create tasks

router
  .route("/:id")
  .get(protect, getTaskById) // Any authenticated user can view their tasks
  .put(protect, updateTask) // Users update their tasks; Admin can update any
  .delete(protect, deleteTask); // Users delete their tasks; Admin can delete any

module.exports = router;
