import { useState } from "react";
import "./Calendar.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDate()
  );

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysArray = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  const emptyOffset = Array.from({
    length: firstDayOfMonth,
  });

  const today = new Date();

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth - 1, 1)
    );
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentYear, currentMonth + 1, 1)
    );
    setSelectedDay(1);
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  };

  return (
    <div className="calendar-view">
      {/* HEADER */}
      <header className="page-header">
        <div className="title-group">
          <h1>Calendar</h1>
          <p className="subtitle">
            Manage schedule, events, and upcoming tasks
          </p>
        </div>

        <div className="header-right">
          <div className="timestamp-badge">
            <span className="date-str">
              {today.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>

            <span className="dot">•</span>

            <span className="time-str">
              {today.toLocaleTimeString()}
            </span>
          </div>

          <button className="btn-primary">
            + New Task
          </button>
        </div>
      </header>

      {/* CALENDAR GRID */}
      <div className="calendar-grid">
        <div className="calendar-card">
          <div className="month-header">
            <h2>
              {monthName} {currentYear}
            </h2>

            <div className="month-nav">
              <button
                className="nav-btn"
                onClick={handlePreviousMonth}
                aria-label="Previous month"
              >
                &lt;
              </button>

              <button
                className="nav-btn today-btn"
                onClick={handleToday}
              >
                Today
              </button>

              <button
                className="nav-btn"
                onClick={handleNextMonth}
                aria-label="Next month"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* WEEKDAY LABELS */}
          <div className="weekdays-row">
            {weekdays.map((day) => (
              <div
                key={day}
                className="weekday-label"
              >
                {day}
              </div>
            ))}
          </div>

          {/* DAYS GRID */}
          <div className="days-grid">
            {emptyOffset.map((_, index) => (
              <div
                key={`offset-${index}`}
                className="day-cell offset"
              />
            ))}

            {daysArray.map((day) => {
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              const isSelected =
                day === selectedDay;

              return (
                <button
                  key={day}
                  onClick={() =>
                    setSelectedDay(day)
                  }
                  className={`day-cell ${
                    isToday ? "is-today" : ""
                  } ${
                    isSelected
                      ? "is-selected"
                      : ""
                  }`}
                >
                  <span className="day-number">
                    {day}
                  </span>

                  {[5, 12, 20, 27].includes(day) && (
                    <span className="task-indicator" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* TASKS PANEL */}
        <aside className="tasks-panel">
          <div className="panel-header">
            <h3>
              Tasks for {monthName}{" "}
              {selectedDay}
            </h3>
          </div>

          <div className="tasks-list">
            <span className="group-label">
              Scheduled
            </span>

            <div className="task-item-card">
              <div className="task-item-top">
                <span className="task-name">
                  Review Project Proposal
                </span>

                <span className="badge badge-pending">
                  Pending
                </span>
              </div>

              <div className="task-item-bottom">
                <span className="assignee">
                  Assigned to: Perpaulo
                </span>

                <span className="time">
                  2:00 PM
                </span>
              </div>
            </div>

            <div className="task-item-card">
              <div className="task-item-top">
                <span className="task-name">
                  Team Sync & Standup
                </span>

                <span className="badge badge-done">
                  Completed
                </span>
              </div>

              <div className="task-item-bottom">
                <span className="assignee">
                  Assigned to: Dev Team
                </span>

                <span className="time">
                  4:30 PM
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}