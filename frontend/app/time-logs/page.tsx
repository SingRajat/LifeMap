'use client';

export default function TimeLogsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Time Tracker</h2>
          <p className="text-zinc-400">Log where your life energy is actually going.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
          Log Time
        </button>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm p-6">
          <h3 className="text-zinc-100 font-medium mb-4">Today's Logs</h3>
          <div className="text-center p-8 border border-dashed border-zinc-800 rounded-lg">
            <p className="text-zinc-500 text-sm">No time logged yet today.</p>
          </div>
        </div>
        
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm p-6">
          <h3 className="text-zinc-100 font-medium mb-4">Quick Entry</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="What are you working on?" 
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 text-sm focus:outline-none focus:border-indigo-500"
            />
            <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-sm font-medium rounded-lg transition-colors">
              Start Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
