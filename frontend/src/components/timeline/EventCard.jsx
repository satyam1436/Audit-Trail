import { memo } from "react";
import { Package, Ship, MapPinCheck, Thermometer, ShieldAlert, Route, Circle } from "lucide-react";

const CRITICAL_TYPES = new Set(["TEMPERATURE_SPIKE", "SEAL_BREACH", "ROUTE_DEVIATION"]);

const EVENT_ICONS = {
  CONTAINER_CREATED: Package,
  LOADED_ON_SHIP: Ship,
  ARRIVED_AT_PORT: MapPinCheck,
  TEMPERATURE_SPIKE: Thermometer,
  SEAL_BREACH: ShieldAlert,
  ROUTE_DEVIATION: Route,
};

function formatEventLabel(eventType) {
  return eventType.replace(/_/g, " ");
}

function formatTimestamp(isoString) {
  return new Date(isoString).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function summarizeEvent(event) {
  const p = event.payload || {};
  switch (event.eventType) {
    case "CONTAINER_CREATED":
      return `Created at ${p.origin ?? "unknown origin"}.`;
    case "LOADED_ON_SHIP":
      return `Loaded onto vessel ${p.vessel ?? "unknown vessel"}${p.bay ? `, bay ${p.bay}` : ""}.`;
    case "ARRIVED_AT_PORT":
      return `Arrived at ${p.destination ?? "destination"}.`;
    case "TEMPERATURE_SPIKE":
      return `Temp reached ${p.recordedTemp}°C (threshold: ${p.threshold}°C).`;
    case "SEAL_BREACH":
      return `Seal breach detected at ${p.location ?? "unknown location"}.`;
    default:
      return "Event recorded.";
  }
}

function EventCard({ event, isLast, onInspect }) {
  const isCritical = CRITICAL_TYPES.has(event.eventType);
  const Icon = EVENT_ICONS[event.eventType] || Circle;

  return (
    <div className="relative flex gap-4 pb-6">
      {/* Connecting vertical line + node dot */}
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0 ${
            isCritical
              ? "bg-rose-500/10 border-rose-500 text-rose-400"
              : "bg-teal-500/10 border-teal-500 text-teal-400"
          }`}
        >
          <Icon size={14} />
        </div>
        {!isLast && <div className="w-px flex-1 bg-slate-700 mt-1" />}
      </div>

      {/* Event card content */}
      <button
        type="button"
        onClick={() => onInspect(event)}
        className={`flex-1 text-left bg-slate-800 border rounded-lg p-3.5 hover:border-teal-500/60 transition-colors ${
          isCritical ? "border-rose-500/40" : "border-slate-700"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
          <span
            className={`text-sm font-semibold ${isCritical ? "text-rose-400" : "text-slate-100"}`}
          >
            {formatEventLabel(event.eventType)}
          </span>
          <span className="text-xs font-mono text-slate-500">v{event.version}</span>
        </div>
        <p className="text-xs text-slate-400 mb-1.5">{summarizeEvent(event)}</p>
        <span className="text-xs font-mono text-slate-500">
          {formatTimestamp(event.timestamp)}
        </span>
      </button>
    </div>
  );
}

export default memo(EventCard);