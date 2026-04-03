'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border h-16 flex items-center justify-between px-4 sm:px-8 md:pl-72 text-foreground">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
          <Menu className="w-5 h-5" />
        </button>
        <motion.h1 
          key={formattedTitle}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold tracking-tight hidden sm:block"
        >
          {formattedTitle}
        </motion.h1>
      </div>
      
      <div className="flex items-center gap-4">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative text-muted-foreground hover:text-foreground transition-colors w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
        </motion.button>
      </div>
    </header>
  );
}
