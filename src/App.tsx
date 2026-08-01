import { useState } from "react";
import { MessageSquare } from "lucide-react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile_Page";
import Calendar from "./pages/Calendar";
import CommunicationCenter, {
  type AppMessage,
  type AppNotification,
  type AppUser,
} from "./pages/CommunicationCenter";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "login" | "dashboard" | "profile" | "calendar"
  >("login");
  const [isCommOpen, setIsCommOpen] = useState(false);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);
  const currentUser: AppUser = {
    id: "u1",
    name: "Perpaulo Varca",
    role: "Intern",
  };
  const [messages, setMessages] = useState<AppMessage[]>([
    {
      id: "m1",
      senderId: "u2",
      recipientId: "u1",
      type: "message",
      content: "Hey Perpaulo, please review the Cybence scheduler tasks.",
      read: false,
      timestamp: new Date().toISOString(),
    },
    {
      id: "m2",
      senderId: "u4",
      recipientId: "u1",
      type: "remark",
      content: "Great progress on the UI task!",
      read: false,
      timestamp: new Date().toISOString(),
      taskId: "1",
    },
  ]);
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: "n1",
      userId: "u1",
      type: "task",
      title: "New Task Assigned",
      body: "You have been assigned to 'Payment Gateway Implementation'",
      read: false,
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleSendMessage = (recipientId: string, content: string) => {
    setMessages((prev) => [
      {
        id: `m_${Date.now()}`,
        senderId: currentUser.id,
        recipientId,
        type: "message",
        content,
        read: true,
        timestamp: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const handleMarkRead = (id: string) => {
    setMessages((prev) => prev.map((message) =>
      message.id === id ? { ...message, read: true } : message
    ));
    setNotifications((prev) => prev.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadCount =
    messages.filter((message) => message.recipientId === currentUser.id && !message.read).length +
    notifications.filter((notification) => notification.userId === currentUser.id && !notification.read).length;

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
    setIsCommOpen(false);
    setHighlightedTaskId(null);
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
    <div className="app-shell relative min-h-screen">
      <div className="app-quick-actions fixed right-4 top-4 z-60 md:right-6 md:top-6">
        <button
          type="button"
          onClick={() => setIsCommOpen(true)}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50"
          aria-label="Open communication center"
          title="Communication Center"
        >
          <MessageSquare className="h-4 w-4 text-[#106fb8]" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>
        </div>

      {isCommOpen && (
        <CommunicationCenter
          messages={messages}
          notifications={notifications}
          currentUser={currentUser}
          onClose={() => setIsCommOpen(false)}
          onSend={handleSendMessage}
          onMarkRead={handleMarkRead}
        />
      )}

      {renderCurrentPage()}
    </div>
  );
}

export default App;