import { useState } from "react";
import {
  Bell,
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";
import "./Task_Board.css";

interface Task {
  id: number;
  task: string;
  creator: string;
  createdOn: string;
  status: string;
  dueDate: string;
}

interface TaskGroup {
  title: string;
  dotClass: string;
  badgeClass: string;
  tasks: Task[];
}

const taskGroups: TaskGroup[] = [
  {
    title: "TO BE ASSIGNED",
    dotClass: "dot-pending",
    badgeClass: "badge-pending",
    tasks: [
      {
        id: 1,
        task: "TASK 1",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Pending",
        dueDate: "2026-07-25",
      },
      {
        id: 2,
        task: "TASK 2",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Pending",
        dueDate: "2026-07-25",
      },
    ],
  },
  {
    title: "TO-DO",
    dotClass: "dot-todo",
    badgeClass: "badge-todo",
    tasks: [
      {
        id: 3,
        task: "TASK 1",
        creator: "Daniel",
        createdOn: "2026-07-20",
        status: "To Do",
        dueDate: "2026-07-27",
      },
      {
        id: 4,
        task: "TASK 2",
        creator: "Mae",
        createdOn: "2026-07-20",
        status: "To Do",
        dueDate: "2026-07-27",
      },
    ],
  },
  {
    title: "ONGOING",
    dotClass: "dot-progress",
    badgeClass: "badge-progress",
    tasks: [
      {
        id: 5,
        task: "TASK 1",
        creator: "Janina",
        createdOn: "2026-07-20",
        status: "Ongoing",
        dueDate: "2026-07-30",
      },
      {
        id: 6,
        task: "TASK 2",
        creator: "Daniel",
        createdOn: "2026-07-20",
        status: "Ongoing",
        dueDate: "2026-07-30",
      },
    ],
  },
  {
    title: "COMPLETED",
    dotClass: "dot-completed",
    badgeClass: "badge-done",
    tasks: [
      {
        id: 7,
        task: "TASK 1",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Completed",
        dueDate: "2026-07-21",
      },
      {
        id: 8,
        task: "TASK 2",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Completed",
        dueDate: "2026-07-21",
      },
    ],
  },
  {
    title: "UNFINISHED",
    dotClass: "dot-unfinished",
    badgeClass: "badge-unfinished",
    tasks: [
      {
        id: 9,
        task: "TASK 1",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Unfinished",
        dueDate: "2026-07-21",
      },
      {
        id: 10,
        task: "TASK 2",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Unfinished",
        dueDate: "2026-07-21",
      },
    ],
  },
];

export default function TaskBoard() {
  const [search, setSearch] = useState("");

  return (
    <div className="task-board-view">
      {/* Header Section */}
      <header className="page-header">
        <div className="title-group">
          <h1>Tasks</h1>
          <p className="subtitle">Manage, search, and track all team tasks</p>
        </div>

        <div className="header-right">
          <div className="timestamp-badge">
            <Calendar size={15} />
            <span className="date-str">July 20, 2026</span>
            <span className="dot">•</span>
            <Clock size={15} />
            <span className="time-str">12:00:00 PM</span>
          </div>

          <button className="icon-btn" aria-label="Notifications">
            <Bell size={18} />
          </button>

          <button className="btn-primary">+ NEW TASK</button>
        </div>
      </header>

      {/* Clean Toolbar Section */}
      <div className="toolbar-section">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      </div>

      {/* Accordion List Sections */}
      <div className="sections-container">
        {taskGroups.map((group) => (
          <TaskSection
            key={group.title}
            title={group.title}
            dotClass={group.dotClass}
            badgeClass={group.badgeClass}
            tasks={group.tasks.filter((task) =>
              task.task.toLowerCase().includes(search.toLowerCase())
            )}
          />
        ))}
      </div>
    </div>
  );
}

function TaskSection({
  title,
  dotClass,
  badgeClass,
  tasks,
}: {
  title: string;
  dotClass: string;
  badgeClass: string;
  tasks: Task[];
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="task-group-card">
      {/* Section Toggle Bar */}
      <button
        onClick={() => setOpen(!open)}
        className="group-header-btn"
        type="button"
      >
        <div className="header-left">
          {open ? (
            <ChevronDown size={18} className="chevron" />
          ) : (
            <ChevronRight size={18} className="chevron" />
          )}
          <span className={`status-dot ${dotClass}`} />
          <span className="group-title">{title}</span>
        </div>
        <span className="group-count">{tasks.length}</span>
      </button>

      {/* Expandable Table Area */}
      {open && (
        <div className="table-wrapper">
          <table className="task-table">
            <thead>
              <tr>
                <th className="th-cell">TASK</th>
                <th className="th-cell">CREATOR</th>
                <th className="th-cell">CREATED ON</th>
                <th className="th-cell">STATUS</th>
                <th className="th-cell">DUE DATE</th>
                <th className="th-cell text-center">VIEWED BY</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="table-row">
                  <td className="td-cell font-semibold text-slate-800">
                    {task.task}
                  </td>
                  <td className="td-cell text-slate-600">{task.creator}</td>
                  <td className="td-cell text-slate-500">{task.createdOn}</td>
                  <td className="td-cell">
                    <span className={`status-pill ${badgeClass}`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="td-cell text-slate-600">{task.dueDate}</td>
                  <td className="td-cell">
                    <div className="views-container">
                      <div className="eye-circle">
                        <Eye size={13} />
                      </div>
                      <div className="eye-circle">
                        <Eye size={13} />
                      </div>
                      <div className="eye-circle">
                        <Eye size={13} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

              {tasks.length === 0 && (
                <tr>
                  <td colSpan={6} className="empty-cell">
                    No tasks found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}