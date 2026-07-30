import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronRight,
  Eye,
  Search,
} from "lucide-react";
import NewTaskModal from "./New_Task";
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

const initialTaskGroups: TaskGroup[] = [
  {
    title: "To Be Assigned",
    dotClass: "dot-pending",
    badgeClass: "badge-pending",
    tasks: [
      {
        id: 1,
        task: "SCHEDULER SYSTEM FOR CYBENCE IT SOLUTIONS",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Pending",
        dueDate: "2026-07-25",
      },
      {
        id: 2,
        task: "ALGORTHIM OPTIMIZATION FOR ABCD COMPANY'S WEBSITE",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Pending",
        dueDate: "2026-07-25",
      },
    ],
  },
  {
    title: "To Do",
    dotClass: "dot-todo",
    badgeClass: "badge-todo",
    tasks: [
      {
        id: 3,
        task: "DESIGN AND IMPLEMENTATION OF A NEW USER INTERFACE FOR XYZ APPLICATION",
        creator: "Daniel",
        createdOn: "2026-07-20",
        status: "To Do",
        dueDate: "2026-07-27",
      },
      {
        id: 4,
        task: "DEVELOPMENT OF A MOBILE APPLICATION FOR E-COMMERCE PLATFORM",
        creator: "Mae",
        createdOn: "2026-07-20",
        status: "To Do",
        dueDate: "2026-07-27",
      },
    ],
  },
  {
    title: "Ongoing",
    dotClass: "dot-progress",
    badgeClass: "badge-progress",
    tasks: [
      {
        id: 5,
        task: "IMPLEMENTATION OF A NEW PAYMENT GATEWAY FOR ABCD COMPANY",
        creator: "Janina",
        createdOn: "2026-07-20",
        status: "Ongoing",
        dueDate: "2026-07-30",
      },
      {
        id: 6,
        task: "ALGORTHIM OPTIMIZATION FOR BYD COMPANY'S WEBSITE",
        creator: "Daniel",
        createdOn: "2026-07-20",
        status: "Ongoing",
        dueDate: "2026-07-30",
      },
    ],
  },
  {
    title: "Completed",
    dotClass: "dot-completed",
    badgeClass: "badge-done",
    tasks: [
      {
        id: 7,
        task: "SCHEDULER SYSTEM FOR WWW SOLUTIONS",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Completed",
        dueDate: "2026-07-21",
      },
      {
        id: 8,
        task: "WEB DEVELOPMENT FOR ABCD COMPANY",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Completed",
        dueDate: "2026-07-21",
      },
    ],
  },
  {
    title: "Unfinished",
    dotClass: "dot-unfinished",
    badgeClass: "badge-unfinished",
    tasks: [
      {
        id: 9,
        task: "SOFTWARE TESTING FOR XYZ APPLICATION",
        creator: "Admin",
        createdOn: "2026-07-20",
        status: "Unfinished",
        dueDate: "2026-07-21",
      },
      {
        id: 10,
        task: "HARDWARE INTEGRATION FOR ABCD COMPANY'S SYSTEM",
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
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>(initialTaskGroups);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Handle task creation submission from the modal
  const handleCreateTask = (taskData: any) => {
    const newTask: Task = {
      id: Date.now(),
      task: taskData.title,
      creator: taskData.assignTo,
      createdOn: new Date().toISOString().split("T")[0],
      status: taskData.status,
      dueDate: taskData.dueDate || new Date().toISOString().split("T")[0],
    };

    setTaskGroups((prevGroups) =>
      prevGroups.map((group) => {
        const matchesGroup =
          (group.title === "To Do" && taskData.status === "To Do") ||
          (group.title === "Ongoing" && taskData.status === "Ongoing") ||
          (group.title === "Completed" && taskData.status === "Completed") ||
          (group.title === "Unfinished" && taskData.status === "Unfinished") ||
          (group.title === "To Be Assigned" && taskData.status === "Backlog");

        if (matchesGroup) {
          return {
            ...group,
            tasks: [newTask, ...group.tasks],
          };
        }
        return group;
      })
    );

    setIsModalOpen(false);
  };

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
            <span className="date-str">{formattedDate}</span>
            <span className="dot">•</span>
            <Clock size={15} />
            <span className="time-str">{formattedTime}</span>
          </div>

          <button 
            className="btn-primary" 
            onClick={() => setIsModalOpen(true)}
          >
            + New Task
          </button>
        </div>
      </header>

      {/* Clean Toolbar Section */}
      <div className="toolbar-section">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
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

      {/* New Task Modal Popup */}
      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
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