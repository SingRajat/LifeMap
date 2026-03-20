'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = ['/', '/guide', '/login'].includes(pathname);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-indigo-500/30">
      <Sidebar />
      <div className="flex flex-col min-h-screen">
        <TopNav />
        <main className={`flex-1 ${!isPublicPage ? 'md:pl-64' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
