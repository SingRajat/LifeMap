'use client';

import { useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckSquare, Circle, Plus, Zap } from 'lucide-react';
import { useMissionsStore } from '@/store/missions';

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

export default function MissionsPage() {
  const { todaysMissions, fetchTodaysMissions, toggleMission } = useMissionsStore();

  useEffect(() => {
    fetchTodaysMissions();
  }, [fetchTodaysMissions]);

  const completedCount = todaysMissions.filter(m => m.status === 'completed').length;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary border border-primary/20 bg-primary/10 rounded-lg p-1" />
              Today's Missions
            </h2>
            <p className="text-muted-foreground text-sm">
              {completedCount} of {todaysMissions.length} completed
            </p>
          </div>
          <Button size="sm" className="w-full sm:w-auto flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Mission
          </Button>
        </div>

        <Card className="overflow-hidden border-border/50">
          <CardContent className="p-0">
            <div className="divide-y divide-border/40">
              {todaysMissions.map((mission) => {
                const isCompleted = mission.status === 'completed';
                return (
                <motion.div 
                  key={mission.id}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 hover:bg-white/2 transition-colors group cursor-pointer"
                  onClick={() => toggleMission(mission.id)}
                >
                  <button 
                    className="shrink-0 focus:outline-none focus-visible:ring-2 ring-primary rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMission(mission.id);
                    }}
                  >
                    <motion.div
                      initial={false}
                      animate={{ 
                        scale: isCompleted ? [1, 1.2, 1] : 1,
                        color: isCompleted ? "#10B981" : "#52525B"
                      }}
                      transition={{ duration: 0.3 }}
                      className={`relative flex items-center justify-center w-6 h-6 rounded-md border ${
                        isCompleted ? 'border-emerald-500 bg-emerald-500/10' : 'border-muted-foreground/30 bg-background group-hover:border-primary/50'
                      } transition-colors`}
                    >
                      {isCompleted && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <CheckSquare className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                      )}
                    </motion.div>
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <motion.p 
                      animate={{ 
                        color: isCompleted ? "#71717A" : "#F4F4F5",
                      }}
                      className="text-base font-medium truncate transition-colors"
                    >
                      {mission.title}
                      {isCompleted && (
                        <motion.span 
                          className="absolute left-0 top-1/2 w-full h-[1.5px] bg-emerald-500/50 -translate-y-1/2"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          style={{ originX: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        />
                      )}
                    </motion.p>
                    <p className="text-xs text-muted-foreground mt-0.5 tracking-wide uppercase">
                      {mission.project_id || 'Unassigned'}
                    </p>
                  </div>
                </motion.div>
              )})}
            </div>
            
            {todaysMissions.length === 0 && (
              <div className="text-center py-12 px-4">
                <CheckSquare className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No missions for today.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
