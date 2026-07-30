import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile_Page";
import Calendar from "./pages/Calendar";
import NotificationPanel from "./pages/Notification";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "login" | "dashboard" | "profile" | "calendar"
  >("login");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

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
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isNotificationOpen]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setIsNotificationOpen(false);
  };

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
      return <Dashboard onLogout={handleLogout} />;
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
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => setIsNotificationOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
            aria-label="Open notifications"
          >
            <Bell className="h-4 w-4" />
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 top-14 w-[min(360px,calc(100vw-2rem))]">
              <NotificationPanel
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
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