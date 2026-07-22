import { BadgeCheck, Briefcase, CalendarDays, Clock3, Edit3, Mail, MapPin, Phone, Settings, ShieldCheck, Sparkles } from "lucide-react";

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

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 p-6 text-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-3xl font-bold shadow-lg backdrop-blur">
                MD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-semibold sm:text-3xl">Maria Dela Cruz</h1>
                  <BadgeCheck className="h-5 w-5 text-sky-200" />
                </div>
                <p className="mt-1 text-sm text-sky-100 sm:text-base">Scheduler • Team Lead • Cybence Operations</p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-sky-100">
                  <span className="rounded-full bg-white/15 px-3 py-1">Active</span>
                  <span className="rounded-full bg-white/15 px-3 py-1">Available for support</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2.5 font-medium transition hover:bg-white/25">
                <Edit3 className="h-4 w-4" /> Edit Profile
              </button>
              <button className="flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-medium text-sky-700 transition hover:bg-sky-50">
                <Settings className="h-4 w-4" /> Settings
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-6">
            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">About Me</h2>
                  <p className="mt-1 text-sm text-slate-500">Professional overview and account details</p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  <ShieldCheck className="h-4 w-4" /> Verified
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                Maria is responsible for organizing schedules, ensuring smooth coordination across teams,
                and maintaining reliable communication with clients. She enjoys creating order out of busy
                workflows and helping others stay on track.
              </p>
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Contact Information</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {profileDetails.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Icon className="h-4 w-4 text-sky-600" /> {item.label}
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">Performance Snapshot</h2>
                <Sparkles className="h-5 w-5 text-sky-600" />
              </div>
              <div className="mt-5 grid gap-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-500">{stat.label}</span>
                    <span className="text-lg font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-sky-600" />
                <h2 className="text-xl font-semibold text-slate-900">Upcoming Schedule</h2>
              </div>
              <div className="mt-5 space-y-3">
                {schedule.map((item) => (
                  <div key={item.day} className="flex items-start justify-between rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{item.day}</p>
                      <p className="mt-1 text-sm text-slate-500">{item.time}</p>
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
