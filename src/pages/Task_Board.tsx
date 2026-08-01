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
import type { NewTaskFormData } from "./New_Task";
import "./Task_Board.css";

export interface Task {
  id: number;
  task: string;
  creator: string;
  assignedTo: string;
  createdOn: string;
  status: string;
  dueDate: string;
  priority: string;
}

export interface TaskGroup {
  title: string;
  dotClass: string;
  badgeClass: string;
  tasks: Task[];
}

type TaskBoardProps = {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  highlightTaskId?: number | null;
  onHighlightHandled?: () => void;
};

const buildTaskGroups = (tasks: Task[]): TaskGroup[] => {
  const groupMap: Record<string, TaskGroup> = {
    "To Be Assigned": {
      title: "To Be Assigned",
      dotClass: "dot-pending",
      badgeClass: "badge-pending",
      tasks: [],
    },
    "To Do": {
      title: "To Do",
      dotClass: "dot-todo",
      badgeClass: "badge-todo",
      tasks: [],
    },
    Ongoing: {
      title: "Ongoing",
      dotClass: "dot-progress",
      badgeClass: "badge-progress",
      tasks: [],
    },
    Completed: {
      title: "Completed",
      dotClass: "dot-completed",
      badgeClass: "badge-done",
      tasks: [],
    },
    Unfinished: {
      title: "Unfinished",
      dotClass: "dot-unfinished",
      badgeClass: "badge-unfinished",
      tasks: [],
    },
  };

  tasks.forEach((task) => {
    const groupTitle =
      task.status === "Backlog" || task.status === "Pending"
        ? "To Be Assigned"
        : task.status === "To Do"
        ? "To Do"
        : task.status === "Ongoing"
        ? "Ongoing"
        : task.status === "Completed"
        ? "Completed"
        : task.status === "Unfinished"
        ? "Unfinished"
        : "To Be Assigned";

    if (groupMap[groupTitle]) {
      groupMap[groupTitle].tasks.push(task);
    }
  });

  return Object.values(groupMap);
};

export default function TaskBoard({ tasks, onTasksChange, highlightTaskId, onHighlightHandled }: TaskBoardProps) {
  const [search, setSearch] = useState("");
  const [filterMode, setFilterMode] = useState<string>("default");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (!highlightTaskId) return;

    const timer = window.setTimeout(() => {
      const targetRow = document.querySelector(`[data-task-id="${highlightTaskId}"]`) as HTMLElement | null;
      if (targetRow) {
        targetRow.scrollIntoView({ behavior: "smooth", block: "center" });
        targetRow.classList.add("is-highlighted");
        window.setTimeout(() => {
          targetRow.classList.remove("is-highlighted");
          onHighlightHandled?.();
        }, 2200);
      } else {
        onHighlightHandled?.();
      }
    }, 150);

    return () => window.clearTimeout(timer);
  }, [highlightTaskId, onHighlightHandled]);

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

  const getVisibleTasks = (tasks: Task[]) => {
    const normalizedSearch = search.toLowerCase();

    const filteredTasks = tasks.filter((task) => {
      const matchesSearch = task.task.toLowerCase().includes(normalizedSearch);

      if (filterMode.startsWith("priority-")) {
        const targetPriority = filterMode.replace("priority-", "");
        return matchesSearch && task.priority.toLowerCase() === targetPriority;
      }

      return matchesSearch;
    });

    if (filterMode === "date-newest") {
      return [...filteredTasks].sort(
        (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
      );
    }

    if (filterMode === "date-oldest") {
      return [...filteredTasks].sort(
        (a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
      );
    }

    return filteredTasks;
  };

  const taskGroups = buildTaskGroups(tasks);

<<<<<<< Updated upstream
  // Handle task creation submission from the modal
  const handleCreateTask = (taskData: NewTaskFormData) => {
=======
  const handleCreateTask = (taskData: any) => {
>>>>>>> Stashed changes
    const newTask: Task = {
      id: Date.now(),
      task: taskData.title,
      creator: "You",
      assignedTo: taskData.assignTo === "Open for anyone to take" ? "Open" : taskData.assignTo,
      createdOn: new Date().toISOString().split("T")[0],
      status: taskData.status,
      dueDate: taskData.dueDate || new Date().toISOString().split("T")[0],
      priority: taskData.priority || "Medium",
    };

    onTasksChange([...tasks, newTask]);
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
            <span className="date-str">{formattedDate}</span>
            <span className="dot">•</span>
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

        {/* Consolidated Single Filter & Sort Dropdown */}
        <select
          className="sort-select"
          value={filterMode}
          onChange={(e) => setFilterMode(e.target.value)}
        >
          <option value="default">All Tasks (Default)</option>

          <optgroup label="Sort by Date">
            <option value="date-newest">Newest to oldest</option>
            <option value="date-oldest">Oldest to newest</option>
          </optgroup>

          <optgroup label="Filter by Priority">
            <option value="priority-low">Low Priority</option>
            <option value="priority-medium">Medium Priority</option>
            <option value="priority-high">High Priority</option>
            <option value="priority-critical">Critical Priority</option>
          </optgroup>
        </select>
      </div>

      {/* Accordion List Sections */}
      <div className="sections-container">
        {taskGroups.map((group) => (
          <TaskSection
            key={group.title}
            title={group.title}
            dotClass={group.dotClass}
            tasks={getVisibleTasks(group.tasks)}
            highlightTaskId={highlightTaskId ?? null}
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

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function TaskSection({
  title,
  dotClass,
  tasks,
  highlightTaskId,
}: {
  title: string;
  dotClass: string;
  tasks: Task[];
  highlightTaskId?: number | null;
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
                <th className="th-cell">ASSIGNED TO</th>
                <th className="th-cell">CREATED ON</th>
                <th className="th-cell">DUE DATE</th>
                <th className="th-cell viewed-by-header">VIEWED BY</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} data-task-id={task.id} className={`table-row ${task.id === highlightTaskId ? "highlighted-task-row" : ""}`}>
                  <td className="td-cell font-semibold text-slate-800">
                    {task.task}
                  </td>
                  <td className="td-cell text-slate-600">{task.creator}</td>
                  <td className="td-cell text-slate-600">{task.assignedTo}</td>
                  <td className="td-cell text-slate-500">{formatDate(task.createdOn)}</td>
                  <td className="td-cell text-slate-600">{formatDate(task.dueDate)}</td>
                  <td className="td-cell viewed-by-cell">
                    <div className="views-container">
                      <div className="eye-circle">
                        <Eye size={11} />
                      </div>
                      <div className="eye-circle">
                        <Eye size={11} />
                      </div>
                      <div className="eye-circle">
                        <Eye size={11} />
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