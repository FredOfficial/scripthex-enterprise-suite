import "./RecentActivities.css";

import { FiActivity, FiEdit, FiPlusCircle, FiTrash2 } from "react-icons/fi";

const getIcon = (action) => {
  switch (action) {
    case "CREATE":
      return <FiPlusCircle className="activity-icon create" />;

    case "UPDATE":
      return <FiEdit className="activity-icon update" />;

    case "DELETE":
      return <FiTrash2 className="activity-icon delete" />;

    default:
      return <FiActivity className="activity-icon" />;
  }
};

const formatTime = (date) => {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000);

  if (diff < 60) return "Just now";

  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;

  return `${Math.floor(diff / 86400)} day(s) ago`;
};

const RecentActivities = ({ activities = [] }) => {
  return (
    <div className="activity-card">
      <h5>Recent Activities</h5>

      {activities.length === 0 ? (
        <div className="activity-empty">No recent activities.</div>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>
              {getIcon(activity.action)}

              <div className="activity-content">
                <span className="activity-description">
                  {activity.actor} {activity.description}
                </span>

                <small>{formatTime(activity.createdAt)}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentActivities;
