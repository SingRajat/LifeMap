'use client';

import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FolderKanban, Plus, Clock, PlayCircle } from 'lucide-react';

const mockGroupedProjects = [
  {
    goalName: "Launch Startup",
    projects: [
      { id: 101, name: "Design System Phase", status: "Active", tasks: 12 },
      { id: 102, name: "Backend Architecture", status: "Planning", tasks: 8 },
    ]
  },
  {
    goalName: "Marathon Prep",
    projects: [
      { id: 201, name: "Base Building Block", status: "Active", tasks: 24 },
    ]
  }
];

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
          <Button size="sm" className="w-full sm:w-auto flex items-center gap-2 shadow-primary/20 shadow-md">
            <Plus className="w-4 h-4" />
            New Project
          </Button>
        </div>

        <div className="space-y-12">
          {mockGroupedProjects.map((group, groupIndex) => (
            <motion.div key={groupIndex} variants={itemVariants} className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-px bg-border flex-1" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  Goal: <span className="text-foreground">{group.goalName}</span>
                </h3>
                <div className="h-px bg-border flex-1" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {group.projects.map((project) => (
                  <Card key={project.id} hoverable className="cursor-pointer group flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-base leading-snug">{project.name}</CardTitle>
                        <span className={`text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-md ${
                          project.status === 'Active' 
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                            : 'bg-primary/10 text-primary border border-primary/20'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto flex items-center gap-4 text-xs font-medium text-muted-foreground pt-0">
                      <div className="flex items-center gap-1.5 bg-background/50 px-2.5 py-1.5 rounded-md border border-white/5">
                        <CheckSquareIcon className="w-3.5 h-3.5" />
                        {project.tasks} Tasks
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

        {mockGroupedProjects.length === 0 && (
          <motion.div variants={itemVariants} className="text-center py-16 px-4 rounded-2xl border border-dashed border-border/60 bg-card/30">
            <FolderKanban className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">No active projects</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">Create a project and link it to a goal to get started.</p>
          </motion.div>
        )}
      </motion.div>
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
