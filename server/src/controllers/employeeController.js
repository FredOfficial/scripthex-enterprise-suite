const employeeService = require("../services/employeeService");
const activityService = require("../services/activityService");

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

    await activityService.createActivity({
      action: "CREATE",
      module: "EMPLOYEE",
      actor: req.user && req.user.name ? req.user.name : "System Administrator",
      description: `created employee ${employee.firstName} ${employee.lastName}`,
    });

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

    await activityService.createActivity({
      action: "UPDATE",
      module: "EMPLOYEE",
      actor: req.user && req.user.name ? req.user.name : "System Administrator",
      description: `updated employee ${employee.firstName} ${employee.lastName}`,
    });

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
    const employee = await employeeService.deleteEmployee(req.params.id);

    await activityService.createActivity({
      action: "DELETE",
      module: "EMPLOYEE",
      actor: req.user && req.user.name ? req.user.name : "System Administrator",
      description: `deleted employee ${employee.firstName} ${employee.lastName}`,
    });

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
