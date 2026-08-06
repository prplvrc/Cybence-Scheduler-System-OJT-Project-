import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar as CalendarIcon,
  FileText,
  Settings,
  User,
  LogOut,
  Clock,
  ArrowRight,
  TrendingUp,
  ListTodo,
  CheckCircle2,
  Menu,
  X,
  Logs,
} from "lucide-react";
import ProfilePage from "./Profile_Page";
import CalendarPage from "./Calendar";
import TaskBoard from "./Task_Board";
import RequestsPage from "./Requests";
import SettingsPage from "./Settings";
import AuditLogs from "./AuditLogs";
import NewTaskModal from "./New_Task";
import { type Task } from "./Task_Board";
import { initialTaskGroups } from "./Task_Data";

type DashboardProps = {
  onLogout: () => void;
  highlightedTaskId?: number | null;
  onTaskHighlightHandled?: () => void;
  currentUser: { id: string; name: string; role?: string };
  auditLogs: import("./AuditLogs").AuditEntry[];
};

export default function Dashboard({
  onLogout,
  highlightedTaskId,
  onTaskHighlightHandled,
  currentUser,
  auditLogs,
}: DashboardProps) {
  const weeklyData = [
    { day: "Mon", completed: 4, ongoing: 3, created: 2 },
    { day: "Tue", completed: 2, ongoing: 4, created: 1 },
    { day: "Wed", completed: 3, ongoing: 1, created: 2 },
    { day: "Thu", completed: 6, ongoing: 2, created: 0 },
    { day: "Fri", completed: 5, ongoing: 3, created: 0 },
    { day: "Sat", completed: 1, ongoing: 0, created: 0 },
  ];

  const teamMembers = [
    { name: "Perpaulo", role: "Intern", progress: "80%" },
    { name: "Daniel", role: "Developer", progress: "65%" },
    { name: "Mae", role: "Designer", progress: "90%" },
    { name: "Janina", role: "Manager", progress: "75%" },
  ];

  const recentTasks = [
    {
      id: "1",
      title: "Scheduler system for Cybence IT Solutions",
      date: "2026-07-21",
      status: "Pending",
    },
    {
      id: "2",
      title: "New payment gateway implementation",
      date: "2026-07-16",
      status: "Ongoing",
    },
    {
      id: "3",
      title: "New user interface implementation",
      date: "2026-07-19",
      status: "To Do",
    },
  ];

  const [activeTab, setActiveTab] = useState("dashboard");

  const currentTab = highlightedTaskId != null ? "tasks" : activeTab;
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [pieReveal, setPieReveal] = useState(0);
  const [tasks, setTasks] = useState<Task[]>(() =>
    initialTaskGroups.flatMap((group) => group.tasks)
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Trigger chart load animation when showing the dashboard tab
    if (activeTab !== "dashboard") {
      // ensure charts are reset when leaving
      setChartLoaded(false);
      return;
    }

    setChartLoaded(false);
    const timeout = window.setTimeout(() => setChartLoaded(true), 150);
    return () => window.clearTimeout(timeout);
  }, [activeTab]);

  useEffect(() => {
    if (!chartLoaded) {
      setPieReveal(0);
      return;
    }

    let revealValue = 0;
    const interval = window.setInterval(() => {
      revealValue += 6;
      if (revealValue >= 360) {
        setPieReveal(360);
        window.clearInterval(interval);
      } else {
        setPieReveal(revealValue);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [chartLoaded]);

  const greeting =
    currentTime.getHours() < 12
      ? "Good Morning"
      : currentTime.getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";

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

  const pieRadius = 56;
  const pieStroke = 18;
  const pieCircumference = 2 * Math.PI * pieRadius;
  const pieProgress = pieReveal / 360;
  const pieStrokeDashoffset = pieCircumference * (1 - pieProgress);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* AMBIENT MESH BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-[50vh] w-[70vw] rotate-[-25deg] rounded-[100%] bg-linear-to-br from-[#106fb8]/35 to-sky-300/20 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[55vh] w-[75vw] rotate-20 rounded-[100%] bg-linear-to-tl from-sky-400/35 to-[#106fb8]/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-100 w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-[150px]" />
      </div>

      {/* MOBILE BACKDROP */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300 lg:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex h-full w-60 shrink-0 flex-col justify-between border-r border-white/60 bg-white/80 p-4 backdrop-blur-2xl shadow-2xl transition-transform duration-300 lg:shadow-none lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* HEADER / BRANDING & ALIGNED CLOSE BUTTON */}
          <div className="mb-6 flex items-start justify-between">
            <button
              type="button"
              onClick={() => {
                setActiveTab("dashboard");
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 rounded-xl px-2 py-1 text-left transition-colors hover:bg-slate-100/80 cursor-pointer"
            >
              <img
                src="src/assets/cybence-logo.png"
                alt="Cybence Logo"
                className="h-10 w-10 shrink-0 rounded-xl object-contain"
              />
              <div className="min-w-0 flex-1 overflow-hidden">
                <h1 className="text-xl font-bold leading-none tracking-[0.52em] text-[#106fb8] truncate">
                  CYBENCE
                </h1>
                <p className="mt-1 truncate text-[10px] text-slate-500">
                  Information Technology Solutions
                </p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-1 flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 cursor-pointer lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Workspace
              </p>
              <nav className="space-y-1.5">
                <SidebarItem
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                  active={currentTab === "dashboard"}
                  onClick={() => {
                    setActiveTab("dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<CheckSquare size={18} />}
                  label="Task"
                  active={currentTab === "tasks"}
                  onClick={() => {
                    setActiveTab("tasks");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<CalendarIcon size={18} />}
                  label="Calendar"
                  active={currentTab === "calendar"}
                  onClick={() => {
                    setActiveTab("calendar");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<FileText size={18} />}
                  label="Requests"
                  active={currentTab === "requests"}
                  onClick={() => {
                    setActiveTab("requests");
                    setIsMobileMenuOpen(false);
                  }}
                />
              </nav>
            </div>

            <div>
              <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Account
              </p>
              <nav className="space-y-1.5">
                <SidebarItem
                  icon={<Settings size={18} />}
                  label="Settings"
                  active={currentTab === "settings"}
                  onClick={() => {
                    setActiveTab("settings");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<User size={18} />}
                  label="Profile"
                  active={currentTab === "profile"}
                  onClick={() => {
                    setActiveTab("profile");
                    setIsMobileMenuOpen(false);
                  }}
                />
                {currentUser.role === "Admin" && (
                  <SidebarItem
                    icon={<Logs size={18} />}
                    label="Audit Logs"
                    active={currentTab === "audit"}
                    onClick={() => {
                      setActiveTab("audit");
                      setIsMobileMenuOpen(false);
                    }}
                  />
                )}
                <SidebarItem
                  icon={<LogOut size={18} />}
                  label="Logout"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to logout?")) {
                      onLogout();
                    }
                  }}
                />
              </nav>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div
          onClick={() => {
            setActiveTab("profile");
            setIsMobileMenuOpen(false);
          }}
          className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 transition-colors hover:bg-slate-100/80"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#106fb8]/10 text-sm font-bold text-[#106fb8]">
            {currentUser.name
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-800">
              {currentUser.name}
            </p>
            <p className="truncate text-xs text-slate-500">{currentUser.role ?? "Member"} • Active</p>
          </div>
        </div>
      </aside>

      {/* DYNAMIC MAIN AREA */}
      <main
        className={`dashboard-main relative z-10 h-full flex-1 overflow-y-auto ${
          activeTab === "profile" ? "p-0" : "p-4 sm:p-6 lg:p-8 space-y-6"
        }`}
      >
        {activeTab === "profile" ? (
          <ProfilePage currentUser={currentUser} />
        ) : activeTab === "calendar" ? (
          <CalendarPage
            tasks={tasks}
            onTasksChange={setTasks}
            currentUserName={currentUser.name}
          />
        ) : activeTab === "tasks" ? (
          <TaskBoard
            tasks={tasks}
            onTasksChange={setTasks}
            highlightTaskId={highlightedTaskId ?? null}
            onHighlightHandled={onTaskHighlightHandled}
          />
        ) : activeTab === "requests" ? (
          <RequestsPage currentUser={currentUser} />
        ) : activeTab === "settings" ? (
          <SettingsPage currentUser={currentUser} />
        ) : activeTab === "audit" ? (
          <AuditLogs logs={auditLogs} />
        ) : (
          <>
            {/* HEADER BAR */}
            <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              {/* GRADIENT ACCENT BAR */}
              <div className="absolute left-0 top-0 h-1 w-full rounded-t-3xl bg-linear-to-r from-sky-400 via-sky-500 to-[#106fb8] shadow-[0_2px_8px_rgba(16,111,184,0.3)]" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* LEFT SIDE: Mobile Menu + Greeting */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="p-2 text-slate-600 lg:hidden rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50"
                  >
                    <Menu size={20} />
                  </button>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {greeting}, {currentUser.name.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-sm text-slate-500 font-medium">
                      Here is what's happening with your workspace today.
                    </p>
                  </div>
                </div>

                {/* RIGHT SIDE: Date & Time */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4 text-[#106fb8]" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#106fb8]" />
                      {formattedTime}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                value="10"
                title="Total Tasks"
                subtitle="All works"
                icon={<ListTodo className="h-5 w-5 text-[#106fb8]" />}
                bg="bg-[#106fb8]/10"
              />
              <StatCard
                value="2"
                title="To Do"
                subtitle="Not yet started"
                icon={<Clock className="h-5 w-5 text-amber-600" />}
                bg="bg-amber-50"
              />
              <StatCard
                value="2"
                title="Ongoing"
                subtitle="Active works"
                icon={<TrendingUp className="h-5 w-5 text-sky-600" />}
                bg="bg-sky-50"
              />
              <StatCard
                value="2"
                title="Completed"
                subtitle="Completed works"
                icon={<CheckCircle2 className="h-5 w-5 text-emerald-600" />}
                bg="bg-emerald-50"
              />
            </div>

            {/* CHARTS */}
            <div className="grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <h2 className="text-xl font-semibold text-slate-900">
                  Weekly Activity
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  Task completions over the past week
                </p>

                {(() => {
                  const maxTotal = Math.max(
                    1,
                    ...weeklyData.map((d: any) => d.completed + d.ongoing + d.created)
                  );

                  return (
                    <>
                      <div className="mt-6 flex h-60 items-end justify-between gap-3 px-4 sm:gap-6">
                        {weeklyData.map((item: any) => (
                          <div
                            key={item.day}
                            className="group relative flex h-full flex-1 flex-col items-center justify-end"
                          >
                            <div className="absolute -top-14 opacity-0 transition-opacity group-hover:opacity-100 rounded-lg bg-white px-3 py-2 text-xs text-slate-800 shadow-md pointer-events-none w-36">
                              <div className="font-semibold">{item.day}</div>
                              <div className="mt-1 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500" /> <span className="text-[11px]">Completed: <strong className="ml-1">{item.completed}</strong></span></div>
                              <div className="mt-1 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-400" /> <span className="text-[11px]">Ongoing: <strong className="ml-1">{item.ongoing}</strong></span></div>
                              <div className="mt-1 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-sky-500" /> <span className="text-[11px]">Created: <strong className="ml-1">{item.created}</strong></span></div>
                            </div>

                            <div className="flex h-full w-full max-w-9 items-end justify-center rounded-2xl bg-slate-100 p-1 transition-colors group-hover:bg-sky-100">
                              <div
                                className="w-full rounded-xl bg-linear-to-t from-[#106fb8] to-sky-400 shadow-xs"
                                style={{
                                  height: chartLoaded ? `${((item.completed + item.ongoing + item.created) / maxTotal) * 100}%` : "0%",
                                  transition: "height 0.8s ease-out 150ms",
                                  transformOrigin: "bottom",
                                }}
                              />
                            </div>
                            <span className="mt-3 text-xs font-medium text-slate-500">
                              {item.day}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-4 px-4">
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                          Completed
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                          Ongoing
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                          Created
                        </div>
                      </div>
                    </>
                  );
                })()}
              </section>

              <section className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Priority Distribution
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Breakdown by task priority
                  </p>
                </div>

                <div className="relative my-6 flex items-center justify-between gap-4">
                  <div className="relative flex items-center gap-4">
                    <svg
                      className="h-40 w-40"
                      viewBox="0 0 160 160"
                      role="img"
                      aria-label="Priority distribution donut chart"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="56"
                        stroke="#e6eef7"
                        strokeWidth={pieStroke}
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="56"
                        stroke="url(#priorityGradient)"
                        strokeWidth={pieStroke}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={pieCircumference}
                        strokeDashoffset={pieStrokeDashoffset}
                        transform="rotate(-90 80 80)"
                        style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
                      />
                      <defs>
                        <linearGradient id="priorityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#16a34a" />
                          <stop offset="30%" stopColor="#f59e0b" />
                          <stop offset="65%" stopColor="#fb923c" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white/90 backdrop-blur-md">
                      <span className="text-2xl font-bold text-slate-900">15</span>
                      <span className="text-[10px] font-semibold uppercase text-slate-400">
                        Tasks
                      </span>
                    </div>
                  </div>

                  <div className="ml-4 flex w-40 flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#16a34a]" />
                        <span className="text-xs text-slate-600">Low</span>
                      </div>
                      <span className="text-xs text-slate-700 font-semibold">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#f59e0b]" />
                        <span className="text-xs text-slate-600">Medium</span>
                      </div>
                      <span className="text-xs text-slate-700 font-semibold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#fb923c]" />
                        <span className="text-xs text-slate-600">High</span>
                      </div>
                      <span className="text-xs text-slate-700 font-semibold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded-full bg-[#ef4444]" />
                        <span className="text-xs text-slate-600">Critical</span>
                      </div>
                      <span className="text-xs text-slate-700 font-semibold">3</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* BOTTOM SECTION: RECENT TASKS & TEAM OVERVIEW */}
            <div className="grid gap-6 lg:grid-cols-2">
              <section className="flex h-full flex-col rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Recent Tasks
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Latest updates from your workspace
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#106fb8] hover:underline"
                  >
                    View Board <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {recentTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      title={task.title}
                      date={task.date}
                      status={task.status}
                    />
                  ))}
                </div>
              </section>

              <section className="flex h-full flex-col rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Team Overview
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500">
                      Individual progress across the team
                    </p>
                  </div>
                  <div className="rounded-full bg-[#106fb8]/10 px-3 py-1 text-xs font-semibold text-[#106fb8]">
                    4 members
                  </div>
                </div>

                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">
                          {member.name}{" "}
                          <span className="font-normal text-slate-400">
                            ({member.role})
                          </span>
                        </span>
                        <span className="text-[#106fb8]">
                          {member.progress}
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 p-0.5">
                        <div
                          className="h-full rounded-full bg-[#106fb8] transition-all duration-500"
                          style={{ width: member.progress }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </main>

      {/* NEW TASK MODAL */}
      <NewTaskModal
        isOpen={isNewTaskOpen}
        onClose={() => setIsNewTaskOpen(false)}
        onSubmit={(taskData) => {
          console.log("New task created:", taskData);
          setIsNewTaskOpen(false);
        }}
      />
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
        active
          ? "bg-[#106fb8] text-white shadow-md shadow-[#106fb8]/20"
          : "text-slate-600 hover:bg-white hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  value,
  title,
  subtitle,
  icon,
  bg,
}: {
  value: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bg: string;
}) {
  return (
    <div className="rounded-3xl border border-white/80 bg-white/85 p-5 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`rounded-2xl p-2.5 ${bg}`}>{icon}</div>
      </div>
      <div className="mt-3">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        <p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Ongoing: "bg-sky-50 text-sky-600 border-sky-100",
  "To Do": "bg-amber-50 text-amber-600 border-amber-100",
  Pending: "bg-slate-100 text-slate-600 border-slate-200",
};

function TaskItem({
  title,
  date,
  status,
}: {
  title: string;
  date: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-3.5 transition-all hover:border-[#106fb8]/20 hover:bg-white">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{date}</p>
      </div>
      <span
        className={`rounded-full border px-3 py-1 text-xs font-semibold ${
          statusStyles[status] || "bg-slate-100 text-slate-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}