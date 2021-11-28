import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

const DatePicker = () => {
  const date = new Date();
  const defaultValue = {
    year: date.getFullYear(),
    month: date.getMonth()+1,
    day: date.getDate(),
  };
  const [selectedDay, setSelectedDay] = useState(defaultValue);

  return (
    <>
    <div className="calender-container">
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        colorPrimary="#9c88ff" // added this
        calendarClassName="custom-calendar responsive-calendar" // and this
        calendarTodayClassName="custom-today-day" // also this
        shouldHighlightWeekends
      />
      <div className="calender-events">
        <h2>Events</h2>
        <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          {selectedDay.day + "/" + selectedDay.month + "/" + selectedDay.year}
        </p>
      </div>
      </div>
    </>
  );
};

export default DatePicker;
