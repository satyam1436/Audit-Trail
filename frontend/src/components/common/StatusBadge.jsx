const STATUS_STYLES = {
  ARRIVED: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  IN_TRANSIT: "bg-sky-500/10 text-sky-400 border-sky-500/30",
  SEAL_BROKEN: "bg-rose-500/10 text-rose-400 border-rose-500/30",
};

function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || "bg-slate-500/10 text-slate-400 border-slate-500/30";
  const label = status ? status.replace(/_/g, " ") : "UNKNOWN";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md border text-xs font-semibold font-mono tracking-wide ${style}`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;