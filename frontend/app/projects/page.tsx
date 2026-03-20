'use client';

export default function ProjectsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Projects</h2>
          <p className="text-zinc-400">Break down your goals into actionable projects.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
          New Project
        </button>
      </header>
      
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
        <p className="text-zinc-500">No projects found. Associate projects with your goals.</p>
      </div>
    </div>
  );
}
