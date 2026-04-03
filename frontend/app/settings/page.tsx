'use client';

import { motion, Variants } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings, User, Bell, Shield, LogOut } from 'lucide-react';

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

export default function SettingsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <div className="flex items-center gap-3 border-b border-border/40 pb-6">
          <div className="p-2.5 bg-background border border-border/50 rounded-xl">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">Preferences</h2>
            <p className="text-muted-foreground text-sm">Manage your account settings and application behavior.</p>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Profile Settings */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4 px-1">
              <User className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Profile</h3>
            </div>
            <Card className="border-border/40">
              <CardContent className="p-5 sm:p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Display Name</label>
                    <Input defaultValue="Rajat" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Email Address</label>
                    <Input defaultValue="rajat@lifemap.app" type="email" className="bg-background text-muted-foreground" readOnly />
                  </div>
                </div>
                <div className="pt-2">
                  <Button size="sm">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Preferences Settings */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-2 mb-4 px-1">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Security & Preferences</h3>
            </div>
            <Card className="border-border/40">
              <CardContent className="p-0 divide-y divide-border/40">
                <div className="flex items-center justify-between p-5 sm:p-6 hover:bg-white/2 transition-colors">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Theme Mode</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Force the application theme. (Dark is locked for now).</p>
                  </div>
                  <div className="px-3 py-1 bg-background border border-border/50 rounded-md text-xs font-medium text-muted-foreground">Dark</div>
                </div>
                <div className="flex items-center justify-between p-5 sm:p-6 hover:bg-white/2 transition-colors">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Two-Factor Authentication</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security.</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8">Enable</Button>
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Danger Zone */}
          <motion.section variants={itemVariants} className="pt-4">
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-red-500 text-sm flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </h4>
                  <p className="text-xs text-red-500/70 mt-0.5">End your current session across all tabs.</p>
                </div>
                <Button variant="outline" size="sm" className="border-red-500/30 text-red-500 hover:bg-red-500/10 hover:text-red-500">
                  Log out
                </Button>
              </CardContent>
            </Card>
          </motion.section>

        </div>
      </motion.div>
    </div>
  );
}
