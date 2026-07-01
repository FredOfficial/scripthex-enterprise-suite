const prisma = require("../config/prisma");

const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json({
      message: "Departments fetched successfully.",
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch departments.",
      error: error.message,
    });
  }
};

module.exports = {
  getDepartments,
};
