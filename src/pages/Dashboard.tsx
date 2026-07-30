import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar as CalendarIcon,
  FileText,
  Settings,
  User,
  LogOut,
  Bell,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  ListTodo,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";
import ProfilePage from "./Profile_Page";
import CalendarPage from "./Calendar";
import TaskBoard from "./Task_Board";
import RequestsPage from "./Requests";
import SettingsPage from "./Settings";
import NotificationPanel from "./Notification";
import NewTaskModal from "./New_Task";

type DashboardProps = {
  onLogout: () => void;
};

export default function Dashboard({ onLogout }: DashboardProps) {
  const weeklyData = [
    { day: "Mon", value: 4 },
    { day: "Tue", value: 7 },
    { day: "Wed", value: 2 },
    { day: "Thu", value: 5 },
    { day: "Fri", value: 5 },
    { day: "Sat", value: 1 },
  ];

  const teamMembers = [
    { name: "Perpaulo", role: "Intern", progress: "80%" },
    { name: "Daniel", role: "Developer", progress: "65%" },
    { name: "Mae", role: "Designer", progress: "90%" },
    { name: "Janina", role: "Manager", progress: "75%" },
  ];

  const recentTasks = [
    { id: "1", title: "Task 1", date: "2026-07-07", status: "Completed" },
    { id: "2", title: "Task 2", date: "2026-07-07", status: "Ongoing" },
    { id: "3", title: "Task 3", date: "2026-07-07", status: "To Do" },
  ];

  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    if (isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotificationOpen]);

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

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-slate-50">
      {/* AMBIENT MESH BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50vh] w-[70vw] rotate-[-25deg] rounded-[100%] bg-gradient-to-br from-[#106fb8]/35 to-sky-300/20 blur-[130px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[55vh] w-[75vw] rotate-[20deg] rounded-[100%] bg-gradient-to-tl from-sky-400/35 to-[#106fb8]/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-[150px]" />
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
        className={`fixed inset-y-0 left-0 z-30 flex h-full w-[260px] shrink-0 flex-col justify-between border-r border-white/60 bg-white/80 p-4 backdrop-blur-2xl shadow-2xl transition-transform duration-300 lg:shadow-none lg:static lg:translate-x-0 ${
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
                <h1 className="text-xl font-bold leading-none tracking-[0.42em] text-[#106fb8] truncate">
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
                  active={activeTab === "dashboard"}
                  onClick={() => {
                    setActiveTab("dashboard");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<CheckSquare size={18} />}
                  label="Task"
                  active={activeTab === "tasks"}
                  onClick={() => {
                    setActiveTab("tasks");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<CalendarIcon size={18} />}
                  label="Calendar"
                  active={activeTab === "calendar"}
                  onClick={() => {
                    setActiveTab("calendar");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<FileText size={18} />}
                  label="Requests"
                  active={activeTab === "requests"}
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
                  active={activeTab === "settings"}
                  onClick={() => {
                    setActiveTab("settings");
                    setIsMobileMenuOpen(false);
                  }}
                />
                <SidebarItem
                  icon={<User size={18} />}
                  label="Profile"
                  active={activeTab === "profile"}
                  onClick={() => {
                    setActiveTab("profile");
                    setIsMobileMenuOpen(false);
                  }}
                />
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
            PV
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-800">
              Perpaulo Varca
            </p>
            <p className="truncate text-xs text-slate-500">Intern • Active</p>
          </div>
        </div>
      </aside>

      {/* DYNAMIC MAIN AREA */}
      <main
        className={`relative z-10 h-full flex-1 overflow-y-auto ${
          activeTab === "profile" ? "p-0" : "p-4 sm:p-6 lg:p-8 space-y-6"
        }`}
      >
        {activeTab === "profile" ? (
          <ProfilePage onBackToDashboard={() => setActiveTab("dashboard")} />
        ) : activeTab === "calendar" ? (
          <CalendarPage />
        ) : activeTab === "tasks" ? (
          <TaskBoard />
        ) : activeTab === "requests" ? (
          <RequestsPage />
        ) : activeTab === "settings" ? (
          <SettingsPage />
        ) : (
          <>
            {/* HEADER BAR */}
            <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              {/* GRADIENT ACCENT BAR */}
              <div className="absolute left-0 top-0 h-1 w-full rounded-t-3xl bg-gradient-to-r from-sky-400 via-sky-500 to-[#106fb8] shadow-[0_2px_8px_rgba(16,111,184,0.3)]" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                      {greeting}, Perpaulo! 👋
                    </h1>
                    <div className="mt-1 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500">
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

                <div className="flex items-center gap-3">
                  <div className="relative" ref={notificationRef}>
                    <button
                      onClick={() => setIsNotificationOpen((prev) => !prev)}
                      className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-sm"
                      aria-label="Open notifications"
                    >
                      <Bell className="h-4 w-4" />
                    </button>
                    {isNotificationOpen && (
                      <div className="absolute right-0 top-14 z-50 w-80">
                        <NotificationPanel
                          isOpen={isNotificationOpen}
                          onClose={() => setIsNotificationOpen(false)}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsNewTaskOpen(true)}
                    className="flex items-center gap-2 rounded-2xl bg-[#106fb8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#106fb8]/20 transition-all hover:bg-[#0e5ea4] hover:shadow-lg hover:shadow-[#106fb8]/30 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>New Task</span>
                  </button>
                </div>
              </div>
            </section>

            {/* STATS GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                value="9"
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
                value="3"
                title="Ongoing"
                subtitle="Active works"
                icon={<TrendingUp className="h-5 w-5 text-sky-600" />}
                bg="bg-sky-50"
              />
              <StatCard
                value="4"
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

                <div className="mt-6 flex h-60 items-end justify-between gap-3 px-4 sm:gap-6">
                  {weeklyData.map((item) => (
                    <div
                      key={item.day}
                      className="group relative flex h-full flex-1 flex-col items-center justify-end"
                    >
                      <div className="absolute -top-7 opacity-0 transition-opacity group-hover:opacity-100 rounded-lg bg-slate-800 px-2 py-0.5 text-[10px] text-white pointer-events-none">
                        {item.value} tasks
                      </div>
                      <div className="flex h-full w-full max-w-[36px] items-end justify-center rounded-2xl bg-slate-100 p-1 transition-colors group-hover:bg-sky-100">
                        <div
                          className="w-full rounded-xl bg-gradient-to-t from-[#106fb8] to-sky-400 shadow-sm transition-all duration-500"
                          style={{
                            height: `${(item.value / 8) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="mt-3 text-xs font-medium text-slate-500">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex flex-col justify-between rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Task Status
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Proportional breakdown
                  </p>
                </div>

                <div className="relative my-6 flex justify-center items-center">
                  <div
                    className="h-40 w-40 rounded-full shadow-inner"
                    style={{
                      background:
                        "conic-gradient(#106fb8 0% 44%, #38bdf8 44% 77%, #cbd5e1 77% 100%)",
                    }}
                  />
                  <div className="absolute flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white/90 backdrop-blur-md">
                    <span className="text-2xl font-bold text-slate-900">9</span>
                    <span className="text-[10px] font-semibold uppercase text-slate-400">
                      Tasks
                    </span>
                  </div>
                </div>

                <div className="flex justify-around border-t border-slate-100 pt-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#106fb8]" />
                    Completed
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                    Ongoing
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                    To Do
                  </span>
                </div>
              </section>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Tasks
                  </h2>
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

              <section className="rounded-3xl border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <h2 className="mb-4 text-lg font-bold text-slate-900">
                  Team Overview
                </h2>

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