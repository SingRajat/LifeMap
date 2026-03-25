'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPage = ['/', '/guide', '/login'].includes(pathname);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        <TopNav />
        <main className={`flex-1 flex flex-col relative ${!isPublicPage ? 'md:pl-64' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex-1 flex flex-col w-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
