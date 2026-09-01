function KpiCard({ label, children, icon: Icon }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-1.5 mb-2">
        {Icon && <Icon size={13} className="text-slate-400" />}
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-slate-100">{children}</div>
    </div>
  );
}

export default KpiCard;