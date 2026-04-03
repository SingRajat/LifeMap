'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Clock, Plus, TimerReset } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useTimeLogsStore } from '@/store/timeLogs';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function TimeLogsPage() {
  const { logs, fetchLogs, addLog } = useTimeLogsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Deep Work");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !duration) return;
    
    await addLog({
      task,
      category,
      duration_minutes: parseInt(duration),
      date: new Date().toISOString().split('T')[0]
    });
    
    setIsModalOpen(false);
    setTask("");
    setDuration("");
  };

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
              <Clock className="w-6 h-6 text-primary" />
              Time Logs
            </h2>
            <p className="text-muted-foreground text-sm">
              Review exactly where your energy is being spent.
            </p>
          </div>
          <Button 
            size="sm" 
            className="w-full sm:w-auto flex items-center gap-2 border-border/50"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Time Log
          </Button>
        </div>

        <div className="space-y-3">
          {logs.map((log: any) => {
            const colors = {
              "Deep Work": "bg-blue-500",
              "Health": "bg-emerald-500",
              "Learning": "bg-purple-500",
              "Admin": "bg-zinc-500"
            };
            const colorClass = colors[log.category as keyof typeof colors] || "bg-primary";
            
            return (
            <motion.div key={log.id} variants={itemVariants}>
              <Card hoverable className="border-border/40 hover:border-border/80 transition-colors">
                <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  
                  {/* Left: Category Indicator & Time */}
                  <div className="flex items-center gap-4 sm:w-48 shrink-0">
                    <div className={`w-2 h-10 rounded-full ${colorClass}`} />
                    <div>
                      <h4 className="font-semibold text-foreground text-lg tracking-tight leading-none mb-1">
                        {log.duration_minutes}m
                      </h4>
                      <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                        {log.category}
                      </p>
                    </div>
                  </div>

                  {/* Divider - visible only on desktop */}
                  <div className="hidden sm:block w-px h-8 bg-border/50 shrink-0 mx-2" />

                  {/* Right: Task Details */}
                  <div className="flex-1 flex flex-col justify-center min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {log.task}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-widest bg-background px-2 py-0.5 rounded border border-white/5">
                        {log.date}
                      </span>
                    </div>
                  </div>
                  
                </CardContent>
              </Card>
            </motion.div>
          )})}
          
          {logs.length === 0 && (
            <div className="text-center py-12 px-4 border border-dashed border-border/50 rounded-xl">
              <Clock className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No time logs recorded yet.</p>
            </div>
          )}
        </div>

      </motion.div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Add Time Log"
        description="Record a completed session to track your time investment."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Task Description</label>
            <Input 
              value={task} 
              onChange={e => setTask(e.target.value)} 
              placeholder="e.g. Backend Architecture Design" 
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</label>
              <select 
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
              >
                <option value="Deep Work">Deep Work</option>
                <option value="Health">Health</option>
                <option value="Learning">Learning</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Duration (mins)</label>
              <Input 
                type="number" 
                value={duration} 
                onChange={e => setDuration(e.target.value)} 
                placeholder="45" 
                required 
                min="1"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 text-xs">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Log Time</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
