'use client';

export default function MissionsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Daily Missions</h2>
          <p className="text-zinc-400">Execute discrete tasks to advance your projects today.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
          Add Mission
        </button>
      </header>
      
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <p className="text-zinc-500">No active missions for today. Add one to get started.</p>
      </div>
    </div>
  );
}
