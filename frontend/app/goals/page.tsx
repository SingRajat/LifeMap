'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Target, Plus, TrendingUp } from 'lucide-react';
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

export default function GoalsPage() {
  const { goals, fetchGoals, addGoal } = useGoalsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Career");
  const [priority, setPriority] = useState("1");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;
    
    await addGoal({
      title,
      description,
      category,
      priority: parseInt(priority),
      deadline
    });
    
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
    setDeadline("");
  };

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
          <Button 
            size="sm" 
            className="w-full sm:w-auto flex items-center gap-2 shadow-primary/20 shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Create Goal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal: any) => {
            const progress = 0; // Backend goal model currently lacks progress, defaulting to 0 for rendering
            return (
            <motion.div key={goal.id} variants={itemVariants}>
              <Card hoverable className="h-full flex flex-col group cursor-pointer">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1.5">{goal.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3 pt-2 pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                      Progress
                    </span>
                    <span className="font-semibold text-foreground">{progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden border border-border/50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )})}
        </div>
        
        {goals.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/60 bg-card/30">
            <Target className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No goals defined</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">You haven't set any life goals yet. Start by creating your first objective.</p>
          </motion.div>
        )}
      </motion.div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create Life Goal"
        description="Define a new high-level objective to shape your future."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Goal Title</label>
            <Input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="e.g. Master French" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="What specifically do you want to achieve?"
              className="flex min-h-[80px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
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
                <option value="Career">Career</option>
                <option value="Health">Health</option>
                <option value="Personal">Personal</option>
                <option value="Financial">Financial</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Priority (1-10)</label>
              <Input 
                type="number" 
                value={priority} 
                onChange={e => setPriority(e.target.value)} 
                min="1"
                max="10"
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Target Deadline</label>
            <Input 
              type="date"
              value={deadline} 
              onChange={e => setDeadline(e.target.value)} 
              required 
            />
          </div>

          <div className="pt-4 flex justify-end gap-2 text-xs">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Goal</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
