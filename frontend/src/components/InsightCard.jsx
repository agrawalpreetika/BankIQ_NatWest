import React from 'react';

function parseItems(text) {
    if (!text || text === "—") return [];

    // Normalize literal escaped newlines if any
    if (typeof text === 'string') {
        text = text.replace(/\\n/g, '\n');
    }

    // Split by newline or period followed by space
    let items = text.split(/\n|\.\s+/);

    return items
        .map(line => line.replace(/^[\s\-*•\d.]+\s*/, '').replace(/\.$/, '').trim())
        .filter(Boolean);
}

function HighlightText({ text }) {
    if (!text) return null;
    // Regex matches values like $2.8M, +12%, 900K, -5, etc.
    const parts = text.split(/(\$?\d+(?:\.\d+)?[KMBkmb]?%?|[\+\-]\d+(?:\.\d+)?%?)/g);
    return (
        <>
            {parts.map((part, i) => {
                if (/^\$?\d+(?:\.\d+)?[KMBkmb]?%?$|^[\+\-]\d+(?:\.\d+)?%?$/.test(part)) {
                    return <strong key={i} className="font-semibold text-white">{part}</strong>;
                }
                return <span key={i}>{part}</span>;
            })}
        </>
    );
}

function SectionCard({ icon, title, children }) {
    return (
        <div className="rounded-xl border border-white/5 bg-black/20 p-5 transition-colors hover:bg-white/[0.02]">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-sky-400/90">
                <span className="text-sm" aria-hidden>{icon}</span>
                {title}
            </h3>
            {children}
        </div>
    );
}

function SummarySection({ text }) {
    const items = parseItems(text);
    if (!items.length) return <p className="text-sm text-slate-400">—</p>;
    return (
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-sky-400" aria-hidden>•</span>
                    <span className="leading-relaxed"><HighlightText text={item} /></span>
                </li>
            ))}
        </ul>
    );
}

function RootCauseSection({ text }) {
    const items = parseItems(text);
    if (!items.length) return <p className="text-sm text-slate-400">—</p>;
    return (
        <ol className="space-y-3">
            {items.map((item, i) => {
                let title = "";
                let desc = item;
                // Match common dividers to bold the title
                const match = item.match(/^(.*?)(?: - | — |: | – )(.*)$/);
                if (match) {
                    title = match[1];
                    desc = match[2];
                }
                return (
                    <li key={i} className="flex gap-3 text-sm text-slate-300">
                        <span className="font-bold text-sky-400">{i + 1}.</span>
                        <div className="leading-relaxed">
                            {title ? (
                                <>
                                    <strong className="text-white">{title}</strong> — <HighlightText text={desc} />
                                </>
                            ) : (
                                <HighlightText text={item} />
                            )}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}

function RecommendationSection({ text }) {
    const items = parseItems(text);
    if (!items.length) return <p className="text-sm text-slate-400">—</p>;
    return (
        <ul className="space-y-3">
            {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 text-emerald-400" aria-hidden>✓</span>
                    <span className="leading-relaxed"><HighlightText text={item} /></span>
                </li>
            ))}
        </ul>
    );
}

export default function InsightCard({ data }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-xl shadow-black/25 backdrop-blur-sm sm:p-6">
            <div className="mb-6 border-b border-white/5 pb-4">
                <h2 className="text-lg font-semibold text-white">Insight Analysis</h2>
                <p className="mt-1 text-xs text-slate-400">Structured breakdown of your query results</p>
            </div>

            <div className="space-y-4">
                <SectionCard title="Summary">
                    <SummarySection text={data.insights?.summary} />
                </SectionCard>

                <SectionCard title="Why (Root Cause)">
                    <RootCauseSection text={data.insights?.root_cause} />
                </SectionCard>

                <SectionCard title="Recommendation">
                    <RecommendationSection text={data.recommendation} />
                </SectionCard>
            </div>
        </div>
    );
}
