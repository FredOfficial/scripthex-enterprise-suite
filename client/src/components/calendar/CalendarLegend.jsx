const CalendarLegend = ({ legends = [] }) => {
  if (legends.length === 0) return null;

  return (
    <div className="calendar-legend">
      {legends.map((legend) => (
        <div className="calendar-legend-item" key={legend.type}>
          <span className={`legend-dot legend-${legend.type}`} />
          {legend.label}
        </div>
      ))}
    </div>
  );
};

export default CalendarLegend;
