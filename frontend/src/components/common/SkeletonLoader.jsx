function SkeletonLoader() {
  return (
    <div
      className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[58%_42%] gap-6 animate-pulse"
      role="status"
      aria-label="Loading shipment data"
    >
      {/* Overview skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-fit">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-slate-800 border border-slate-700 rounded-lg p-4 h-20"
          >
            <div className="h-2.5 bg-slate-700 rounded w-2/3 mb-3" />
            <div className="h-3.5 bg-slate-700 rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Timeline skeleton */}
      <div>
        <div className="h-2.5 bg-slate-700 rounded w-24 mb-4" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-4 pb-6">
            <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0" />
            <div className="flex-1 bg-slate-800 border border-slate-700 rounded-lg p-3.5 h-20">
              <div className="h-3 bg-slate-700 rounded w-1/3 mb-2" />
              <div className="h-2.5 bg-slate-700 rounded w-4/5 mb-2" />
              <div className="h-2.5 bg-slate-700 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;