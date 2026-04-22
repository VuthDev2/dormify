'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { TIER_TO_PLAN, PLAN_TO_TIER } from '@/lib/supabase/types';

const PLAN_PRICE: Record<string, number | null> = {
  normal: null,
  pro: 15,
  premium: 45,
}

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dorm: '',
    password: '',
    confirmPassword: '',
    plan: 'normal',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');

    const supabase = createClient();
    const dbPlan = TIER_TO_PLAN[formData.plan];

    // 1. Sign up the user (trigger auto-creates profile row)
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: { full_name: formData.name, role: 'admin' },
      },
    });

    if (authError || !authData.user) {
      setError(authError?.message ?? 'Signup failed');
      setIsLoading(false);
      return;
    }

    const userId = authData.user.id;

    // 2. Create subscription
    const { error: subError } = await supabase.from('subscriptions').insert({
      admin_id: userId,
      plan: dbPlan,
      status: 'active',
      price_per_month: PLAN_PRICE[formData.plan],
    });

    if (subError) {
      setError(subError.message);
      setIsLoading(false);
      return;
    }

    // 3. Create first dorm
    const { error: dormError } = await supabase.from('dorms').insert({
      owner_id: userId,
      name: formData.dorm,
    });

    if (dormError) {
      setError(dormError.message);
      setIsLoading(false);
      return;
    }

    router.push(`/dashboard/${formData.plan}`);
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
                <h1 className="text-3xl font-black tracking-tight text-black">Create Account</h1>
                <p className="text-muted-foreground font-medium text-sm">Start managing your dormitory today</p>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-3.5">

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-black transition-colors">
                      <User className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-12 pl-12 pr-4 rounded-xl border-border/40 bg-white shadow-sm focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-black transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <Input
                      type="email"
                      placeholder="you@dormitory.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-12 pl-12 pr-4 rounded-xl border-border/40 bg-white shadow-sm focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Dormitory Name</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-black transition-colors">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="East Campus Dorm"
                      value={formData.dorm}
                      onChange={(e) => setFormData({ ...formData, dorm: e.target.value })}
                      className="h-12 pl-12 pr-4 rounded-xl border-border/40 bg-white shadow-sm focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Select Plan</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full h-12 px-4 bg-white shadow-sm border border-border/40 rounded-xl text-sm font-medium focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none cursor-pointer"
                  >
                    <option value="normal">Normal Plan (Free · 3 rooms)</option>
                    <option value="pro">Pro Plan ($15/mo · 20 rooms)</option>
                    <option value="premium">Premium Plan ($45/mo · Unlimited)</option>
                  </select>
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
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-black transition-colors">
                      <Lock className="w-5 h-5" />
                    </div>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-12 pl-12 pr-4 rounded-xl border-border/40 bg-white shadow-sm focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all mt-4"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-border/60" />
                <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest bg-white px-2">Or</span>
                <div className="flex-1 h-px bg-border/60" />
              </div>

              <Button
                type="button"
                variant="outline"
                disabled
                className="w-full h-12 rounded-xl border-border/40 bg-white shadow-sm font-semibold text-sm flex items-center justify-center gap-3 opacity-50 cursor-not-allowed"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google (coming soon)
              </Button>
            </form>

            <p className="text-center text-sm font-medium text-muted-foreground pt-2">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                Sign In
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
              All-in-one dorm management
            </h2>
            <p className="text-base font-medium text-blue-50 max-w-sm drop-shadow-md">
              From billing to maintenance, handle everything elegantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
