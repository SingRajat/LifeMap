'use client';

import Link from 'next/link';

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 space-y-8">
      <div className="max-w-xl text-center space-y-4">
        <h1 className="text-4xl font-bold text-zinc-100">Welcome to LifeMap</h1>
        <p className="text-zinc-400 text-lg">
          Direct your life energy to achieve your goals faster. Break down your ultimate 
          objectives into actionable projects, daily missions, and track your behavioral progress.
        </p>
      </div>
      
      <Link 
        href="/login"
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
      >
        Get Started
      </Link>
    </div>
  );
}
