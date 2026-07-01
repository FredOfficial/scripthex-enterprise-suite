const prisma = require("../config/prisma");

const createActivity = async ({
  action,
  module,
  description,
  actor = "System Administrator",
}) => {
  return prisma.activityLog.create({
    data: {
      action,
      module,
      description,
      actor,
    },
  });
};

const getRecentActivities = async () => {
  return prisma.activityLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });
};

module.exports = {
  createActivity,
  getRecentActivities,
};
