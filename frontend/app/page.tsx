'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function QuoteScreen() {
  const router = useRouter();
  const [quote] = useState({
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  });

  useEffect(() => {
    // 3 seconds transition as requested in UX constraints
    const timer = setTimeout(() => {
      router.push('/guide');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6 selection:bg-indigo-500/30">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl text-center space-y-6"
      >
        <blockquote className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-100 leading-tight">
          "{quote.text}"
        </blockquote>
        <div className="text-zinc-500 font-medium tracking-wide">
          — {quote.author}
        </div>
      </motion.div>
    </div>
  );
}
