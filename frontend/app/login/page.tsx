'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { authApi } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorObj, setErrorObj] = useState<string | null>(null);

  const setAuth = useAuthStore(state => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorObj(null);
    
    try {
      // Backend expects username/password for OAuth2 form boundary
      const data = await authApi.login(email, password);
      // Persist auth inside Zustand (which replicates to localStorage via persist middleware)
      setAuth(data.access_token, { username: email, email, id: '1' });
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setErrorObj(err.response?.data?.detail || "Failed to authenticate.");
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-2xl shadow-black/40 backdrop-blur-xl bg-card/95">
          <CardHeader className="space-y-3 pb-6 text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center shadow-inner mb-2">
              <span className="text-primary font-bold text-xl">L</span>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Sign in to continue your trajectory.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-5">
              <div className="space-y-2.5">
                <label className="text-sm font-medium text-foreground ml-1">Account</label>
                <Input 
                  type="text"
                  placeholder="Email or Username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={isLoading}
                  className="h-12 text-base"
                />
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between ml-1 mr-1">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <a href="#" className="text-sm text-primary hover:underline hover:text-primary/80 transition-colors">
                    Forgot?
                  </a>
                </div>
                <Input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  disabled={isLoading}
                  className="h-12 text-base"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2 pb-8">
              <Button 
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full h-12 text-base font-semibold shadow-lg shadow-primary/20"
              >
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center items-center gap-2"
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-primary-foreground border-r-transparent animate-spin" />
                    Connecting...
                  </motion.div>
                ) : (
                  "Initiate Session"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
