const dashboardService = require("../services/dashboardService");

const getDashboardStats = async (req, res) => {
  try {
    const stats = await dashboardService.getDashboardStats();

    res.json({
      message: "Dashboard loaded successfully.",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard.",
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
