import { Clock } from "lucide-react";

function formatShortTime(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function HistoricalScrubber({ events, selectedVersion, onChange }) {
  if (!events || events.length === 0) {
    return null;
  }

  const sortedEvents = [...events].sort((a, b) => a.version - b.version);
  const minVersion = sortedEvents[0].version;
  const maxVersion = sortedEvents[sortedEvents.length - 1].version;
  const activeEvent = sortedEvents.find((evt) => evt.version === selectedVersion);

  const handleSliderChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={14} className="text-slate-400" />
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
          Time-Travel Scrubber
        </span>
      </div>

      <input
        type="range"
        min={minVersion}
        max={maxVersion}
        step={1}
        value={selectedVersion}
        onChange={handleSliderChange}
        aria-label="Historical time scrubber"
        className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer accent-amber-500"
      />

      <div className="flex justify-between mt-1.5">
        {sortedEvents.map((evt) => {
          const isActive = evt.version === selectedVersion;
          return (
            <span
              key={evt.eventId}
              className={isActive ? "text-[10px] font-mono text-amber-400 font-bold" : "text-[10px] font-mono text-slate-500"}
            >
              v{evt.version}
            </span>
          );
        })}
      </div>

      {activeEvent && (
        <p className="text-xs text-slate-400 mt-2">
          Viewing state as of{" "}
          <span className="text-slate-200 font-medium">
            {formatShortTime(activeEvent.timestamp)}
          </span>
        </p>
      )}
    </div>
  );
}

export default HistoricalScrubber;