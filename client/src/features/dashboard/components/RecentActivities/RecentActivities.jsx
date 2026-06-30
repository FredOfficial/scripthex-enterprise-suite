import "./RecentActivities.css";

const activities = [
  "Juan Dela Cruz added",

  "Inventory updated",

  "Attendance Approved Yesterday",

  "Payroll Generated",
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
