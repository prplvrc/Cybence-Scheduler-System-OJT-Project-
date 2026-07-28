import { useState } from 'react'
import './Calendar.css'

const START_DAY_OFFSET = 3
const DAYS_IN_JULY = 31

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const daysArray = Array.from({ length: DAYS_IN_JULY }, (_, i) => i + 1)
const emptyOffset = Array.from({ length: START_DAY_OFFSET })

export default function Calendar() {
  const [selectedDay, setSelectedDay] = useState<number>(20)

  return (
    <div className="calendar-view">
      <header className="page-header">
        <div className="title-group">
          <h1>Calendar</h1>
          <p className="subtitle">Manage schedule, events, and upcoming tasks</p>
        </div>

        <div className="header-right">
          <div className="timestamp-badge">
            <span className="date-str">July 20, 2026</span>
            <span className="dot">•</span>
            <span className="time-str">12:00:00 PM</span>
          </div>
          <button className="btn-primary">+ NEW TASK</button>
        </div>
      </header>

      <div className="calendar-grid">
        <div className="calendar-card">
          <div className="month-header">
            <h2>July 2026</h2>
            <div className="month-nav">
              <button className="nav-btn" aria-label="Previous month">&lt;</button>
              <button className="nav-btn today-btn">Today</button>
              <button className="nav-btn" aria-label="Next month">&gt;</button>
            </div>
          </div>

          <div className="weekdays-row">
            {weekdays.map((day) => (
              <div key={day} className="weekday-label">
                {day}
              </div>
            ))}
          </div>

          <div className="days-grid">
            {emptyOffset.map((_, index) => (
              <div key={`offset-${index}`} className="day-cell offset" />
            ))}

            {daysArray.map((day) => {
              const isToday = day === 20
              const isSelected = day === selectedDay

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`day-cell ${isToday ? 'is-today' : ''} ${
                    isSelected ? 'is-selected' : ''
                  }`}
                >
                  <span className="day-number">{day}</span>
                  {[20, 27, 28].includes(day) && (
                    <span className="task-indicator" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <aside className="tasks-panel">
          <div className="panel-header">
            <h3>Tasks for July {selectedDay}</h3>
          </div>

          <div className="tasks-list">
            <span className="group-label">Scheduled</span>

            <div className="task-item-card">
              <div className="task-item-top">
                <span className="task-name">Review Project Proposal</span>
                <span className="badge badge-pending">Pending</span>
              </div>
              <div className="task-item-bottom">
                <span className="assignee">Assigned to: Perpaulo</span>
                <span className="time">2:00 PM</span>
              </div>
            </div>

            <div className="task-item-card">
              <div className="task-item-top">
                <span className="task-name">Team Sync & Standup</span>
                <span className="badge badge-done">Completed</span>
              </div>
              <div className="task-item-bottom">
                <span className="assignee">Assigned to: Dev Team</span>
                <span className="time">4:30 PM</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}