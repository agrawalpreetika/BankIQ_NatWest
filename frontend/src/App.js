import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

function App() {
    const [page, setPage] = useState("home");

    const goToSection = (sectionId) => {
        setPage("home");
        setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 80);
    };

    return (
        <div className="min-h-screen bg-[#061222]">
            <Navbar currentPage={page} onNavigate={setPage} onGoToSection={goToSection} />
            {page === "home" ? (
                <Home onOpenDashboard={() => setPage("dashboard")} />
            ) : (
                <Dashboard />
            )}
        </div>
    );
}

export default App;
