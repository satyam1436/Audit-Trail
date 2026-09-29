import { useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";

function LoginPage({ onLogin, onBack }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email.trim() || !password.trim()) {
            setError("Email and password are required.");
            return;
        }

        localStorage.setItem("auditTrailAuth", "true");
        onLogin();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-100 mb-6"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-7">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center">
                            <LockKeyhole
                                size={20}
                                className="text-teal-400"
                            />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-slate-100">
                                Audit Trail
                            </h1>

                            <p className="text-xs text-slate-500">
                                Investigation Console
                            </p>
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-slate-100">
                        Sign in
                    </h2>

                    <p className="text-sm text-slate-400 mt-1 mb-6">
                        Access the shipment investigation dashboard.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="auditor@example.com"
                                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-3 text-sm text-slate-100 outline-none focus:border-teal-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-3 text-sm text-slate-100 outline-none focus:border-teal-500"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-rose-400">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 rounded-md bg-teal-500 text-slate-950 font-bold hover:bg-teal-400 transition"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;