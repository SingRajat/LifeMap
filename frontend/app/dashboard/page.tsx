'use client';

import { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { CheckSquare, Target, Clock, ArrowRight } from 'lucide-react';
import { useDashboardStore } from '@/store/dashboard';
import { useMissionsStore } from '@/store/missions';
import { useGoalsStore } from '@/store/goals';

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

export default function DashboardPage() {
  const { stats, fetchStats } = useDashboardStore();
  const { todaysMissions, fetchTodaysMissions } = useMissionsStore();
  const { goals, fetchGoals } = useGoalsStore();

  useEffect(() => {
    fetchStats();
    fetchTodaysMissions();
    fetchGoals();
  }, [fetchStats, fetchTodaysMissions, fetchGoals]);

  const activeMissions = todaysMissions.slice(0, 5); // display up to 5 top missions
  const timeEntries = stats?.time_distribution 
    ? Object.entries(stats.time_distribution).map(([category, hours]) => ({ category, hours }))
    : [];
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Overview</h2>
          <p className="text-muted-foreground text-sm">Your daily performance and trajectory.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Today's Missions */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card hoverable className="h-full cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-primary/10 text-primary">
                    <CheckSquare className="w-4 h-4" />
                  </span>
                  Today's Missions
                </CardTitle>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {activeMissions.map((mission: any) => {
                  const isDone = mission.status === 'completed';
                  return (
                    <div key={mission.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/2 transition-colors">
                      <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isDone 
                          ? 'bg-primary border-primary text-primary-foreground' 
                          : 'border-border bg-background'
                      }`}>
                        {isDone && <CheckSquare className="w-3.5 h-3.5" />}
                      </div>
                      <span className={`text-sm ${isDone ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {mission.title}
                      </span>
                    </div>
                  );
                })}
                {activeMissions.length === 0 && (
                  <p className="text-sm text-muted-foreground">No active missions for today.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: Goal Progress */}
          <motion.div variants={itemVariants}>
            <Card hoverable className="h-full cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-emerald-500/10 text-emerald-500">
                    <Target className="w-4 h-4" />
                  </span>
                  Goal Progress
                </CardTitle>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {goals.slice(0, 3).map((goal: any, i: number) => {
                  const progress = 0; // Default until actual progress is calculated from DB
                  const colors = ["bg-primary", "bg-emerald-500", "bg-blue-500"];
                  const color = colors[i % colors.length];
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{goal.title}</span>
                        <span className="text-muted-foreground">{progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${color}`}
                        />
                      </div>
                    </div>
                  );
                })}
                {goals.length === 0 && (
                  <p className="text-sm text-muted-foreground">No goals active.</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Time Distribution */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <Card hoverable className="cursor-pointer group">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="p-1.5 rounded-md bg-blue-500/10 text-blue-500">
                    <Clock className="w-4 h-4" />
                  </span>
                  Time Investment
                </CardTitle>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {timeEntries.map((time: any) => (
                    <div key={time.category} className="flex flex-col gap-1 p-4 rounded-xl bg-background/50 border border-border/50">
                      <span className="text-sm text-muted-foreground">{time.category}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold tracking-tight text-foreground">{time.hours}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">hrs</span>
                      </div>
                    </div>
                  ))}
                  {timeEntries.length === 0 && (
                    <p className="text-sm text-muted-foreground col-span-3">No time logs available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
