const authMiddleware = require("../middlewares/authMiddleware");

const express = require("express");

console.log("✅ employeeRoutes loaded");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/", authMiddleware, createEmployee);
router.put("/:id", authMiddleware, updateEmployee);
router.delete("/:id", authMiddleware, deleteEmployee);

console.log("DELETE route registered");

router.delete("/:id", deleteEmployee);

module.exports = router;
