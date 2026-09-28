import { useMemo } from "react";

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    });
}

function TimeSlider({
    events = [],
    selectedIndex,
    onChange,
    disabled = false,
}) {
    const sortedEvents = useMemo(() => {
        return [...events].sort((a, b) => a.version - b.version);
    }, [events]);

    if (sortedEvents.length === 0) {
        return null;
    }

    const safeIndex = Math.min(
        Math.max(selectedIndex ?? sortedEvents.length - 1, 0),
        sortedEvents.length - 1
    );

    const selectedEvent = sortedEvents[safeIndex];

    return (
        <div className="w-full bg-slate-800 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                        Time Travel
                    </h2>

                    <p className="text-sm text-slate-300 mt-1">
                        Inspect container state across its event history.
                    </p>
                </div>

                <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-teal-400">
                        EVENT #{selectedEvent.version}
                    </span>

                    <p className="text-xs text-slate-500 mt-1">
                        {formatTime(selectedEvent.timestamp)}
                    </p>
                </div>
            </div>

            <input
                type="range"
                min="0"
                max={sortedEvents.length - 1}
                step="1"
                value={safeIndex}
                disabled={disabled}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Historical state time slider"
            />

            <div className="flex justify-between mt-2">
                {sortedEvents.map((event, index) => (
                    <button
                        key={event.eventId}
                        type="button"
                        disabled={disabled}
                        onClick={() => onChange(index)}
                        className={`flex flex-col items-center gap-1 ${index === safeIndex
                                ? "text-teal-400"
                                : "text-slate-500 hover:text-slate-300"
                            }`}
                    >
                        <span
                            className={`w-2.5 h-2.5 rounded-full border ${index === safeIndex
                                    ? "bg-teal-400 border-teal-400"
                                    : "bg-slate-700 border-slate-500"
                                }`}
                        />

                        <span className="text-[10px] font-mono">
                            v{event.version}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default TimeSlider;