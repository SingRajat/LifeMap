'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Target, Activity, CalendarDays } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl space-y-16"
      >
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 border border-primary/20 shadow-lg shadow-primary/10">
            <Target className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Master your life's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">trajectory.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Direct your energy with precision. LifeMap breaks down your ultimate objectives into actionable daily missions.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: Target,
              title: "Define Goals",
              desc: "Set crystal clear life objectives and break them into manageable projects."
            },
            {
              icon: Activity,
              title: "Execute Daily",
              desc: "Complete specific daily missions that directly advance your long-term goals."
            },
            {
              icon: CalendarDays,
              title: "Reflect & Pivot",
              desc: "Analyze your behavior and time investment to continuously optimize your path."
            }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={i} className="space-y-4 p-6 rounded-2xl bg-card border border-white/5 shadow-xl shadow-black/20">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center pt-8">
          <Button asChild size="lg" className="rounded-xl px-12 h-14 text-base font-semibold shadow-xl shadow-primary/20 group">
            <Link href="/login">
              Acknowledge & Begin
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
