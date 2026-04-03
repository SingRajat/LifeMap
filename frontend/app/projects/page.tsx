'use client';

import { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { FolderKanban, Plus, Clock, PlayCircle } from 'lucide-react';
import { useProjectsStore } from '@/store/projects';
import { useGoalsStore } from '@/store/goals';

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

export default function ProjectsPage() {
  const { projects, fetchProjects, addProject } = useProjectsStore();
  const { goals, fetchGoals } = useGoalsStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("planning");
  const [goalId, setGoalId] = useState("");

  useEffect(() => {
    fetchProjects();
    fetchGoals();
  }, [fetchProjects, fetchGoals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    
    // Default to first goal if none selected but goals exist
    const selectedGoalId = goalId || (goals.length > 0 ? goals[0].id : "");
    
    await addProject({
      name,
      status,
      goal_id: selectedGoalId
    });
    
    setIsModalOpen(false);
    setName("");
    setStatus("planning");
  };

  const groupedProjects = goals.map(goal => ({
    goalName: goal.title,
    projects: projects.filter(p => p.goal_id === goal.id)
  })).filter(g => g.projects.length > 0);
  
  const unassigned = projects.filter(p => !p.goal_id);
  if (unassigned.length > 0) {
    groupedProjects.push({ goalName: "Unassigned", projects: unassigned });
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <FolderKanban className="w-6 h-6 text-primary" />
              Projects
            </h2>
            <p className="text-muted-foreground text-sm">Actionable projects linked to your high-level goals.</p>
          </div>
          <Button 
            size="sm" 
            className="w-full sm:w-auto flex items-center gap-2 shadow-primary/20 shadow-md"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="space-y-12">
          {groupedProjects.map((group, groupIndex) => (
            <motion.div key={groupIndex} variants={itemVariants} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-px bg-border flex-1" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Goal: <span className="text-foreground">{group.goalName}</span>
                </h3>
                <div className="h-px bg-border flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.projects.map((project: any) => (
                  <Card key={project.id} hoverable className="cursor-pointer group flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-base leading-snug">{project.name}</CardTitle>
                        <span className={`text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-md ${
                          project.status === 'active' 
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}>
                          {project.status || 'Active'}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto flex items-center gap-4 text-xs font-medium text-muted-foreground pt-0">
                      <div className="flex items-center gap-1.5 bg-background/50 px-2.5 py-1.5 rounded-md border border-white/5">
                        <CheckSquareIcon className="w-3.5 h-3.5" />
                        {project.tasks || 0} Tasks
                      </div>
                      <div className="flex items-center gap-1.5 bg-background/50 px-2.5 py-1.5 rounded-md border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <PlayCircle className="w-3.5 h-3.5 text-primary" />
                        <span className="text-foreground">Open</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {groupedProjects.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/60 bg-card/30">
            <FolderKanban className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No active projects</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">Create a project and link it to a goal to get started.</p>
          </motion.div>
        )}
      </motion.div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
        description="A project is a specific, actionable outcome that helps you achieve a life goal."
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Project Name</label>
            <Input 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="e.g. Design Architecture" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Parent Goal</label>
            <select 
              value={goalId}
              onChange={e => setGoalId(e.target.value)}
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
              required={goals.length > 0}
            >
              <option value="" disabled>Select a Goal</option>
              {goals.map((goal: any) => (
                <option key={goal.id} value={goal.id}>{goal.title}</option>
              ))}
              {goals.length === 0 && (
                <option value="" disabled>No goals available. Create a goal first.</option>
              )}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Initial Status</label>
            <select 
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background"
            >
              <option value="planning">Planning (Not Started)</option>
              <option value="active">Active</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 text-xs">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </Modal>

    </div>
  );
}

// Simple local shim for the check icon missing from imports
function CheckSquareIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
