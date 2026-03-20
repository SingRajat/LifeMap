'use client';

export default function ReviewsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-zinc-100">Reviews & Reflection</h2>
        <p className="text-zinc-400">Assess your behavioral patterns and course correct.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-zinc-100">Daily Review</h3>
            <button className="text-sm px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md transition-colors">
              Start
            </button>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Take 5 minutes to reflect on today's execution. Did your energy flow towards your goals?
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-900 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-zinc-100">Weekly Review</h3>
            <button className="text-sm px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-md transition-colors">
              Start
            </button>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Zoom out and analyze your week. Adjust your projects and re-align your trajectory.
          </p>
        </div>
      </div>
    </div>
  );
}
