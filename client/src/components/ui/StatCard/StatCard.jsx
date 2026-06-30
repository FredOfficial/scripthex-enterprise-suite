import "./StatCard.css";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={`bi ${icon}`}></i>
      </div>

      <div>
        <p>{title}</p>
        <h3>{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
