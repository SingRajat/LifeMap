'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuoteScreen() {
  const router = useRouter();
  const [quote, setQuote] = useState({
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Attempt to fetch quote from backend silently, fallback visually if it fails
    const fetchQuote = async () => {
      try {
        const res = await fetch('http://localhost:8000/quotes/daily');
        if (res.ok) {
          const data = await res.json();
          setQuote({ text: data.text, author: data.author });
        }
      } catch (e) {
        // Fallback to static quote if backend endpoint doesn't exist
      }
    };
    fetchQuote();

    // Start exit animation after 2.5s, route slightly after
    const exitTimer = setTimeout(() => setIsVisible(false), 2500);
    const routeTimer = setTimeout(() => router.push('/guide'), 3000);
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(routeTimer);
    };
  }, [router]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background px-6">
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-center space-y-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground leading-tight">
              "{quote.text}"
            </h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-muted-foreground font-medium tracking-widest uppercase text-sm"
            >
              — {quote.author}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
