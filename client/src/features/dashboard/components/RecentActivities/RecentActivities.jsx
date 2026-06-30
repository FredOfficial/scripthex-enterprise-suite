import "./RecentActivities.css";

const activities = [
  "New employee added",

  "Inventory updated",

  "Attendance approved",

  "Monthly report generated",
];

const RecentActivities = () => {
  return (
    <div className="activity-card">
      <h5>Recent Activities</h5>

      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivities;
