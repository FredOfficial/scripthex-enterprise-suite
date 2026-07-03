import { format, getDay, parse, startOfWeek } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./EnterpriseCalendar.css";

import CalendarLegend from "./CalendarLegend";
import CalendarToolbar from "./CalendarToolbar";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const EnterpriseCalendar = ({ events = [], legends = [], onSelectEvent }) => {
  return (
    <div className="enterprise-calendar-card">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        style={{ height: 620 }}
        components={{
          toolbar: CalendarToolbar,
        }}
        eventPropGetter={(event) => ({
          className: `calendar-event calendar-event-${event.type || "default"}`,
        })}
        onSelectEvent={onSelectEvent}
      />

      <CalendarLegend legends={legends} />
    </div>
  );
};

export default EnterpriseCalendar;
