'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { BookOpen, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { useReviewsStore } from '@/store/reviews';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function ReviewsPage() {
  const { submitDaily, submitWeekly, isLoading } = useReviewsStore();
  
  // Daily Form State
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [dailyMood, setDailyMood] = useState("5");
  const [dailyContent, setDailyContent] = useState("");

  // Weekly Form State
  const [isWeeklyOpen, setIsWeeklyOpen] = useState(false);
  const [weeklyContent, setWeeklyContent] = useState("");

  const handleDailySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitDaily({
      date: new Date().toISOString().split('T')[0],
      mood_score: parseInt(dailyMood),
      content: dailyContent
    });
    setIsDailyOpen(false);
    setDailyMood("5");
    setDailyContent("");
  };

  const handleWeeklySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const end = new Date();
    const start = new Date(end);
    start.setDate(end.getDate() - 7);

    await submitWeekly({
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
      content: weeklyContent
    });
    setIsWeeklyOpen(false);
    setWeeklyContent("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Reflection routines
          </h2>
          <p className="text-muted-foreground text-sm">
            Analyze your progress and calibrate your trajectory.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Daily Review: Dominant Card */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card hoverable className="h-full flex flex-col group border-primary/20 bg-linear-to-br from-card to-primary/5 relative overflow-hidden">
              {/* Subtle ambient effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary/20 transition-colors" />
              
              <CardHeader className="pb-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Priority
                  </span>
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">Daily Review</CardTitle>
                  <CardDescription className="text-base text-muted-foreground/80 max-w-md">
                    Lock in today's learnings, analyze friction points, and plan tomorrow's critical missions for maximum momentum.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto pt-6 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {/* Decorative placeholder metric dots */}
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-500">+2</div>
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-500/20 flex items-center justify-center text-[10px] font-bold text-blue-500">-1</div>
                  <div className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] text-muted-foreground">..</div>
                </div>
                <Button 
                  size="lg" 
                  className="shrink-0 shadow-lg shadow-primary/25 cursor-pointer flex items-center gap-2 bg-primary"
                  onClick={() => setIsDailyOpen(true)}
                >
                  Start Daily Review
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Review: Secondary Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Card hoverable className="h-full flex flex-col group border-border/40">
              <CardHeader className="pb-4 space-y-4">
                <div className="w-12 h-12 bg-background border border-border/50 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <CardTitle className="text-xl mb-2">Weekly Review</CardTitle>
                  <CardDescription className="text-sm">
                    Zoom out. Extract larger patterns from the week and adjust your overarching goal timelines.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="mt-auto pt-8">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 border-border/50 group-hover:border-primary/50 transition-colors"
                  onClick={() => setIsWeeklyOpen(true)}
                >
                  Conduct Weekly Review
                </Button>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </motion.div>

      {/* Daily Review Modal */}
      <Modal 
        isOpen={isDailyOpen} 
        onClose={() => setIsDailyOpen(false)}
        title="Daily Review"
        description="Lock in today's learnings and analyze friction points."
      >
        <form onSubmit={handleDailySubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Mood Score (1-10)</label>
            <Input 
              type="number" 
              value={dailyMood} 
              onChange={e => setDailyMood(e.target.value)} 
              min="1"
              max="10"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Reflections & Notes</label>
            <textarea
              value={dailyContent}
              onChange={e => setDailyContent(e.target.value)}
              placeholder="What went well? What caused friction today?"
              className="flex min-h-[120px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 text-xs">
            <Button type="button" variant="outline" onClick={() => setIsDailyOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Submit Daily Review'}</Button>
          </div>
        </form>
      </Modal>

      {/* Weekly Review Modal */}
      <Modal 
        isOpen={isWeeklyOpen} 
        onClose={() => setIsWeeklyOpen(false)}
        title="Weekly Review"
        description="Zoom out. Extract larger patterns from the week."
      >
        <form onSubmit={handleWeeklySubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Weekly Highlights & Patterns</label>
            <textarea
              value={weeklyContent}
              onChange={e => setWeeklyContent(e.target.value)}
              placeholder="What major milestones were hit? Any recurring blockers?"
              className="flex min-h-[180px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
              required
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 text-xs">
            <Button type="button" variant="outline" onClick={() => setIsWeeklyOpen(false)} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Submit Weekly Review'}</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
