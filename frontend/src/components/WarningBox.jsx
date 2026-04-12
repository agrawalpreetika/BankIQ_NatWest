export default function WarningBox({ warning }) {
    if (!warning) return null;

    return (
        <div
            className="rounded-2xl border border-amber-500/35 bg-amber-950/40 p-5 shadow-lg shadow-amber-900/10 backdrop-blur-sm"
            role="alert"
        >
            <p className="flex items-start gap-2 text-sm font-semibold text-amber-100">
                <span className="text-lg leading-none" aria-hidden>
                    ⚠️
                </span>
                <span>Warning</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-amber-100/90">{warning}</p>
        </div>
    );
}
