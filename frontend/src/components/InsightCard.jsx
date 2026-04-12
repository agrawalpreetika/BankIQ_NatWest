function Section({ icon, title, children }) {
    return (
        <div className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
            <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-sky-200/95">
                <span className="text-base" aria-hidden>
                    {icon}
                </span>
                {title}
            </h3>
            <div className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-[15px]">
                {children}
            </div>
        </div>
    );
}

export default function InsightCard({ data }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/25 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-white">Insight</h2>
            <p className="mt-1 text-xs text-slate-500">Structured response from your query</p>

            <div className="mt-6 space-y-6">
                <Section icon="💬" title="Summary">
                    {data.insights?.summary ?? "—"}
                </Section>
                <Section icon="📊" title="Why">
                    {data.insights?.root_cause ?? "—"}
                </Section>
                <Section icon="💡" title="Recommendation">
                    {data.recommendation ?? "—"}
                </Section>
            </div>
        </div>
    );
}
