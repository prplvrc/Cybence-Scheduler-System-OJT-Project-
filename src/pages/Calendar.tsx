import { useState } from "react";
import "./Calendar.css";
import NewTaskModal from "./New_Task";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarTask {
  id: number;
  title: string;
  owner: string;
  status: string;
  time: string;
  day: number;
  month: number;
  year: number;
}

const currentAccountOwner = "Perpaulo Varca";

const initialCalendarTasks: CalendarTask[] = [
  {
    id: 1,
    title: "Review Project Proposal",
    owner: currentAccountOwner,
    status: "Pending",
    time: "2:00 PM",
    day: 5,
    month: 6,
    year: 2026,
  },
  {
    id: 2,
    title: "Team Sync & Standup",
    owner: currentAccountOwner,
    status: "Completed",
    time: "4:30 PM",
    day: 12,
    month: 6,
    year: 2026,
  },
  {
    id: 3,
    title: "Client Follow-up",
    owner: "Sarah Chen",
    status: "Pending",
    time: "1:00 PM",
    day: 12,
    month: 6,
    year: 2026,
  },
];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(
    new Date().getDate()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarTasks, setCalendarTasks] = useState<CalendarTask[]>(initialCalendarTasks);

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

  const ownerTasks = calendarTasks.filter(
    (task) =>
      task.owner === currentAccountOwner &&
      task.month === currentMonth &&
      task.year === currentYear
  );

  const selectedDayTasks = ownerTasks.filter((task) => task.day === selectedDay);
  const taskDaysWithOwnerTasks = new Set(ownerTasks.map((task) => task.day));

  const handleCreateTask = (taskData: any) => {
    const newTask: CalendarTask = {
      id: Date.now(),
      title: taskData.title,
      owner: currentAccountOwner,
      status: taskData.status || "Pending",
      time: taskData.dueDate ? "Scheduled" : "TBD",
      day: selectedDay,
      month: currentMonth,
      year: currentYear,
    };

    setCalendarTasks((prev) => [newTask, ...prev]);
    setIsModalOpen(false);
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

          <button 
            className="btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
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

                  {taskDaysWithOwnerTasks.has(day) && (
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

            {selectedDayTasks.length > 0 ? (
              selectedDayTasks.map((task) => (
                <div className="task-item-card" key={task.id}>
                  <div className="task-item-top">
                    <span className="task-name">{task.title}</span>

                    <span className={`badge ${task.status === "Completed" ? "badge-done" : "badge-pending"}`}>
                      {task.status}
                    </span>
                  </div>

                  <div className="task-item-bottom">
                    <span className="assignee">Assigned to: {task.owner}</span>

                    <span className="time">{task.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="task-item-card">
                <div className="task-item-top">
                  <span className="task-name">No tasks for you on this day</span>
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* New Task Modal Popup */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}