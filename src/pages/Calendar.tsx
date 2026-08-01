import { useState } from "react";
import { Plus, Clock, Calendar as Filter } from "lucide-react";
import "./Calendar.css";
import NewTaskModal from "./New_Task";
import type { NewTaskFormData } from "./New_Task";
import type { Task } from "./Task_Board";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const normalizeName = (value: string) => value.trim().toLowerCase();

type CalendarProps = {
  tasks?: Task[];
  onTasksChange?: (tasks: Task[]) => void;
  currentUserName?: string;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function Calendar({
  tasks = [],
  onTasksChange = () => undefined,
  currentUserName = "Perpaulo",
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const upcomingSchedule = [
    { day: "Today", time: "09:00 AM - Team Sync" },
    { day: "Tomorrow", time: "02:00 PM - Client Review" },
    { day: "Friday", time: "11:30 AM - Training Session" },
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyOffset = Array.from({ length: firstDayOfMonth });
  const today = new Date();

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(1);
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDay(now.getDate());
  };

  const ownerTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const dueDate = new Date(task.dueDate);
    if (Number.isNaN(dueDate.getTime())) return false;

    const isUserTask =
      normalizeName(task.assignedTo) === normalizeName(currentUserName) &&
      dueDate.getMonth() === currentMonth &&
      dueDate.getFullYear() === currentYear;

    if (activeFilter === "All") return isUserTask;
    return isUserTask && task.status === activeFilter;
  });

  const selectedDayTasks = ownerTasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate.getDate() === selectedDay;
  });

  // Calculate Monthly Stats
  const totalMonthTasks = ownerTasks.length;
  const completedMonthTasks = ownerTasks.filter((t) => t.status === "Completed").length;
  const completionPercentage = totalMonthTasks > 0 ? Math.round((completedMonthTasks / totalMonthTasks) * 100) : 0;

  const handleCreateTask = (taskData: NewTaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      task: taskData.title,
      creator: "You",
      assignedTo:
        taskData.assignTo === "Open for anyone to take"
          ? "Open"
          : taskData.assignTo,
      createdOn: new Date().toISOString().split("T")[0],
      status: taskData.status || "Pending",
      dueDate: taskData.dueDate || new Date().toISOString().split("T")[0],
      priority: taskData.priority || "Medium",
    };

    onTasksChange([...tasks, newTask]);
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

        <button
          className="btn-primary flex items-center gap-2 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={16} />
          Add New Event
        </button>
      </header>

      {/* 2-COLUMN MAIN LAYOUT */}
      <div className="calendar-main-layout">
        {/* LEFT COLUMN: EXPANDED FULL-HEIGHT CALENDAR */}
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

              <button className="nav-btn today-btn" onClick={handleToday}>
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

          {/* WEEKDAYS HEADER */}
          <div className="weekdays-row">
            {weekdays.map((day) => (
              <div key={day} className="weekday-label">
                {day}
              </div>
            ))}
          </div>

          {/* EXPANDED DAYS GRID */}
          <div className="days-grid">
            {emptyOffset.map((_, index) => (
              <div key={`offset-${index}`} className="day-cell offset" />
            ))}

            {daysArray.map((day) => {
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();

              const isSelected = day === selectedDay;

              const dayTasks = ownerTasks.filter(
                (t) => new Date(t.dueDate).getDate() === day
              );

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`day-cell ${isToday ? "is-today" : ""} ${
                    isSelected ? "is-selected" : ""
                  }`}
                >
                  <span className="day-number">{day}</span>

                  <div className="cell-task-list">
                    {dayTasks.slice(0, 2).map((t) => (
                      <span
                        key={t.id}
                        className={`mini-task-pill ${
                          t.status === "Completed" ? "pill-done" : "pill-pending"
                        }`}
                      >
                        {t.task}
                      </span>
                    ))}
                    {dayTasks.length > 2 && (
                      <span className="more-pill">+{dayTasks.length - 2} more</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* BOTTOM FILTER & LEGEND BAR */}
          <div className="calendar-legend-bar">
            <div className="legend-group">
              <span className="legend-title">
                <Filter size={13} /> Filter View:
              </span>
              {["All", "Pending", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveFilter(status)}
                  className={`filter-chip ${
                    activeFilter === status ? "chip-active" : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="legend-status-dots">
              <span className="status-dot-item">
                <span className="dot dot-pending" /> Pending
              </span>
              <span className="status-dot-item">
                <span className="dot dot-done" /> Completed
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STACKED SIDEBAR */}
        <aside className="sidebar-container">
          {/* TASKS FOR SELECTED DAY */}
          <div className="side-panel">
            <div className="panel-header">
              <h3>
                Tasks for {monthName} {selectedDay}
              </h3>
              <p className="panel-subtitle">Scheduled for this date</p>
            </div>

            <div className="tasks-list">
              {selectedDayTasks.length > 0 ? (
                selectedDayTasks.map((task) => (
                  <div className="task-item-card" key={task.id}>
                    <div className="task-item-top">
                      <span className="task-name">{task.task}</span>

                      <span
                        className={`badge ${
                          task.status === "Completed"
                            ? "badge-done"
                            : "badge-pending"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <div className="task-item-bottom">
                      <span className="assignee">
                        Assigned to: {task.assignedTo}
                      </span>
                      <span className="time">{formatDate(task.dueDate)}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="task-item-card empty-card">
                  <span className="task-name empty-text">
                    No tasks scheduled for this day
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* UPCOMING SCHEDULE SECTION */}
          <div className="side-panel">
            <div className="panel-header">
              <h3>Upcoming Schedule</h3>
              <p className="panel-subtitle">Your next planned activities</p>
            </div>

            <div className="upcoming-list">
              {upcomingSchedule.map((item) => (
                <div key={item.day} className="upcoming-item-card">
                  <div>
                    <p className="upcoming-day">{item.day}</p>
                    <p className="upcoming-time">{item.time}</p>
                  </div>
                  <Clock className="upcoming-icon" />
                </div>
              ))}
            </div>
          </div>

          {/* MONTHLY SUMMARY CARD (FILLED BOTTOM DEAD SPACE) */}
          <div className="side-panel summary-panel">
            <div className="panel-header">
              <h3>Monthly Workload</h3>
              <p className="panel-subtitle">{monthName} progress</p>
            </div>

            <div className="summary-body">
              <div className="summary-stat">
                <div>
                  <p className="stat-label">Tasks Completed</p>
                  <p className="stat-value">
                    {completedMonthTasks} / {totalMonthTasks}
                  </p>
                </div>
                <div className="stat-badge">{completionPercentage}%</div>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* NEW TASK MODAL */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
}