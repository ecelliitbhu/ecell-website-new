import React, { useState } from "react";
// import "react-modern-calendar-datepicker/lib/DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
import "@progress/kendo-theme-default/dist/all.css";
import { Calendar } from "@progress/kendo-react-dateinputs";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

const DatePicker = () => {
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div className="calender-container">
        <Calendar
          className="calender"
          value={date}
          onChange={(e) => setDate(e.value)}
          calendarClassName="responsive-calendar"
        />
        <div className="calender-events">
          <h2>Events</h2>
          <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
            {date.toDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
