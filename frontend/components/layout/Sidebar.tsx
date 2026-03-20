'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Target, 
  FolderKanban, 
  CheckSquare, 
  Timer, 
  CalendarDays, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Goals', href: '/goals', icon: Target },
  { name: 'Projects', href: '/projects', icon: FolderKanban },
  { name: 'Missions', href: '/missions', icon: CheckSquare },
  { name: 'Time Tracker', href: '/time-logs', icon: Timer },
  { name: 'Reviews', href: '/reviews', icon: CalendarDays },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on landing, guide, and login pages
  if (['/', '/guide', '/login'].includes(pathname)) {
    return null;
  }

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-zinc-950 border-r border-zinc-800 hidden md:flex flex-col">
      <div className="flex items-center h-16 px-6 border-b border-zinc-800">
        <span className="text-xl font-bold text-zinc-100 tracking-tight">LifeMap</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-zinc-800 text-zinc-100 font-medium' 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-medium">
            U
          </div>
          <div className="flex-1 text-sm overflow-hidden">
            <p className="truncate text-zinc-200">User Account</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
