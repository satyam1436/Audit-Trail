import { useEffect } from "react";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

function EventInspector({ event, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!event) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(event.payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inspector-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-800 border border-slate-700 rounded-lg w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700 sticky top-0 bg-slate-800">
          <h2 id="inspector-title" className="text-sm font-semibold text-slate-100">
            Event Inspector
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inspector"
            className="text-slate-400 hover:text-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Event metadata */}
        <div className="p-4 space-y-2 border-b border-slate-700 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Event Type</span>
            <span className="font-mono text-slate-100">{event.eventType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Version</span>
            <span className="font-mono text-teal-400">v{event.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Event UUID</span>
            <span className="font-mono text-slate-100 text-xs">{event.eventId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Timestamp</span>
            <span className="font-mono text-slate-100 text-xs">{event.timestamp}</span>
          </div>
        </div>

        {/* JSON payload viewer */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Payload
            </span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy payload JSON"
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-teal-400"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="bg-slate-950 border border-slate-700 rounded-md p-3 text-xs text-teal-300 overflow-x-auto font-mono">
            {JSON.stringify(event.payload, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default EventInspector;