const express = require("express");

const { authRequired } = require("../middlewares/validateToken");
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");
const { validateSchema } = require("../middlewares/validator.middleware");
const { createTaskSchema } = require("../schemas/task.schemas");

const router = express.Router();

router.get("/tasks", authRequired, getTasks);
router.post(
  "/tasks",
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);
router.put("/tasks/:id", authRequired, updateTask);
router.delete("/tasks/:id", authRequired, deleteTask);
router.get("/tasks/:id", authRequired, getTask);

module.exports = router;
