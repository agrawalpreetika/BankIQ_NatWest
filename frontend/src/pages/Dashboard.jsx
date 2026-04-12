import { useState } from "react";
import ThemeBackground from "../components/ThemeBackground";
import ChatBox from "../components/ChatBox";
import InsightCard from "../components/InsightCard";
import ChartView from "../components/ChartView";
import WarningBox from "../components/WarningBox";
import { askQuery } from "../services/api";

const NAV = [
    { id: "dash", label: "Dashboard", icon: IconDashboard },
    { id: "transfer", label: "Transfer", icon: IconTransfer },
    { id: "tx", label: "Transactions", icon: IconTx },
    { id: "accounts", label: "Accounts & Cards", icon: IconCards },
    { id: "inv", label: "Investments", icon: IconChart },
];

const MOCK_TX = [
    { id: 1, name: "Salary deposit", date: "Today", amount: 2400, positive: true },
    { id: 2, name: "Coffee Lab", date: "Yesterday", amount: -4.5, positive: false },
    { id: 3, name: "Rent", date: "12 Apr", amount: -1200, positive: false },
    { id: 4, name: "Transfer — savings", date: "10 Apr", amount: 500, positive: true },
    { id: 5, name: "Transport", date: "09 Apr", amount: -32, positive: false },
];

const SPENDING = [
    { label: "Food", pct: 72, color: "bg-sky-400" },
    { label: "Rent", pct: 100, color: "bg-violet-400" },
    { label: "Transport", pct: 45, color: "bg-amber-400" },
    { label: "Utilities", pct: 58, color: "bg-emerald-400" },
];

const QUICK_CONTACTS = [
    "from-sky-400 to-blue-600",
    "from-violet-400 to-fuchsia-500",
    "from-emerald-400 to-teal-600",
    "from-amber-400 to-orange-500",
];

const PAGE_TITLES = {
    dash: { title: "Dashboard", subtitle: "Overview · BankIQ workspace" },
    transfer: { title: "Transfer", subtitle: "Send money between accounts or contacts" },
    tx: { title: "Transactions", subtitle: "Activity and history" },
    accounts: { title: "Accounts & Cards", subtitle: "Balances, cards, and details" },
    inv: { title: "Investments", subtitle: "Holdings and performance" },
    settings: { title: "Settings", subtitle: "Preferences and security" },
    logout: { title: "Sign out", subtitle: "Session" },
};

export default function Dashboard() {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [txTab, setTxTab] = useState("recent");
    const [activeNav, setActiveNav] = useState("dash");

    const handleAsk = async (query) => {
        setLoading(true);
        const res = await askQuery(query);
        setResponse(res);
        setLoading(false);
    };

    const goNav = (id) => {
        setActiveNav(id);
        setSidebarOpen(false);
    };

    const pageMeta = PAGE_TITLES[activeNav] ?? PAGE_TITLES.dash;

    return (
        <div className="relative flex min-h-[calc(100vh-57px)] overflow-hidden bg-[#070b14] font-sans text-slate-200">
            <ThemeBackground />

            {/* Mobile overlay */}
            {sidebarOpen && (
                <button
                    type="button"
                    className="fixed inset-0 z-40 bg-black/60 md:hidden"
                    aria-label="Close menu"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-[#040a14]/95 shadow-2xl backdrop-blur-md transition-transform duration-200 md:static md:z-0 md:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                }`}
            >
                <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-700 text-lg shadow-lg">
                        🏦
                    </span>
                    <div>
                        <p className="text-sm font-bold text-white">BankIQ</p>
                        <p className="text-[11px] text-slate-500">NatWest intelligence</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Dashboard">
                    {NAV.map((item) => {
                        const Icon = item.icon;
                        const active = item.id === activeNav;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => goNav(item.id)}
                                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                                    active
                                        ? "bg-white/10 text-white shadow-inner"
                                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                                }`}
                            >
                                <Icon className="h-5 w-5 shrink-0 opacity-90" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="space-y-1 border-t border-white/10 px-3 py-4">
                    <button
                        type="button"
                        onClick={() => goNav("settings")}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-white/5 ${
                            activeNav === "settings"
                                ? "bg-white/10 text-white"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        <IconSettings className="h-5 w-5" />
                        Settings
                    </button>
                    <button
                        type="button"
                        onClick={() => goNav("logout")}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-red-500/10 ${
                            activeNav === "logout"
                                ? "bg-red-500/15 text-red-200"
                                : "text-slate-400 hover:text-red-300"
                        }`}
                    >
                        <IconLogout className="h-5 w-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col overflow-y-auto">
                <div className="mx-auto w-full max-w-[1400px] flex-1 space-y-5 p-4 sm:p-5 lg:p-6">
                    {/* Top bar */}
                    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
                                onClick={() => setSidebarOpen(true)}
                                aria-label="Open menu"
                            >
                                <IconMenu className="h-5 w-5" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    {pageMeta.title}
                                </h1>
                                <p className="text-sm text-slate-500">{pageMeta.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <button
                                type="button"
                                className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                aria-label="Notifications"
                            >
                                <IconBell className="h-5 w-5" />
                                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sky-400 ring-2 ring-[#070b14]" />
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-2 transition hover:bg-white/10"
                            >
                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 text-sm font-semibold text-white">
                                    You
                                </span>
                                <IconChevron className="h-4 w-4 text-slate-500" />
                            </button>
                        </div>
                    </header>

                    {activeNav === "dash" && (
                        <>
                            {/* Query */}
                            <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/20 backdrop-blur-sm sm:p-5">
                                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Ask BankIQ
                                </h2>
                                <ChatBox onAsk={handleAsk} disabled={loading} />
                            </section>

                            {loading && (
                        <div
                            className="flex items-center gap-4 rounded-2xl border border-sky-500/20 bg-sky-950/30 px-5 py-4"
                            role="status"
                            aria-live="polite"
                        >
                            <span className="relative flex h-10 w-10 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/40 opacity-75" />
                                <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-blue-700 text-sm font-bold text-white">
                                    IQ
                                </span>
                            </span>
                            <div>
                                <p className="font-medium text-white">Working on your answer…</p>
                                <p className="text-sm text-slate-400">
                                    Retrieving insights and building visuals.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Metrics */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <MetricCard
                            title="Total balance"
                            value="USD 10,000.00"
                            trend="+2.4%"
                            trendUp
                            sub="vs last month"
                        />
                        <MetricCard
                            title="Total savings"
                            value="USD 5,000.00"
                            spark
                            sub="Goal on track"
                        />
                    </div>

                    {/* Chart + transactions */}
                    <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
                        <div className="flex flex-col lg:col-span-8">
                            <div className="flex min-h-[320px] flex-1 flex-col rounded-2xl border border-white/10 bg-[#030712]/80 p-4 shadow-xl shadow-black/30 backdrop-blur-sm sm:p-5">
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            Insights chart
                                        </h2>
                                        <p className="text-xs text-slate-500">
                                            From your latest BankIQ response
                                        </p>
                                    </div>
                                    <select
                                        className="rounded-lg border border-white/10 bg-[#0a1424] px-3 py-2 text-xs font-medium text-slate-300 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/40"
                                        defaultValue="7d"
                                        aria-label="Time range"
                                    >
                                        <option value="7d">Last 7 days</option>
                                        <option value="30d">Last 30 days</option>
                                        <option value="90d">Last 90 days</option>
                                    </select>
                                </div>
                                <div
                                    className={`min-h-0 flex-1 transition-opacity ${loading ? "opacity-50" : "opacity-100"}`}
                                >
                                    <ChartView chart={response?.chart} embedded />
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="flex h-full min-h-[320px] flex-col rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-sm">
                                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                    <h2 className="text-sm font-semibold text-white">
                                        Transactions
                                    </h2>
                                    <div className="flex rounded-lg bg-black/30 p-0.5 text-[11px] font-medium">
                                        <button
                                            type="button"
                                            onClick={() => setTxTab("recent")}
                                            className={`rounded-md px-2 py-1 ${
                                                txTab === "recent"
                                                    ? "bg-white/15 text-white"
                                                    : "text-slate-500 hover:text-slate-300"
                                            }`}
                                        >
                                            Recent
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTxTab("all")}
                                            className={`rounded-md px-2 py-1 ${
                                                txTab === "all"
                                                    ? "bg-white/15 text-white"
                                                    : "text-slate-500 hover:text-slate-300"
                                            }`}
                                        >
                                            All
                                        </button>
                                    </div>
                                </div>
                                <ul className="flex-1 space-y-0 overflow-y-auto px-2 py-2">
                                    {MOCK_TX.map((t) => (
                                        <li
                                            key={t.id}
                                            className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-white/[0.04]"
                                        >
                                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-slate-300">
                                                {t.name.slice(0, 1)}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-white">
                                                    {t.name}
                                                </p>
                                                <p className="text-xs text-slate-500">{t.date}</p>
                                            </div>
                                            <p
                                                className={`shrink-0 text-sm font-semibold tabular-nums ${
                                                    t.positive ? "text-emerald-400" : "text-slate-200"
                                                }`}
                                            >
                                                {t.amount > 0 ? "+" : ""}
                                                {t.amount.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Insight + warning */}
                    {response && (
                        <div
                            className={`space-y-4 transition-opacity ${loading ? "opacity-60" : "opacity-100"}`}
                        >
                            <InsightCard data={response} />
                            <WarningBox warning={response.warning} />
                        </div>
                    )}

                    {/* Bottom widgets */}
                    <div className="grid gap-4 pb-4 md:grid-cols-3">
                        <div className="rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-950/50 to-[#0a0f1c] p-5 shadow-lg">
                            <h3 className="text-sm font-semibold text-white">Goals</h3>
                            <p className="mt-1 text-xs text-violet-200/70">Savings target</p>
                            <div className="mt-4">
                                <div className="h-2.5 overflow-hidden rounded-full bg-black/40">
                                    <div
                                        className="h-full w-[60%] rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500"
                                        aria-hidden
                                    />
                                </div>
                                <p className="mt-2 text-sm font-semibold text-white">60% reached</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-orange-500/25 bg-gradient-to-br from-orange-950/40 to-[#0a0f1c] p-5 shadow-lg">
                            <h3 className="text-sm font-semibold text-white">Spending overview</h3>
                            <p className="mt-1 text-xs text-orange-200/70">By category</p>
                            <ul className="mt-4 space-y-3">
                                {SPENDING.map((s) => (
                                    <li key={s.label}>
                                        <div className="mb-1 flex justify-between text-xs">
                                            <span className="text-slate-400">{s.label}</span>
                                            <span className="text-slate-300">{s.pct}%</span>
                                        </div>
                                        <div className="h-1.5 overflow-hidden rounded-full bg-black/40">
                                            <div
                                                className={`h-full rounded-full ${s.color}`}
                                                style={{ width: `${s.pct}%` }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-[#030712]/90 p-5 shadow-xl">
                            <h3 className="text-sm font-semibold text-white">Quick transfer</h3>
                            <p className="mt-1 text-xs text-slate-500">Frequent contacts</p>
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {QUICK_CONTACTS.map((g, i) => (
                                    <span
                                        key={i}
                                        className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${g} text-sm font-bold text-white shadow-lg ring-2 ring-[#070b14]`}
                                    >
                                        {String.fromCharCode(65 + i)}
                                    </span>
                                ))}
                                <button
                                    type="button"
                                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/20 text-xl text-slate-500 transition hover:border-sky-400/50 hover:text-sky-300"
                                    aria-label="Add contact"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                        </>
                    )}

                    {activeNav === "transfer" && (
                        <TransferSection onBack={() => goNav("dash")} />
                    )}
                    {activeNav === "tx" && (
                        <TransactionsSection txTab={txTab} setTxTab={setTxTab} />
                    )}
                    {activeNav === "accounts" && <AccountsSection />}
                    {activeNav === "inv" && <InvestmentsSection />}
                    {activeNav === "settings" && <SettingsSection />}
                    {activeNav === "logout" && <LogoutSection onStay={() => goNav("dash")} />}
                </div>
            </div>
        </div>
    );
}

function TransferSection({ onBack }) {
    const [sent, setSent] = useState(false);
    return (
        <div className="space-y-5">
            <button
                type="button"
                onClick={onBack}
                className="text-sm font-medium text-sky-400 hover:text-sky-300"
            >
                ← Back to overview
            </button>
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                    <h2 className="text-lg font-semibold text-white">New transfer</h2>
                    <p className="mt-1 text-sm text-slate-500">Demo — no funds are moved.</p>
                    <form
                        className="mt-6 space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setSent(true);
                        }}
                    >
                        <label className="block text-sm">
                            <span className="text-slate-400">From</span>
                            <select className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0a1424] px-3 py-2.5 text-white focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/40">
                                <option>Current account ·••• 8891</option>
                                <option>Savings ·••• 1024</option>
                            </select>
                        </label>
                        <label className="block text-sm">
                            <span className="text-slate-400">To</span>
                            <input
                                type="text"
                                required
                                placeholder="Name or account"
                                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0a1424] px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/40"
                            />
                        </label>
                        <label className="block text-sm">
                            <span className="text-slate-400">Amount (USD)</span>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                required
                                placeholder="0.00"
                                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0a1424] px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/40"
                            />
                        </label>
                        <label className="block text-sm">
                            <span className="text-slate-400">Reference</span>
                            <input
                                type="text"
                                placeholder="Optional"
                                className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0a1424] px-3 py-2.5 text-white placeholder:text-slate-600 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/40"
                            />
                        </label>
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                        >
                            Review & send
                        </button>
                    </form>
                    {sent && (
                        <p className="mt-4 rounded-lg border border-emerald-500/30 bg-emerald-950/40 px-3 py-2 text-sm text-emerald-200">
                            Transfer queued (demo). No payment was sent.
                        </p>
                    )}
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#030712]/90 p-6 shadow-xl">
                    <h3 className="text-sm font-semibold text-white">Quick transfer</h3>
                    <p className="mt-1 text-xs text-slate-500">Frequent contacts</p>
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                        {QUICK_CONTACTS.map((g, i) => (
                            <span
                                key={i}
                                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${g} text-sm font-bold text-white shadow-lg ring-2 ring-[#070b14]`}
                            >
                                {String.fromCharCode(65 + i)}
                            </span>
                        ))}
                        <button
                            type="button"
                            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-white/20 text-xl text-slate-500 transition hover:border-sky-400/50 hover:text-sky-300"
                            aria-label="Add contact"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TransactionsSection({ txTab, setTxTab }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] shadow-xl backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-5">
                <h2 className="text-sm font-semibold text-white">All activity</h2>
                <div className="flex rounded-lg bg-black/30 p-0.5 text-[11px] font-medium">
                    <button
                        type="button"
                        onClick={() => setTxTab("recent")}
                        className={`rounded-md px-2 py-1 ${
                            txTab === "recent"
                                ? "bg-white/15 text-white"
                                : "text-slate-500 hover:text-slate-300"
                        }`}
                    >
                        Recent
                    </button>
                    <button
                        type="button"
                        onClick={() => setTxTab("all")}
                        className={`rounded-md px-2 py-1 ${
                            txTab === "all"
                                ? "bg-white/15 text-white"
                                : "text-slate-500 hover:text-slate-300"
                        }`}
                    >
                        All
                    </button>
                </div>
            </div>
            <ul className="divide-y divide-white/5 px-2 py-2 sm:px-4">
                {MOCK_TX.map((t) => (
                    <li
                        key={t.id}
                        className="flex items-center gap-3 px-2 py-3 hover:bg-white/[0.03]"
                    >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-slate-300">
                            {t.name.slice(0, 1)}
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">{t.name}</p>
                            <p className="text-xs text-slate-500">{t.date}</p>
                        </div>
                        <p
                            className={`shrink-0 text-sm font-semibold tabular-nums ${
                                t.positive ? "text-emerald-400" : "text-slate-200"
                            }`}
                        >
                            {t.amount > 0 ? "+" : ""}
                            {t.amount.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                            })}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function AccountsSection() {
    const cards = [
        {
            name: "Current account",
            mask: "•••• 8891",
            bal: "USD 6,240.12",
            tint: "from-sky-600/30 to-blue-900/40",
        },
        {
            name: "Savings",
            mask: "•••• 1024",
            bal: "USD 5,000.00",
            tint: "from-violet-600/30 to-slate-900/40",
        },
        {
            name: "World Mastercard",
            mask: "•••• 4402",
            bal: "USD 1,120.88 due",
            tint: "from-slate-700/50 to-slate-900/60",
        },
    ];
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((c) => (
                <div
                    key={c.name}
                    className={`rounded-2xl border border-white/10 bg-gradient-to-br ${c.tint} p-5 shadow-lg`}
                >
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        {c.name}
                    </p>
                    <p className="mt-2 font-mono text-sm text-slate-300">{c.mask}</p>
                    <p className="mt-4 text-xl font-bold text-white">{c.bal}</p>
                    <button
                        type="button"
                        className="mt-4 text-sm font-medium text-sky-400 hover:text-sky-300"
                    >
                        View details
                    </button>
                </div>
            ))}
        </div>
    );
}

function InvestmentsSection() {
    const rows = [
        { name: "Global Equity Fund", val: "USD 12,400", ch: "+3.2%" },
        { name: "Bond allocation", val: "USD 4,200", ch: "+0.4%" },
        { name: "Cash / MMF", val: "USD 1,800", ch: "—" },
    ];
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <p className="text-sm text-slate-500">Demo holdings</p>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                    <thead>
                        <tr className="border-b border-white/10 text-xs uppercase text-slate-500">
                            <th className="pb-3 pr-4 font-medium">Holding</th>
                            <th className="pb-3 pr-4 font-medium">Value</th>
                            <th className="pb-3 font-medium">Change</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-300">
                        {rows.map((r) => (
                            <tr key={r.name} className="border-b border-white/5">
                                <td className="py-3 pr-4 font-medium text-white">{r.name}</td>
                                <td className="py-3 pr-4 tabular-nums">{r.val}</td>
                                <td className="py-3 text-emerald-400/90">{r.ch}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SettingsSection() {
    const [notif, setNotif] = useState(true);
    const [compact, setCompact] = useState(false);
    return (
        <div className="max-w-xl space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <ToggleRow
                label="Email notifications"
                description="Statements and alerts"
                on={notif}
                onChange={setNotif}
            />
            <ToggleRow
                label="Compact dashboard"
                description="Tighter spacing on large screens"
                on={compact}
                onChange={setCompact}
            />
            <p className="text-xs text-slate-500">
                Preferences are stored for this session only (demo).
            </p>
        </div>
    );
}

function ToggleRow({ label, description, on, onChange }) {
    return (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-[#0a1424]/80 px-4 py-3">
            <div>
                <p className="font-medium text-white">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => onChange(!on)}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    on ? "bg-sky-600" : "bg-slate-700"
                }`}
            >
                <span
                    className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                        on ? "left-6" : "left-1"
                    }`}
                />
            </button>
        </div>
    );
}

function LogoutSection({ onStay }) {
    return (
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-[#0a1424]/80 p-8 text-center shadow-xl">
            <p className="text-lg font-semibold text-white">Sign out of BankIQ?</p>
            <p className="mt-2 text-sm text-slate-400">
                This demo does not use a real session. You can return to the dashboard anytime.
            </p>
            <button
                type="button"
                onClick={onStay}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
                Back to dashboard
            </button>
        </div>
    );
}

function MetricCard({ title, value, trend, trendUp, sub, spark }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-lg backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{title}</p>
            <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
                <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl">{value}</p>
                {trend && (
                    <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                            trendUp
                                ? "bg-emerald-500/15 text-emerald-400"
                                : "bg-red-500/15 text-red-400"
                        }`}
                    >
                        <span aria-hidden>{trendUp ? "↑" : "↓"}</span>
                        {trend}
                    </span>
                )}
            </div>
            {spark && (
                <div className="mt-4 flex h-10 items-end gap-1">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                        <span
                            key={i}
                            className="w-2 rounded-sm bg-gradient-to-t from-sky-600 to-cyan-400 opacity-90"
                            style={{ height: `${h}%` }}
                        />
                    ))}
                </div>
            )}
            {sub && <p className="mt-2 text-xs text-slate-500">{sub}</p>}
        </div>
    );
}

function IconDashboard({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                d="M4 13h6V4H4v9zm10 7h6V11h-6v9zM4 22h6v-5H4v5zm10-9h6V4h-6v9z"
            />
        </svg>
    );
}

function IconTransfer({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
            />
        </svg>
    );
}

function IconTx({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5h10M9 12h10M9 19h10M4 5h.01M4 12h.01M4 19h.01"
            />
        </svg>
    );
}

function IconCards({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M6 6h12a3 3 0 013 3v8a3 3 0 01-3 3H6a3 3 0 01-3-3V9a3 3 0 013-3z"
            />
        </svg>
    );
}

function IconChart({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 19V5m0 14l4-6 4 2 4-8 4 6"
            />
        </svg>
    );
}

function IconSettings({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
        </svg>
    );
}

function IconLogout({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
        </svg>
    );
}

function IconBell({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
        </svg>
    );
}

function IconChevron({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

function IconMenu({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeWidth={2} strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}
