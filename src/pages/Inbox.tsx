import { useState } from "react";
import { ArrowUpRight, Mail, MessageCircleMore, Sparkles } from "lucide-react";

type InboxPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectInboxItem?: (taskId: number | null) => void;
};

type InboxThread = {
  id: number;
  staffName: string;
  role: string;
  avatar: string;
  accent: string;
  message: string;
  time: string;
  unread?: boolean;
  taskId: number;
  taskTitle: string;
  taskStatus: string;
};

const inboxThreads: InboxThread[] = [
  {
    id: 1,
    staffName: "Perpaulo",
    role: "Intern",
    avatar: "PV",
    accent: "from-sky-500 to-[#106fb8]",
    message: "Assigned the scheduler system update and wants a quick review.",
    time: "10 min ago",
    unread: true,
    taskId: 1,
    taskTitle: "SCHEDULER SYSTEM FOR CYBENCE IT SOLUTIONS",
    taskStatus: "Pending",
  },
  {
    id: 2,
    staffName: "Daniel",
    role: "Developer",
    avatar: "DA",
    accent: "from-violet-500 to-indigo-500",
    message: "Sent the UI implementation notes for the client app.",
    time: "1 hr ago",
    taskId: 3,
    taskTitle: "DESIGN AND IMPLEMENTATION OF A NEW USER INTERFACE FOR XYZ APPLICATION",
    taskStatus: "To Do",
  },
  {
    id: 3,
    staffName: "Mae",
    role: "Designer",
    avatar: "ML",
    accent: "from-emerald-500 to-teal-500",
    message: "Shared the wireframes for the mobile commerce workflow.",
    time: "3 hrs ago",
    taskId: 4,
    taskTitle: "DEVELOPMENT OF A MOBILE APPLICATION FOR E-COMMERCE PLATFORM",
    taskStatus: "To Do",
  },
  {
    id: 4,
    staffName: "Janina",
    role: "Manager",
    avatar: "JN",
    accent: "from-amber-500 to-orange-500",
    message: "Needs the payment gateway milestone checked before stand-up.",
    time: "Yesterday",
    taskId: 5,
    taskTitle: "IMPLEMENTATION OF A NEW PAYMENT GATEWAY FOR ABCD COMPANY",
    taskStatus: "Ongoing",
  },
];

export default function InboxPanel({ isOpen, onClose, onSelectInboxItem }: InboxPanelProps) {
  const [activeThreadId, setActiveThreadId] = useState(inboxThreads[0].id);

  if (!isOpen) return null;

  const activeThread = inboxThreads.find((thread) => thread.id === activeThreadId) ?? inboxThreads[0];

  return (
    <div className="w-[min(760px,calc(100vw-2rem))] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/95 shadow-[0_22px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#106fb8]/12 via-sky-50 to-white px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Inbox</h3>
            <p className="text-xs text-slate-500">
              {inboxThreads.filter((thread) => thread.unread).length} unread chat
              {inboxThreads.filter((thread) => thread.unread).length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-700"
            aria-label="Close inbox"
          >
            <Mail className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex max-h-[460px] flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-100 bg-slate-50/70 p-3 lg:w-[240px] lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center gap-2 px-2">
            <MessageCircleMore className="h-4 w-4 text-[#106fb8]" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Staff chat</p>
          </div>

          <div className="space-y-2">
            {inboxThreads.map((thread) => (
              <button
                key={thread.id}
                type="button"
                onClick={() => setActiveThreadId(thread.id)}
                className={`flex w-full items-start gap-3 rounded-2xl border px-3 py-3 text-left transition ${
                  activeThreadId === thread.id
                    ? "border-[#106fb8]/20 bg-white shadow-sm"
                    : "border-transparent bg-transparent hover:border-slate-200 hover:bg-white"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${thread.accent} text-sm font-semibold text-white`}>
                  {thread.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">{thread.staffName}</p>
                    {thread.unread ? <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#106fb8]" /> : null}
                  </div>
                  <p className="text-xs text-slate-500">{thread.role}</p>
                  <p className="mt-1 truncate text-sm text-slate-600">{thread.message}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <section className="flex-1 bg-[radial-gradient(circle_at_top_left,_rgba(16,111,184,0.08),_transparent_45%)]">
          <div className="border-b border-slate-100 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{activeThread.staffName}</p>
                <p className="text-xs text-slate-500">{activeThread.role} • {activeThread.time}</p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                <Sparkles className="h-3.5 w-3.5 text-[#106fb8]" />
                Team update
              </div>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto p-4">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">Task update</p>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#106fb8]">
                  {activeThread.taskStatus}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{activeThread.taskTitle}</p>
              <button
                type="button"
                onClick={() => {
                  onSelectInboxItem?.(activeThread.taskId ?? null);
                  onClose();
                }}
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#106fb8] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[#0d5ea2]"
              >
                Open task in board
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-800">{activeThread.staffName}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                “{activeThread.message}”
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
