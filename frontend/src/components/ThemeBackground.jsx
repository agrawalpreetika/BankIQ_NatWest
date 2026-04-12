/** Same mesh + dot grid as the landing page for visual consistency */
export default function ThemeBackground() {
    return (
        <>
            <div
                className="pointer-events-none absolute inset-0 bg-dot-grid opacity-90"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#071229] via-[#120a28] to-[#050814]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[100px]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute -right-32 top-24 h-[380px] w-[380px] rounded-full bg-violet-600/25 blur-[90px]"
                aria-hidden
            />
            <div
                className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"
                aria-hidden
            />
        </>
    );
}
