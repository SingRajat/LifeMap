export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-zinc-100">Dashboard</h2>
        <p className="text-zinc-400">Overview of your life's progress and energy allocation.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Placeholder Stat Cards */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-zinc-500 text-sm font-medium mb-2">Metric {i}</div>
            <div className="text-3xl font-bold text-zinc-100">--</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 h-80 flex items-center justify-center text-zinc-500">
          Chart Placeholder
        </div>
        <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 h-80 flex items-center justify-center text-zinc-500">
          Active Missions Placeholder
        </div>
      </div>
    </div>
  );
}
