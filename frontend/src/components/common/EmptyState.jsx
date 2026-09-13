import { SearchCode } from "lucide-react";

function EmptyState() {
  return (
    <div className="w-full max-w-md flex flex-col items-center text-center py-10">
      <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
        <SearchCode size={22} className="text-slate-500" />
      </div>
      <h2 className="text-sm font-semibold text-slate-300 mb-1">
        No shipment selected
      </h2>
      <p className="text-xs text-slate-500 max-w-xs">
        Enter a container ID above to investigate its full event history and current state.
      </p>
    </div>
  );
}

export default EmptyState;