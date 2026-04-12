import { useState } from "react";
import ThemeBackground from "../components/ThemeBackground";

function ArrowUpRight({ className }) {
    return (
        <svg
            className={className}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
        >
            <path
                d="M7 17L17 7M17 7H10M17 7V14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function BrandMark({ label }) {
    return (
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
            {label}
        </span>
    );
}

function FloatingCard({
    className,
    gradient,
    name,
    number,
    exp,
    brand,
    animationClass,
    cardStyle,
}) {
    return (
        <div className={`pointer-events-none select-none ${animationClass} ${className}`}>
            <div
                className={`relative h-36 w-56 overflow-hidden rounded-2xl border border-white/15 p-4 text-white shadow-[0_28px_60px_-12px_rgba(0,0,0,0.65)] sm:h-40 sm:w-64 ${gradient}`}
                style={cardStyle}
            >
                <div className="flex items-start justify-between">
                    <div className="h-8 w-10 rounded-md bg-white/20 shadow-inner" />
                    <BrandMark label={brand} />
                </div>
                <p className="mt-6 font-mono text-sm tracking-[0.2em] text-white/95 sm:text-base">
                    {number}
                </p>
                <div className="mt-3 flex items-end justify-between text-xs text-white/85">
                    <div>
                        <p className="text-[9px] uppercase text-white/60">Card holder</p>
                        <p className="font-medium">{name}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] uppercase text-white/60">Exp</p>
                        <p className="font-mono">{exp}</p>
                    </div>
                </div>
                {brand === "Mastercard" && (
                    <div
                        className="absolute bottom-4 right-4 flex -space-x-3"
                        aria-hidden
                    >
                        <span className="h-7 w-7 rounded-full bg-red-500/90 opacity-90" />
                        <span className="h-7 w-7 rounded-full bg-amber-400/90 opacity-90 mix-blend-screen" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Home({ onOpenDashboard }) {
    const [contactSent, setContactSent] = useState(false);

    const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactSent(true);
    };

    return (
        <div className="overflow-x-hidden bg-[#070b14] font-sans text-slate-200">
            {/* —— Hero —— */}
            <section className="relative">
                <ThemeBackground />
                <div className="relative z-10 mx-auto max-w-6xl px-4 pb-6 pt-14 sm:px-6 sm:pt-16 lg:pb-10 lg:pt-20">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                        <div>
                            <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.5rem]">
                                <span className="text-white">Bank</span>
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]">
                                    IQ
                                </span>
                            </h1>

                            <p className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
                                <span className="text-cyan-400">Your 24/7</span>{" "}
                                <span className="text-white">Intelligent Banking</span>
                                <br />
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                                    Colleague
                                </span>
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-2 backdrop-blur-sm">
                                <span
                                    className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-amber-600 text-lg text-amber-950 shadow-lg"
                                    aria-hidden
                                >
                                    ★
                                </span>
                                <p className="max-w-[15rem] text-[11px] font-semibold leading-tight text-amber-100/95 sm:text-xs">
                                    NatWest intelligence · Ask, analyse, act with BankIQ
                                </p>
                            </div>

                            <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-slate-300 sm:text-base">
                                BankIQ is your workspace for enterprise banking insight: type a
                                question in plain English, get structured answers, see charts
                                built for that query, and catch important risks—so analysts and
                                leaders move from data to decisions in one place.
                            </p>
                            <button
                                type="button"
                                onClick={onOpenDashboard}
                                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-400 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/30 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0a0f1c]"
                            >
                                Discover Now
                                <ArrowUpRight className="h-[18px] w-[18px]" />
                            </button>
                        </div>

                        <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end">
                            <div
                                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40"
                                style={{
                                    transform: "perspective(1000px) rotateY(-4deg) rotateX(3deg)",
                                }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80"
                                    alt="Digital banking and secure finance"
                                    className="aspect-[4/3] w-full object-cover"
                                    loading="eager"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/85 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-sky-200/90">
                                        Secure · Compliant · Real-time
                                    </p>
                                    <p className="text-sm font-semibold text-white">
                                        Banking intelligence at your fingertips
                                    </p>
                                </div>
                            </div>
                            <div
                                className="pointer-events-none absolute -bottom-4 left-1/2 h-14 w-[78%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-2xl"
                                aria-hidden
                            />
                        </div>
                    </div>
                </div>

                {/* 3D cards — sits lower under hero */}
                <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="relative mt-16 min-h-[300px] sm:mt-20 sm:min-h-[340px] lg:mt-24 lg:min-h-[360px]">
                        <FloatingCard
                            className="absolute left-[-4%] top-[18%] z-10 sm:left-[2%] lg:left-[4%]"
                            gradient="bg-gradient-to-br from-fuchsia-500 via-pink-500 to-emerald-400"
                            name="Nora Amelia"
                            number="4920 •••• •••• 8891"
                            exp="09/28"
                            brand="Visa"
                            animationClass="animate-card-float"
                            cardStyle={{
                                transform: "rotateY(-22deg) rotateX(10deg) translateZ(0)",
                                transformStyle: "preserve-3d",
                            }}
                        />
                        <FloatingCard
                            className="absolute left-[18%] top-[32%] z-20 sm:left-[22%]"
                            gradient="bg-gradient-to-br from-violet-600 via-purple-600 to-amber-300"
                            name="Ethan Alexander"
                            number="5412 •••• •••• 1024"
                            exp="04/27"
                            brand="Mastercard"
                            animationClass="animate-card-float-slow"
                            cardStyle={{
                                transform: "rotateY(-8deg) rotateX(6deg) translateZ(40px)",
                                transformStyle: "preserve-3d",
                            }}
                        />
                        <FloatingCard
                            className="absolute left-1/2 top-[14%] z-30 -translate-x-1/2 sm:left-[48%]"
                            gradient="bg-gradient-to-br from-orange-400 via-rose-400 to-amber-200"
                            name="Sofia Chen"
                            number="3782 •••• •••• 7712"
                            exp="11/29"
                            brand="Discover"
                            animationClass="animate-card-float-fast"
                            cardStyle={{
                                transform: "rotateY(12deg) rotateX(8deg) translateZ(60px)",
                                transformStyle: "preserve-3d",
                            }}
                        />
                        <FloatingCard
                            className="absolute right-[-2%] top-[28%] z-20 sm:right-[6%]"
                            gradient="bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700"
                            name="James Wright"
                            number="6011 •••• •••• 4402"
                            exp="01/26"
                            brand="Visa"
                            animationClass="animate-card-float-slow"
                            cardStyle={{
                                transform: "rotateY(20deg) rotateX(10deg) translateZ(20px)",
                                transformStyle: "preserve-3d",
                            }}
                        />
                        <FloatingCard
                            className="absolute bottom-[2%] right-[18%] z-10 hidden sm:block"
                            gradient="bg-gradient-to-br from-teal-400 via-emerald-600 to-slate-900"
                            name="Ava Martinez"
                            number="3566 •••• •••• 9021"
                            exp="06/30"
                            brand="Mastercard"
                            animationClass="animate-card-float"
                            cardStyle={{
                                transform: "rotateY(16deg) rotateX(-4deg) translateZ(0)",
                                transformStyle: "preserve-3d",
                            }}
                        />
                        <FloatingCard
                            className="absolute bottom-[2%] left-[18%] z-10 hidden sm:block"
                            gradient="bg-gradient-to-br from-indigo-500 via-blue-600 to-sky-400"
                            name="Liam Cooper"
                            number="5521 •••• •••• 3380"
                            exp="03/29"
                            brand="Visa"
                            animationClass="animate-card-float-slow"
                            cardStyle={{
                                transform: "rotateY(-16deg) rotateX(-4deg) translateZ(0)",
                                transformStyle: "preserve-3d",
                            }}
                        />

                        <div
                            className="pointer-events-none absolute bottom-0 left-1/2 h-24 w-[85%] max-w-3xl -translate-x-1/2 rounded-[100%] bg-black/50 blur-3xl"
                            aria-hidden
                        />
                    </div>
                </div>
            </section>

            {/* —— Features —— */}
            <section
                id="features"
                className="relative border-t border-white/5 bg-[#050a14] py-16 sm:py-20"
            >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1424]/80 to-transparent" />
                <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Everything you need to decide with confidence
                        </h2>
                        <p className="mt-3 text-slate-400">
                            BankIQ combines conversational AI with clear visuals so teams spend
                            less time searching and more time acting.
                        </p>
                    </div>
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                title: "Natural-language queries",
                                body: "Ask complex questions in plain English and receive structured summaries you can share.",
                                icon: "💬",
                            },
                            {
                                title: "Live charts & trends",
                                body: "See metrics and movements in context with charts generated from your question.",
                                icon: "📊",
                            },
                            {
                                title: "Risk-aware insights",
                                body: "Warnings and caveats surface automatically so nothing important is missed.",
                                icon: "🛡️",
                            },
                        ].map((item) => (
                            <div
                                key={item.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg transition hover:border-sky-500/30 hover:bg-white/[0.05]"
                            >
                                <span className="text-2xl" aria-hidden>
                                    {item.icon}
                                </span>
                                <h3 className="mt-4 text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* —— Trust strip —— */}
            <section className="border-t border-white/5 bg-[#070b14] py-14">
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white sm:text-3xl">
                                Built for regulated environments
                            </h2>
                            <p className="mt-3 text-slate-400">
                                Encryption in transit, role-aware access patterns, and audit-friendly
                                outputs help teams stay aligned with internal policies while moving
                                quickly.
                            </p>
                            <ul className="mt-6 space-y-3 text-sm text-slate-300">
                                <li className="flex gap-2">
                                    <span className="text-sky-400">✓</span>
                                    Designed for enterprise banking workflows
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-sky-400">✓</span>
                                    Clear separation between insight and raw data
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-sky-400">✓</span>
                                    Dashboard experience tuned for daily use
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-sky-900/40 to-indigo-950/60 p-8">
                            <p className="text-sm font-medium uppercase tracking-wider text-sky-300/90">
                                Ready when you are
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                                Open the dashboard to run your first query in seconds.
                            </p>
                            <button
                                type="button"
                                onClick={onOpenDashboard}
                                className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* —— Contact —— */}
            <section
                id="contact"
                className="border-t border-white/5 bg-[#050a14] py-16 sm:py-20"
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Contact us
                        </h2>
                        <p className="mt-3 text-slate-400">
                            Questions about BankIQ, partnerships, or enterprise rollout? Send a
                            message and we&apos;ll get back to you.
                        </p>
                    </div>

                    <div className="mt-10 grid gap-10 lg:grid-cols-2">
                        <div className="space-y-6 text-sm">
                            <div>
                                <p className="font-semibold text-white">Email</p>
                                <a
                                    href="mailto:hello@bankiq.example"
                                    className="mt-1 inline-block text-sky-400 hover:text-sky-300"
                                >
                                    hello@bankiq.example
                                </a>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Phone</p>
                                <a
                                    href="tel:+442079460001"
                                    className="mt-1 inline-block text-sky-400 hover:text-sky-300"
                                >
                                    +44 20 7946 0001
                                </a>
                            </div>
                            <div>
                                <p className="font-semibold text-white">Hours</p>
                                <p className="mt-1 text-slate-400">
                                    Monday–Friday, 9:00–18:00 GMT
                                </p>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-slate-400">
                                <p className="text-xs uppercase tracking-wide text-slate-500">
                                    Office
                                </p>
                                <p className="mt-1 text-slate-300">
                                    250 Bishopsgate, London EC2M 4AA, United Kingdom
                                </p>
                            </div>
                        </div>

                        <form
                            onSubmit={handleContactSubmit}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                        >
                            {contactSent ? (
                                <p className="text-center text-slate-300">
                                    Thanks — your message has been recorded. We&apos;ll reply soon.
                                </p>
                            ) : (
                                <>
                                    <label className="block">
                                        <span className="text-sm font-medium text-slate-300">
                                            Name
                                        </span>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0a1424] px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                                            placeholder="Your name"
                                        />
                                    </label>
                                    <label className="mt-4 block">
                                        <span className="text-sm font-medium text-slate-300">
                                            Email
                                        </span>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            autoComplete="email"
                                            className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0a1424] px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                                            placeholder="you@company.com"
                                        />
                                    </label>
                                    <label className="mt-4 block">
                                        <span className="text-sm font-medium text-slate-300">
                                            Message
                                        </span>
                                        <textarea
                                            required
                                            name="message"
                                            rows={4}
                                            className="mt-1.5 w-full resize-y rounded-xl border border-white/10 bg-[#0a1424] px-4 py-3 text-white placeholder:text-slate-500 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/50"
                                            placeholder="How can we help?"
                                        />
                                    </label>
                                    <button
                                        type="submit"
                                        className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-[#050a14] sm:w-auto sm:px-10"
                                    >
                                        Send message
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            <footer className="border-t border-white/5 bg-[#04080f] py-8 text-center text-xs text-slate-500">
                <p>© {new Date().getFullYear()} BankIQ. All rights reserved.</p>
            </footer>
        </div>
    );
}
