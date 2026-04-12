export default function Navbar({ currentPage, onNavigate, onGoToSection }) {
    const link =
        "px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200";
    const active = "bg-white/10 text-white";
    const inactive = "text-slate-300 hover:text-white hover:bg-white/5";

    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071525]/80 backdrop-blur-md">
            <nav
                className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
                aria-label="Main"
            >
                <button
                    type="button"
                    onClick={() => onNavigate("home")}
                    className="flex items-center gap-2 text-left text-white transition hover:opacity-90"
                >
                    <span
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 text-lg shadow-lg shadow-blue-900/40"
                        aria-hidden
                    >
                        🏦
                    </span>
                    <span className="font-semibold tracking-tight">BankIQ</span>
                </button>

                <div className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
                    <button
                        type="button"
                        onClick={() => onNavigate("home")}
                        className={`${link} ${currentPage === "home" ? active : inactive}`}
                    >
                        Home
                    </button>
                    <button
                        type="button"
                        onClick={() => onNavigate("dashboard")}
                        className={`${link} ${currentPage === "dashboard" ? active : inactive}`}
                    >
                        Dashboard
                    </button>
                    <button
                        type="button"
                        onClick={() => onGoToSection?.("features")}
                        className={`${link} ${inactive}`}
                    >
                        Features
                    </button>
                    <button
                        type="button"
                        onClick={() => onGoToSection?.("contact")}
                        className={`${link} ${inactive}`}
                    >
                        Contact
                    </button>
                </div>
            </nav>
        </header>
    );
}
