import { Activity, LogOut } from "lucide-react";

function AppHeader({ onLogout }) {
  return (
    <header className="w-full bg-slate-900 border-b border-slate-700 px-4 sm:px-6 py-4">
      <div className="max-w-full flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-lg sm:text-xl font-bold text-slate-100 tracking-tight">
          Audit Trail: Event-Sourced Ledger
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-md px-3 py-1.5">
            <Activity
              size={14}
              className="text-teal-400"
            />

            <span className="text-xs font-mono text-teal-400 font-semibold">
              LIVE
            </span>
          </div>

          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-100 hover:border-slate-500 transition-colors"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;