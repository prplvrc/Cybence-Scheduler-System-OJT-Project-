import { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile_Page";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<"login" | "dashboard" | "profile">("login");

  if (!isLoggedIn && currentPage === "login") {
    return <Login onLoginSuccess={() => {
      setIsLoggedIn(true);
      setCurrentPage("dashboard");
    }} />;
  }

  if (currentPage === "dashboard") {
    return <Dashboard onOpenProfile={() => setCurrentPage("profile")} />;
  }

  return <ProfilePage onBackToDashboard={() => setCurrentPage("dashboard")} />;
}

export default App;