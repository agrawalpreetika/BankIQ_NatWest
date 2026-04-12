import { useState } from "react";

export default function ChatBox({ onAsk, disabled }) {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (!input.trim() || disabled) return;
        onAsk(input.trim());
        setInput("");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3">
            <label htmlFor="bankiq-query" className="sr-only">
                Ask a question about your data
            </label>
            <input
                id="bankiq-query"
                type="text"
                disabled={disabled}
                className="min-h-[48px] flex-1 rounded-xl border border-white/10 bg-[#0a1424] px-4 py-3 text-[15px] text-white placeholder:text-slate-500 shadow-inner focus:border-sky-500/50 focus:outline-none focus:ring-2 focus:ring-sky-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder='e.g. "Revenue by region" or "Top risks this quarter"'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                autoComplete="off"
            />

            <button
                type="button"
                onClick={handleSubmit}
                disabled={disabled || !input.trim()}
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-900/25 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a1424] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
            >
                Ask BankIQ
            </button>
        </div>
    );
}
