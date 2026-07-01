const express = require("express");

console.log("✅ employeeRoutes loaded");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);

console.log("DELETE route registered");

router.delete("/:id", deleteEmployee);

module.exports = router;
