import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile_Page";
import Calendar from "./pages/Calendar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "login" | "dashboard" | "profile" | "calendar"
  >("login");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage("login");
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
}

export default App;