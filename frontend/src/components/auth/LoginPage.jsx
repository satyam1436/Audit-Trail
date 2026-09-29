import { useState } from "react";
import { ShieldCheck, ArrowLeft } from "lucide-react";

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

        setError("");
        onLogin();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 mb-6 transition"
                >
                    <ArrowLeft size={16} />
                    Back to home
                </button>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-7 shadow-xl">
                    <div className="flex justify-center mb-5">
                        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                            <ShieldCheck
                                size={26}
                                className="text-teal-400"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-7">
                        <h1 className="text-xl font-bold text-slate-100">
                            Sign in to Audit-Trail
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            Access the container investigation dashboard.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">
                                EMAIL
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@audittrail.com"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-3 text-sm text-slate-100 outline-none focus:border-teal-400 transition"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-400 mb-2">
                                PASSWORD
                            </label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-3 text-sm text-slate-100 outline-none focus:border-teal-400 transition"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-rose-400">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold transition"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-xs text-slate-600 mt-6">
                        Demo authentication for project review
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;