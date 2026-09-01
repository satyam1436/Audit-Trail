import { useState } from "react";
import { Copy, Check, MapPin, GitCommitVertical, Thermometer, Clock } from "lucide-react";
import KpiCard from "../common/KpiCard";
import StatusBadge from "../common/StatusBadge";

function formatRelativeTime(isoString) {
  const then = new Date(isoString).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((now - then) / 60000);

  if (diffMinutes < 1) return "just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

function ShipmentOverview({ shipment }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shipment.shipmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAlert = shipment.sensorHealth === "ALERT";

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <KpiCard label="Container ID">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm truncate">
              {shipment.shipmentId}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy container ID"
              className="text-slate-400 hover:text-teal-400 shrink-0"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        </KpiCard>

        <KpiCard label="Status">
          <StatusBadge status={shipment.currentStatus} />
        </KpiCard>

        <KpiCard label="Location" icon={MapPin}>
          <span className="text-sm truncate block">{shipment.currentLocation}</span>
        </KpiCard>

        <KpiCard label="Stream Version" icon={GitCommitVertical}>
          <span className="font-mono text-sm font-semibold text-teal-400">
            v{shipment.currentVersion}
          </span>
        </KpiCard>

        <KpiCard label="Sensor Condition" icon={Thermometer}>
          <span
            className={`text-sm font-semibold ${isAlert ? "text-rose-400" : "text-teal-400"}`}
          >
            {shipment.sensorHealth} ({shipment.temperature}°C)
          </span>
        </KpiCard>

        <KpiCard label="Last Modified" icon={Clock}>
          <span className="text-sm">{formatRelativeTime(shipment.lastModifiedTimestamp)}</span>
        </KpiCard>
      </div>
    </div>
  );
}

export default ShipmentOverview;