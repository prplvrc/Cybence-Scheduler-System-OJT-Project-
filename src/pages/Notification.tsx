import { BellRing, AlertCircle, Clock, CalendarDays, CheckCheck, Sparkles } from "lucide-react";
import { generateNotifications } from "../utils/notificationGenerator";

type NotificationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectNotification?: (taskId: number | null) => void;
};

const getIconComponent = (iconType: string) => {
  switch (iconType) {
    case "alert":
      return <AlertCircle className="h-4 w-4" />;
    case "clock":
      return <Clock className="h-4 w-4" />;
    case "calendar":
      return <CalendarDays className="h-4 w-4" />;
    case "check":
      return <CheckCheck className="h-4 w-4" />;
    case "sparkles":
      return <Sparkles className="h-4 w-4" />;
    case "bell":
    default:
      return <BellRing className="h-4 w-4" />;
  }
};

export default function NotificationPanel({ isOpen, onClose, onSelectNotification }: NotificationPanelProps) {
  const notifications = generateNotifications();
  if (!isOpen) return null;

  return (
    <div className="w-[360px] overflow-hidden rounded-[24px] border border-slate-200/80 bg-white/95 shadow-[0_22px_60px_rgba(15,23,42,0.16)] backdrop-blur-xl">
      <div className="border-b border-slate-100 bg-gradient-to-r from-[#106fb8]/10 to-sky-50 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
            <p className="text-xs text-slate-500">
              You have {notifications.length} update{notifications.length !== 1 ? "s" : ""} today
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-slate-700"
            aria-label="Close notifications"
          >
            <BellRing className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="max-h-[360px] overflow-y-auto p-2">
        {notifications.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              onSelectNotification?.(item.taskId ?? null);
              onClose();
            }}
            className="flex w-full items-start gap-3 rounded-2xl border border-transparent px-3 py-3 text-left transition hover:border-slate-200 hover:bg-slate-50"
          >
            <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ${item.unread ? "bg-[#106fb8]/10 text-[#106fb8]" : "bg-slate-100 text-slate-600"}`}>
              {getIconComponent(item.iconType)}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                {item.unread ? (
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#106fb8]" />
                ) : null}
              </div>
              <p className="mt-1 text-sm text-slate-600">{item.message}</p>
              <p className="mt-1 text-xs font-medium text-slate-400">{item.time}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="border-t border-slate-100 px-4 py-3">
        <button className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
          View all notifications
        </button>
      </div>
    </div>
  );
}
