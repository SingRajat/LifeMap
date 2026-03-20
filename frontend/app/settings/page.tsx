'use client';

export default function SettingsPage() {
  return (
    <div className="p-6 md:p-8 max-w-3xl space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-zinc-100">Account Settings</h2>
        <p className="text-zinc-400">Manage your profile and configuration.</p>
      </header>

      <div className="space-y-6">
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-zinc-100 mb-4">Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Username</label>
              <input type="text" className="w-full sm:w-80 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500" disabled defaultValue="user" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
              <input type="email" className="w-full sm:w-80 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-100 focus:outline-none focus:border-indigo-500" disabled defaultValue="user@example.com" />
            </div>
          </div>
        </section>
        
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-medium text-zinc-100 mb-4">Danger Zone</h3>
          <button className="px-4 py-2 bg-red-900/40 text-red-500 hover:bg-red-900/60 hover:text-red-400 border border-red-900/50 rounded-lg text-sm font-medium transition-colors">
            Logout
          </button>
        </section>
      </div>
    </div>
  );
}
