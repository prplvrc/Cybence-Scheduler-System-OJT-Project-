import {
  ArrowLeft,
  BadgeCheck,
  Briefcase,
  CalendarDays,
  Clock3,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const profileDetails = [
  { label: "Email", value: "maria.dela.cruz@cybence.com", icon: Mail },
  { label: "Phone", value: "+63 912 345 6789", icon: Phone },
  { label: "Location", value: "Quezon City, Philippines", icon: MapPin },
  { label: "Department", value: "Operations & Scheduling", icon: Briefcase },
];

const stats = [
  { label: "Assignments", value: "12" },
  { label: "Attendance", value: "98%" },
  { label: "Upcoming Tasks", value: "4" },
];

const schedule = [
  { day: "Today", time: "09:00 AM - Team Sync" },
  { day: "Tomorrow", time: "02:00 PM - Client Review" },
  { day: "Friday", time: "11:30 AM - Training Session" },
];

type ProfilePageProps = {
  onBackToDashboard: () => void;
};

export default function ProfilePage({ onBackToDashboard }: ProfilePageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 p-4 sm:p-6 lg:p-8">

      {/* Ambient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] h-[50vh] w-[70vw] rotate-[-25deg] rounded-[100%] bg-gradient-to-br from-[#106fb8]/35 to-sky-300/20 blur-[130px]" />
        <div className="absolute -bottom-[20%] -right-[10%] h-[55vh] w-[75vw] rotate-[20deg] rounded-[100%] bg-gradient-to-tl from-sky-400/35 to-[#106fb8]/20 blur-[140px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[90vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/30 blur-[150px]" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6">

        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-[32px] border border-white/80 bg-white/85 p-8 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">

          <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-sky-400 to-[#106fb8]" />

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#106fb8]/10 bg-[#106fb8]/10 text-3xl font-bold text-[#106fb8]">
                MD
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    Maria Dela Cruz
                  </h1>
                  <BadgeCheck className="h-5 w-5 text-[#106fb8]" />
                </div>

                <p className="mt-2 text-sm font-medium text-slate-500">
                  Scheduler • Team Lead • Cybence Operations
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#106fb8]/10 px-3 py-1 text-xs font-semibold text-[#106fb8]">
                    Active
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Available for support
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onBackToDashboard}
                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                Exit
              </button>

              <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>

              <button className="flex items-center gap-2 rounded-2xl bg-[#106fb8] px-4 py-3 font-semibold text-white shadow-md shadow-[#106fb8]/20 transition-all hover:bg-[#0e5ea4] hover:shadow-lg hover:shadow-[#106fb8]/30 hover:-translate-y-0.5 cursor-pointer">
                <Settings className="h-4 w-4" />
                Settings
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">

          {/* Left Column */}
          <div className="space-y-6">

            {/* About */}
            <section className="rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    About Me
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Professional overview and account details
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Verified
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Maria is responsible for organizing schedules, ensuring smooth
                coordination across teams, and maintaining reliable communication
                with clients. She enjoys creating order out of busy workflows and
                helping others stay on track.
              </p>
            </section>

            {/* Contact Information */}
            <section className="rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <h2 className="text-xl font-bold text-slate-900">
                Contact Information
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {profileDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-[#106fb8]/20 hover:bg-white"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Icon className="h-4 w-4 text-[#106fb8]" />
                        {item.label}
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Stats */}
            <section className="rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">
                  Performance Snapshot
                </h2>

                <Sparkles className="h-5 w-5 text-[#106fb8]" />
              </div>

              <div className="mt-5 space-y-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 px-4 py-3"
                  >
                    <span className="text-sm text-slate-500">
                      {stat.label}
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Schedule */}
            <section className="rounded-[32px] border border-white/80 bg-white/85 p-6 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#106fb8]" />
                <h2 className="text-xl font-bold text-slate-900">
                  Upcoming Schedule
                </h2>
              </div>

              <div className="mt-5 space-y-3">
                {schedule.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-start justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-all hover:border-[#106fb8]/20 hover:bg-white"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.day}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.time}
                      </p>
                    </div>

                    <Clock3 className="h-4 w-4 text-slate-400" />
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}