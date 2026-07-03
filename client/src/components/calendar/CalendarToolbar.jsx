const CalendarToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <div className="calendar-toolbar">
      <div>
        <h3>{label}</h3>
        <p>Calendar overview</p>
      </div>

      <div className="calendar-toolbar-actions">
        <button onClick={() => onNavigate("PREV")}>‹</button>
        <button onClick={() => onNavigate("TODAY")}>Today</button>
        <button onClick={() => onNavigate("NEXT")}>›</button>

        <select value={view} onChange={(e) => onView(e.target.value)}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
          <option value="agenda">Agenda</option>
        </select>
      </div>
    </div>
  );
};

export default CalendarToolbar;
