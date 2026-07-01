const employeeService = require("../services/employeeService");

const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();

    res.json({
      message: "Employees fetched successfully.",
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees.",
      error: error.message,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = await employeeService.createEmployee(req.body);

    res.status(201).json({
      message: "Employee created successfully.",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create employee.",
      error: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body,
    );

    res.json({
      message: "Employee updated successfully.",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee.",
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await employeeService.deleteEmployee(req.params.id);

    res.json({
      message: "Employee deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee.",
      error: error.message,
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
