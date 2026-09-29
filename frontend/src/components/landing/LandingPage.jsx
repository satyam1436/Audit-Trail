import { ShieldCheck, Activity, Clock3, ArrowRight } from "lucide-react";

function LandingPage({ onLogin }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-teal-400" size={26} />
                        <span className="text-lg font-bold tracking-tight">
                            Audit-Trail
                        </span>
                    </div>

                    <button
                        onClick={onLogin}
                        className="px-4 py-2 text-sm font-semibold rounded-md bg-teal-500 hover:bg-teal-400 text-slate-950 transition"
                    >
                        Sign In
                    </button>
                </div>
            </header>

            <main>
                <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-semibold mb-6">
                        <Activity size={14} />
                        EVENT-SOURCED CONTAINER TRACKING
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
                        Complete visibility into your{" "}
                        <span className="text-teal-400">
                            container history.
                        </span>
                    </h1>

                    <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-7">
                        Track container events, monitor sensor conditions,
                        inspect event history, and reconstruct container state
                        at any point in time.
                    </p>

                    <button
                        onClick={onLogin}
                        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold transition"
                    >
                        Investigate a Container
                        <ArrowRight size={18} />
                    </button>
                </section>

                <section className="max-w-5xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <Activity className="text-teal-400 mb-4" size={24} />
                        <h3 className="font-semibold text-slate-100">
                            Event Timeline
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 leading-6">
                            Inspect the complete chronological event history
                            of every container.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <Clock3 className="text-teal-400 mb-4" size={24} />
                        <h3 className="font-semibold text-slate-100">
                            Time Travel
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 leading-6">
                            Reconstruct the exact container state from its
                            historical events.
                        </p>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <ShieldCheck className="text-teal-400 mb-4" size={24} />
                        <h3 className="font-semibold text-slate-100">
                            Audit Visibility
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 leading-6">
                            Review critical events and sensor conditions from
                            a single investigation dashboard.
                        </p>
                    </div>
                </section>
            </main>

            <footer className="border-t border-slate-800 py-5 text-center text-xs text-slate-600">
                Audit-Trail • Container Event Investigation Platform
            </footer>
        </div>
    );
}

export default LandingPage;