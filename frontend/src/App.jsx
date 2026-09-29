import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./Dashboard";

function App() {
    const [page, setPage] = useState(
        localStorage.getItem("auditTrailAuth") === "true"
            ? "dashboard"
            : "landing"
    );

    const handleLogin = () => {
        localStorage.setItem("auditTrailAuth", "true");
        setPage("dashboard");
    };

    const handleLogout = () => {
        localStorage.removeItem("auditTrailAuth");
        setPage("landing");
    };

    if (page === "landing") {
        return <LandingPage onLogin={() => setPage("login")} />;
    }

    if (page === "login") {
        return (
            <LoginPage
                onLogin={handleLogin}
                onBack={() => setPage("landing")}
            />
        );
    }

    return <Dashboard onLogout={handleLogout} />;
}

export default App;