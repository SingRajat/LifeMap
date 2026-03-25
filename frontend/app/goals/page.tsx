'use client';

import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Target, Plus, TrendingUp } from 'lucide-react';

const mockGoals = [
  { id: 1, name: "Launch Startup", description: "Get the MVP out and acquire 100 beta users.", progress: 65 },
  { id: 2, name: "Marathon Prep", description: "Run the local city marathon in under 4 hours.", progress: 30 },
  { id: 3, name: "Master French", description: "Reach B2 fluency level for the upcoming Paris trip.", progress: 80 },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function GoalsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Life Goals
            </h2>
            <p className="text-muted-foreground text-sm">Define and track your high-level life objectives.</p>
          </div>
          <Button size="sm" className="w-full sm:w-auto flex items-center gap-2 shadow-primary/20 shadow-md">
            <Plus className="w-4 h-4" />
            Create Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockGoals.map((goal) => (
            <motion.div key={goal.id} variants={itemVariants}>
              <Card hoverable className="h-full flex flex-col group cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{goal.name}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5">{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3 pt-2 pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      Progress
                    </span>
                    <span className="font-semibold text-foreground">{goal.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {mockGoals.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/60 bg-card/30">
            <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No goals defined</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">You haven't set any life goals yet. Start by creating your first objective.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
