import { useState, useEffect, useMemo } from "react";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  Search,
  SlidersHorizontal,
  X,
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

export interface FilterState {
  search: string;
  priorities: string[];
  statuses: string[];
  sort: "asc" | "desc";
}

type TaskBoardProps = {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  highlightTaskId?: number | null;
  onHighlightHandled?: () => void;
};

const PRIORITIES = ["Low", "Medium", "High", "Critical"];
const STATUSES = ["To Be Assigned", "To Do", "Ongoing", "Completed", "Unfinished"];

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
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    priorities: [],
    statuses: [],
    sort: "desc",
  });
  const [showFilterModal, setShowFilterModal] = useState(false);
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

  // Check if any filter or custom sort is active
  const hasActiveFilters =
    filter.priorities.length > 0 || filter.statuses.length > 0 || filter.sort !== "desc";

  // Filter and sort tasks dynamically
  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (filter.search.trim()) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.task.toLowerCase().includes(q) ||
          t.creator.toLowerCase().includes(q) ||
          t.assignedTo.toLowerCase().includes(q)
      );
    }

    if (filter.priorities.length > 0) {
      result = result.filter((t) =>
        filter.priorities.some((p) => p.toLowerCase() === t.priority.toLowerCase())
      );
    }

    if (filter.statuses.length > 0) {
      result = result.filter((t) => filter.statuses.includes(t.status));
    }

    result.sort((a, b) => {
      const timeA = new Date(a.createdOn).getTime();
      const timeB = new Date(b.createdOn).getTime();
      return filter.sort === "asc" ? timeA - timeB : timeB - timeA;
    });

    return result;
  }, [tasks, filter]);

  const taskGroups = buildTaskGroups(filteredTasks);

  const handleCreateTask = (taskData: NewTaskFormData) => {
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

      {/* Toolbar Section */}
      <div className="toolbar-section">
        <div className="filter-controls">
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className={`btn-filter ${hasActiveFilters ? "is-active" : ""}`}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            
            {hasActiveFilters && (
              <span
                role="button"
                tabIndex={0}
                title="Clear filters"
                onClick={(e) => {
                  e.stopPropagation();
                  setFilter({ search: filter.search, priorities: [], statuses: [], sort: "desc" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.stopPropagation();
                    setFilter({ search: filter.search, priorities: [], statuses: [], sort: "desc" });
                  }
                }}
                className="clear-filter-icon"
              >
                <X size={14} />
              </span>
            )}
          </button>
        </div>

        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.search}
            onChange={(e) => setFilter((f) => ({ ...f, search: e.target.value }))}
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
            tasks={group.tasks}
            highlightTaskId={highlightTaskId ?? null}
          />
        ))}
      </div>

      {/* Filter Modal Overlay */}
      {showFilterModal && (
        <FilterModal
          filter={filter}
          onChange={(newFilter) => setFilter(newFilter)}
          onClose={() => setShowFilterModal(false)}
        />
      )}

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

function FilterModal({
  filter,
  onChange,
  onClose,
}: {
  filter: FilterState;
  onChange: (f: FilterState) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<FilterState>(filter);

  const togglePriority = (p: string) =>
    setLocal((f) => ({
      ...f,
      priorities: f.priorities.includes(p)
        ? f.priorities.filter((x) => x !== p)
        : [...f.priorities, p],
    }));

  const toggleStatus = (s: string) =>
    setLocal((f) => ({
      ...f,
      statuses: f.statuses.includes(s)
        ? f.statuses.filter((x) => x !== s)
        : [...f.statuses, s],
    }));

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal-card">
        <div className="filter-modal-header">
          <h3>Filter &amp; Sort Tasks</h3>
          <button type="button" onClick={onClose} className="btn-close-modal">
            <X size={18} />
          </button>
        </div>

        <div className="filter-modal-body">
          {/* Priority Filter */}
          <div className="filter-group">
            <label className="filter-label">Priority</label>
            <div className="filter-chip-row">
              {PRIORITIES.map((p) => {
                const active = local.priorities.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePriority(p)}
                    className={`filter-chip ${active ? "chip-active" : ""}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <label className="filter-label">Status</label>
            <div className="filter-chip-row">
              {STATUSES.map((s) => {
                const active = local.statuses.includes(s);
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleStatus(s)}
                    className={`filter-chip ${active ? "chip-active" : ""}`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Direction */}
          <div className="filter-group">
            <label className="filter-label">Sort by Created Date</label>
            <div className="filter-toggle-row">
              {(["desc", "asc"] as const).map((dir) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => setLocal((f) => ({ ...f, sort: dir }))}
                  className={`filter-toggle-btn ${local.sort === dir ? "toggle-active" : ""}`}
                >
                  {dir === "desc" ? "Newest first" : "Oldest first"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="filter-modal-actions">
          <button
            type="button"
            className="btn-reset"
            onClick={() =>
              setLocal({ search: filter.search, priorities: [], statuses: [], sort: "desc" })
            }
          >
            Reset
          </button>
          <button
            type="button"
            className="btn-apply"
            onClick={() => {
              onChange(local);
              onClose();
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

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