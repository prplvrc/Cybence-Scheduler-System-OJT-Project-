import { useEffect, useRef, useState } from "react";
import { Bell, Inbox } from "lucide-react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile_Page";
import Calendar from "./pages/Calendar";
import NotificationPanel from "./pages/Notification";
import InboxPanel from "./pages/Inbox";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "login" | "dashboard" | "profile" | "calendar"
  >("login");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
        setIsInboxOpen(false);
      }
    };

    if (isNotificationOpen || isInboxOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotificationOpen, isInboxOpen]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setIsNotificationOpen(false);
    setIsInboxOpen(false);
    setHighlightedTaskId(null);
  };

  const closeDropdowns = () => {
    setIsNotificationOpen(false);
    setIsInboxOpen(false);
  };

  useEffect(() => {
    closeDropdowns();
  }, [currentPage]);

  if (!isLoggedIn) {
    return (
      <Login
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  const renderCurrentPage = () => {
    if (currentPage === "dashboard") {
      return (
        <Dashboard
          onLogout={handleLogout}
          highlightedTaskId={highlightedTaskId}
          onTaskHighlightHandled={() => setHighlightedTaskId(null)}
        />
      );
    }

    if (currentPage === "calendar") {
      return <Calendar />;
    }

    return (
      <ProfilePage
        onBackToDashboard={() => setCurrentPage("dashboard")}
      />
    );
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="fixed right-4 top-4 z-[60] md:right-6 md:top-6">
        <div className="relative flex items-center gap-2" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              setIsInboxOpen((prev) => !prev);
              setIsNotificationOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
            aria-label="Open inbox"
          >
            <Inbox className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => {
              setIsNotificationOpen((prev) => !prev);
              setIsInboxOpen(false);
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          {isInboxOpen && (
            <div className="absolute right-0 top-14 w-[min(360px,calc(100vw-2rem))]">
              <InboxPanel
                isOpen={isInboxOpen}
                onClose={() => setIsInboxOpen(false)}
                onSelectInboxItem={(taskId) => {
                  setHighlightedTaskId(taskId);
                  setCurrentPage("dashboard");
                  setIsNotificationOpen(false);
                  setIsInboxOpen(false);
                }}
              />
            </div>
          )}

          {isNotificationOpen && (
            <div className="absolute right-0 top-14 w-[min(360px,calc(100vw-2rem))]">
              <NotificationPanel
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                onSelectNotification={(taskId) => {
                  setHighlightedTaskId(taskId);
                  setCurrentPage("dashboard");
                  setIsNotificationOpen(false);
                  setIsInboxOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </div>

      {renderCurrentPage()}
    </div>
  );
}

export default App;