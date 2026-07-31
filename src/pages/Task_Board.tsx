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

export const initialTaskGroups: TaskGroup[] = [
  {
    title: "To Be Assigned",
    dotClass: "dot-pending",
    badgeClass: "badge-pending",
    tasks: [
      {
        id: 1,
        task: "SCHEDULER SYSTEM FOR CYBENCE IT SOLUTIONS",
        creator: "Admin",
        assignedTo: "Perpaulo",
        createdOn: "2026-07-21",
        status: "Pending",
        dueDate: "2026-07-25",
        priority: "High",
      },
      {
        id: 2,
        task: "ALGORTHIM OPTIMIZATION FOR ABCD COMPANY'S WEBSITE",
        creator: "Admin",
        assignedTo: "Sarah Chen",
        createdOn: "2026-07-18",
        status: "Pending",
        dueDate: "2026-07-25",
        priority: "Medium",
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
        assignedTo: "Mae",
        createdOn: "2026-07-19",
        status: "To Do",
        dueDate: "2026-07-27",
        priority: "Low",
      },
      {
        id: 4,
        task: "DEVELOPMENT OF A MOBILE APPLICATION FOR E-COMMERCE PLATFORM",
        creator: "Mae",
        assignedTo: "Daniel",
        createdOn: "2026-07-17",
        status: "To Do",
        dueDate: "2026-07-27",
        priority: "Medium",
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
        assignedTo: "Perpaulo",
        createdOn: "2026-07-16",
        status: "Ongoing",
        dueDate: "2026-07-30",
        priority: "Critical",
      },
      {
        id: 6,
        task: "ALGORTHIM OPTIMIZATION FOR BYD COMPANY'S WEBSITE",
        creator: "Daniel",
        assignedTo: "Janina",
        createdOn: "2026-07-15",
        status: "Ongoing",
        dueDate: "2026-07-30",
        priority: "High",
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
        assignedTo: "Sarah Chen",
        createdOn: "2026-07-14",
        status: "Completed",
        dueDate: "2026-07-31",
        priority: "Low",
      },
      {
        id: 8,
        task: "WEB DEVELOPMENT FOR ABCD COMPANY",
        creator: "Admin",
        assignedTo: "Mae",
        createdOn: "2026-07-13",
        status: "Completed",
        dueDate: "2026-07-21",
        priority: "Medium",
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
        assignedTo: "Daniel",
        createdOn: "2026-07-12",
        status: "Unfinished",
        dueDate: "2026-07-21",
        priority: "High",
      },
      {
        id: 10,
        task: "HARDWARE INTEGRATION FOR ABCD COMPANY'S SYSTEM",
        creator: "Admin",
        assignedTo: "Perpaulo",
        createdOn: "2026-07-11",
        status: "Unfinished",
        dueDate: "2026-07-21",
        priority: "Low",
      },
    ],
  },
];

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
  const [dateSortMode, setDateSortMode] = useState<"default" | "date-newest" | "date-oldest">("default");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high" | "critical">("all");
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
      const matchesPriority = priorityFilter === "all" || task.priority.toLowerCase() === priorityFilter.toLowerCase();

      return matchesSearch && matchesPriority;
    });

    if (dateSortMode === "date-newest") {
      return [...filteredTasks].sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
    }

    if (dateSortMode === "date-oldest") {
      return [...filteredTasks].sort((a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime());
    }

    return filteredTasks;
  };

  const taskGroups = buildTaskGroups(tasks);

  // Handle task creation submission from the modal
  const handleCreateTask = (taskData: any) => {
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

        <select
          className="sort-select"
          value={dateSortMode}
          onChange={(e) => setDateSortMode(e.target.value as typeof dateSortMode)}
        >
          <option value="default">Default</option>
          <option value="date-newest">Newest to oldest</option>
          <option value="date-oldest">Oldest to newest</option>
        </select>

        <select
          className="sort-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
        >
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
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