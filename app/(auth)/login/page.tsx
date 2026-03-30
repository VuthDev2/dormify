'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      if (email.includes('premium')) {
        window.location.href = '/dashboard/premium';
      } else if (email.includes('pro')) {
        window.location.href = '/dashboard/pro';
      } else {
        window.location.href = '/dashboard/normal';
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden">

      <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 relative z-10 overflow-y-auto scrollbar-none">
        <div className="max-w-[480px] w-full mx-auto">
          
          <div className="bg-slate-50/60 border border-border/50 shadow-xl shadow-black/[0.02] rounded-[2rem] p-6 sm:p-10 space-y-8">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex items-center justify-center gap-2 group cursor-pointer">
                <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1.5">
                <h1 className="text-3xl font-black tracking-tight text-black">Welcome Back!</h1>
                <p className="text-muted-foreground font-medium text-sm">Enter your login details</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-3.5">

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-black transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 pl-12 pr-4 rounded-xl border-border/40 bg-white shadow-sm focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-black transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12 pl-12 pr-12 rounded-xl border-border/40 bg-white shadow-sm focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Link href="/auth/forgot-password" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all mt-4"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-border/60" />
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest bg-white px-2">Or</span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-xl border-border/40 bg-white shadow-sm hover:bg-slate-50 font-semibold text-sm flex items-center justify-center gap-3 transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>

            <p className="text-center text-sm font-medium text-muted-foreground pt-2">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 relative p-5">
        <div className="w-full h-full relative rounded-3xl overflow-hidden group">
          <img
            src="/login-bg.png"
            alt="Dormify Building"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-blue-600/35 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-50" />
          <div className="absolute inset-0 bg-linear-to-t from-blue-950/90 via-blue-900/30 to-blue-900/20" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8 py-12 space-y-6">
            <h2 className="text-3xl font-bold text-white leading-relaxed max-w-sm drop-shadow-lg">
              Manage your dorm effortlessly
            </h2>
            <p className="text-base font-medium text-blue-50 max-w-sm drop-shadow-md">
              Rooms, payments, and organization made simple
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
