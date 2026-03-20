'use client';

export default function GoalsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Goals</h2>
          <p className="text-zinc-400">Define and manage your ultimate life objectives.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
          Create Goal
        </button>
      </header>
      
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <p className="text-zinc-500">No goals found. Start by creating one.</p>
      </div>
    </div>
  );
}
