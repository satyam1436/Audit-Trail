import { Clock3 } from "lucide-react";

function HistoricalBanner({ timestamp, version, onReturnToLive }) {
    if (!timestamp) {
        return null;
    }

    const formattedTime = new Date(timestamp).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });

    return (
        <div className="w-full border border-amber-500/40 bg-amber-500/10 rounded-lg px-4 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                    <Clock3
                        size={18}
                        className="text-amber-400 mt-0.5 shrink-0"
                    />

                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-amber-400">
                            Historical Reconstruction Mode
                        </p>

                        <p className="text-sm text-slate-300 mt-1">
                            Viewing state at{" "}
                            <span className="font-mono text-amber-300">
                                {formattedTime}
                            </span>{" "}
                            <span className="text-slate-500">
                                (Event #{version})
                            </span>
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onReturnToLive}
                    className="px-3 py-2 text-xs font-semibold rounded-md border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 transition-colors"
                >
                    Return to Current Live State
                </button>
            </div>
        </div>
    );
}

export default HistoricalBanner;