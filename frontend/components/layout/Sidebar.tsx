'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Target, 
  FolderKanban, 
  CheckSquare, 
  Timer, 
  CalendarDays, 
  Settings 
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
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
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border hidden md:flex flex-col">
      <div className="flex items-center h-16 px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-lg leading-none">L</span>
          </div>
          <span className="text-lg font-semibold text-foreground tracking-tight">LifeMap</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="block relative"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors relative z-10 ${
                  isActive 
                    ? 'text-foreground font-medium' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-indicator"
                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : ''}`} />
                <span>{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-border mt-auto">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 cursor-pointer transition-colors group">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium border border-border group-hover:border-primary/50 transition-colors">
            U
          </div>
          <div className="flex-1 text-sm overflow-hidden">
            <p className="truncate text-foreground font-medium">User Profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
