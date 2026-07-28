
import React, { useState } from "react";
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
} from "lucide-react";
import ProfilePage from "./Profile_Page";
import CalendarPage from "./Calendar";
import TaskBoard from "./Task_Board";
import RequestsPage from "./Requests";
import SettingsPage from "./Settings";

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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-slate-50">
      
      {/* AMBIENT MESH BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50vh] w-[70vw] rotate-[-25deg] rounded-[100%] bg-gradient-to-br from-[#106fb8]/35 to-sky-300/20 blur-[130px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[55vh] w-[75vw] rotate-[20deg] rounded-[100%] bg-gradient-to-tl from-sky-400/35 to-[#106fb8]/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-[150px]" />
      </div>

      {/* FIXED SIDEBAR */}
      <aside className="relative z-10 h-full w-74 shrink-0 border-r border-white/60 bg-white/70 backdrop-blur-2xl flex flex-col justify-between p-6 shadow-[10px_0_30px_rgba(0,0,0,0.02)]">
        <div>
          {/* Logo & Header */}
          <div className="mb-8 flex items-center gap-3">
            <img
              src="src/assets/cybence-logo.png"
              alt="Cybence Logo"
              className="h-14 w-14 object-contain rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold tracking-[.17em] text-[#106fb8] leading-none">
                CYBENCE
              </h1>
              <p className="text-xs text-[12px]">
                Information Technology Solutions
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
                Workspace
              </p>
              <nav className="space-y-1.5">
                <SidebarItem
                  icon={<LayoutDashboard size={18} />}
                  label="Dashboard"
                  active={activeTab === "dashboard"}
                  onClick={() => setActiveTab("dashboard")}
                />
                <SidebarItem
                  icon={<CheckSquare size={18} />}
                  label="Task"
                  active={activeTab === "tasks"}
                  onClick={() => setActiveTab("tasks")}
                />
                <SidebarItem
                  icon={<CalendarIcon size={18} />}
                  label="Calendar"
                  active={activeTab === "calendar"}
                  onClick={() => setActiveTab("calendar")}
                />
                <SidebarItem
                  icon={<FileText size={18} />}
                  label="Requests"
                  active={activeTab === "requests"}
                  onClick={() => setActiveTab("requests")}
                />
              </nav>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-3">
                Account
              </p>
              <nav className="space-y-1.5">
                <SidebarItem
                  icon={<Settings size={18} />}
                  label="Settings"
                  active={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                />
                <SidebarItem
                  icon={<User size={18} />}
                  label="Profile"
                  active={activeTab === "profile"}
                  onClick={() => setActiveTab("profile")}
                />
                <SidebarItem
                  icon={<LogOut size={18} />}
                  label="Logout"
                />
              </nav>
            </div>
          </div>
        </div>

        {/* User Card */}
        <div 
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 flex items-center gap-3 cursor-pointer hover:bg-slate-100/80 transition-colors"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#106fb8]/10 text-sm font-bold text-[#106fb8]">
            PV
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-800">
              Perpaulo Varca
            </p>
            <p className="truncate text-xs text-slate-500">
              Intern • Active
            </p>
          </div>
        </div>
      </aside>

      {/* DYNAMIC MAIN AREA (Removes outer padding when activeTab === "profile") */}
      <main
        className={`relative z-10 flex-1 h-full overflow-y-auto ${
          activeTab === "profile" ? "p-0" : "p-6 lg:p-8 space-y-6"
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
            <section className="relative overflow-hidden rounded-[20px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-sky-400 to-[#106fb8]" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-[1.75rem] sm:text-[2rem] font-bold tracking-tight text-slate-900">
                    Good Afternoon, Perpaulo! 👋
                  </h1>
                  <div className="mt-2 flex items-center gap-4 text-xs font-semibold text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarIcon className="h-4 w-4 text-[#106fb8]" />
                      July 20, 2026
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#106fb8]" />
                      12:00:00 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer shadow-sm">
                    <Bell className="h-4 w-4" />
                  </button>

                  <button onClick={() => setActiveTab("tasks")} className="flex items-center gap-2 rounded-2xl bg-[#106fb8] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#106fb8]/20 transition-all hover:bg-[#0e5ea4] hover:shadow-lg hover:shadow-[#106fb8]/30 hover:-translate-y-0.5 cursor-pointer">
                    <Plus className="h-4 w-4" />
                    <span>New Task</span>
                  </button>
                </div>
              </div>
            </section>

            {/* STATS GRID */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                value="1"
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
              <section className="lg:col-span-2 rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <h2 className="text-xl font-semibold text-slate-900">
                  Weekly Activity
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Task completions over the past week
                </p>

                <div className="flex items-end justify-between gap-3 sm:gap-6 h-60 mt-6 px-4">
                  {weeklyData.map((item) => (
                    <div key={item.day} className="flex flex-col items-center flex-1 h-full justify-end group">
                      <div className="w-full max-w-[36px] rounded-2xl bg-slate-100 group-hover:bg-sky-100 transition-colors p-1 flex items-end justify-center h-full">
                        <div
                          className="w-full rounded-xl bg-gradient-to-t from-[#106fb8] to-sky-400 transition-all duration-500 shadow-sm"
                          style={{
                            height: `${(item.value / 8) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-500 mt-3">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Task Status
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Proportional breakdown
                  </p>
                </div>

                <div className="relative flex justify-center items-center my-6">
                  <div
                    className="w-40 h-40 rounded-full shadow-inner"
                    style={{
                      background:
                        "conic-gradient(#106fb8 0% 50%, #38bdf8 50% 75%, #e2e8f0 75% 100%)",
                    }}
                  />
                  <div className="absolute w-28 h-28 rounded-full bg-white/90 backdrop-blur-md flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">10</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">Tasks</span>
                  </div>
                </div>

                <div className="flex justify-around text-xs font-semibold text-slate-600 border-t border-slate-100 pt-3">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-[#106fb8]" /> Completed</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> Ongoing</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /> To Do</span>
                </div>
              </section>
            </div>

            {/* BOTTOM SECTION */}
            <div className="grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900">
                    Recent Tasks
                  </h2>
                  <button onClick={() => setActiveTab("tasks")} className="flex items-center gap-1 text-xs font-semibold text-[#106fb8] hover:underline cursor-pointer">
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

              <section className="rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
                <h2 className="text-lg font-bold text-slate-900 mb-4">
                  Team Overview
                </h2>

                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-800">{member.name} <span className="text-slate-400 font-normal">({member.role})</span></span>
                        <span className="text-[#106fb8]">{member.progress}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-[#106fb8] rounded-full transition-all duration-500"
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
      className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
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
    <div className="rounded-[28px] border border-white/80 bg-white/85 p-5 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-2xl ${bg}`}>
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <span className="text-3xl font-bold text-slate-900">{value}</span>
        <p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

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
    <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-[#106fb8]/20 hover:bg-white">
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        <p className="mt-0.5 text-xs text-slate-400">{date}</p>
      </div>
      <span className="rounded-full bg-[#106fb8]/10 px-3 py-1 text-xs font-semibold text-[#106fb8]">
        {status}
      </span>
    </div>
  );
}