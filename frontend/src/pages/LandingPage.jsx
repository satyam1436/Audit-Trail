import { ArrowRight, ShieldCheck, Database, Clock3 } from "lucide-react";

function LandingPage({ onLogin }) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <header className="border-b border-slate-800 bg-slate-900/80">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <h1 className="text-xl font-bold">
                        Audit Trail
                    </h1>

                    <button
                        onClick={onLogin}
                        className="px-4 py-2 rounded-md bg-teal-500 text-slate-950 font-semibold hover:bg-teal-400 transition"
                    >
                        Login
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-20">
                <div className="max-w-3xl">
                    <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">
                        Event-Sourced Logistics Ledger
                    </p>

                    <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
                        Investigate every shipment event.
                    </h2>

                    <p className="mt-6 text-lg text-slate-400 leading-relaxed">
                        Audit Trail provides a forensic view of container
                        history, reconstructed states, critical events and
                        cold-chain telemetry from an immutable event stream.
                    </p>

                    <button
                        onClick={onLogin}
                        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition"
                    >
                        Open Investigation Console
                        <ArrowRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
                    <Feature
                        icon={ShieldCheck}
                        title="Immutable Events"
                        text="Inspect the complete chronological event trail."
                    />

                    <Feature
                        icon={Clock3}
                        title="Historical State"
                        text="Reconstruct container state at any recorded event."
                    />

                    <Feature
                        icon={Database}
                        title="Sensor Telemetry"
                        text="Analyze temperature anomalies alongside events."
                    />
                </div>
            </main>
        </div>
    );
}

function Feature({ icon: Icon, title, text }) {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <Icon size={24} className="text-teal-400 mb-4" />

            <h3 className="font-semibold text-lg">
                {title}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
                {text}
            </p>
        </div>
    );
}

export default LandingPage;