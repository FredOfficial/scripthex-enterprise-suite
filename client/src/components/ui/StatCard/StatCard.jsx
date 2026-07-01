import "./StatCard.css";

const StatCard = ({ title, value, icon, color = "blue" }) => {
  return (
    <div className={`sh-stat-card sh-stat-${color}`}>
      <div className="sh-stat-icon">{icon}</div>

      <div className="sh-stat-content">
        <span>{title}</span>

        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;
