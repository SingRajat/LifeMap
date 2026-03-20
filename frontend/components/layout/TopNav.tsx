'use client';

import { usePathname } from 'next/navigation';
import { Menu, Bell } from 'lucide-react';

export function TopNav() {
  const pathname = usePathname();

  // Hide topnav on public pages
  if (['/', '/guide', '/login'].includes(pathname)) {
    return null;
  }

  // Format page title from pathname
  const title = pathname.split('/')[1] || 'Dashboard';
  const formattedTitle = title.charAt(0).toUpperCase() + title.slice(1).replace('-', ' ');

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 h-16 flex items-center justify-between px-4 sm:px-6 md:pl-72 md:pr-8">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-zinc-400 hover:text-zinc-100">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-zinc-100 hidden sm:block">
          {formattedTitle}
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
