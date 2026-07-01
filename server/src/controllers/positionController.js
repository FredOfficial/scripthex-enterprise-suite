const prisma = require("../config/prisma");

const getPositions = async (req, res) => {
  try {
    const positions = await prisma.position.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json({
      message: "Positions fetched successfully.",
      data: positions,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch positions.",
      error: error.message,
    });
  }
};

module.exports = {
  getPositions,
};
