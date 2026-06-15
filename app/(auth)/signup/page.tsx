"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, Mail, User, CheckCircle2, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser, setSession, setLoading } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'STUDENT' | 'ADMIN'>('STUDENT');
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const mockUser = {
        id: "usr-" + Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: role,
      };

      setUser(mockUser);
      setSession({ access_token: "mock-token", user: mockUser });
      setLoading(false);
      toast("Account registered successfully!", "success");

      // Redirect directly to onboarding before accessing portal
      router.push("/onboarding");
    } catch (err) {
      setError("An error occurred creating your account.");
      toast("Sign up failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    toast("Google registration is in demo mode. Registering as test student.", "info");
    const mockUser = {
      id: "usr-google",
      email: "google.student@apex.edu",
      name: "Google Student",
      role: "STUDENT" as const,
    };
    setUser(mockUser);
    setSession({ access_token: "mock-token", user: mockUser });
    setLoading(false);
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen text-zinc-100 flex items-center justify-center relative font-sans overflow-hidden bg-zinc-950">
      
      {/* Background visual image */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80')" }} 
      />
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md" />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Visual Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-[10000ms]" />

      {/* Header Back Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors z-20 group font-semibold"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to home
      </Link>

      {/* Glassmorphic Container */}
      <div className="w-full max-w-[450px] px-6 py-8 relative z-10 animate-fade-in">
        <div className="bg-zinc-900/60 border border-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-8 space-y-6">
          
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2 group mb-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">Growzi</span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-white">Create an account</h1>
            <p className="text-xs text-zinc-400 font-normal">
              Join Growzi today and get instant workspace access.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/30 border border-rose-500/20 text-rose-300 text-xs rounded-xl font-semibold flex items-center gap-2 animate-scale-in">
              <Sparkles className="h-4 w-4 shrink-0 text-rose-400" /> 
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-zinc-400">Full Name</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
                  <User className="h-4 w-4" />
                </span>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Carter"
                  className="pl-10 bg-zinc-950/40 border-white/10 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500/10 shadow-none h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-400">Email Address</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
                  <Mail className="h-4 w-4" />
                </span>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@school.edu"
                  className="pl-10 bg-zinc-950/40 border-white/10 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500/10 shadow-none h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-zinc-400">Password</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500 pointer-events-none">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-zinc-950/40 border-white/10 text-zinc-100 placeholder-zinc-500 focus:border-blue-500 focus:ring-blue-500/10 shadow-none h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5 select-none">
              <Label className="text-zinc-400">Select Workspace Role</Label>
              <div className="grid grid-cols-2 gap-3">
                {(['STUDENT', 'ADMIN'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      role === r
                        ? "bg-blue-600 border-transparent text-white shadow-md shadow-blue-600/10"
                        : "bg-zinc-950/30 border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                    }`}
                  >
                    {r === 'ADMIN' ? 'Administrator' : 'Student'}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              variant="indigo"
              size="md"
              isLoading={isSubmitting}
              className="w-full font-bold select-none cursor-pointer bg-blue-600 hover:bg-blue-700 border-none h-10 rounded-xl mt-2"
            >
              Sign Up
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center select-none">
            <div className="flex-grow border-t border-white/5"></div>
            <span className="flex-shrink mx-4 text-[9px] uppercase tracking-wider text-zinc-500 font-bold">Or sign up with</span>
            <div className="flex-grow border-t border-white/5"></div>
          </div>

          {/* Social Sign Up */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full py-2.5 px-4 bg-zinc-950/30 hover:bg-zinc-950/50 border border-white/10 hover:border-white/15 rounded-xl text-xs font-bold text-zinc-200 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-inner"
          >
            <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.35 11.1H12v2.7h5.38c-.24 1.28-.96 2.37-2.04 3.1v2.6h3.29c1.92-1.77 3.02-4.38 3.02-7.4 0-.55-.1-1-.3-1.3z" fill="#4285F4" />
              <path d="M12 20.5c2.3 0 4.23-.76 5.64-2.08l-3.29-2.6c-.91.61-2.08.98-3.35.98-2.57 0-4.75-1.74-5.53-4.07H2.08v2.7C3.58 18.02 7.54 20.5 12 20.5z" fill="#34A853" />
              <path d="M6.47 12.73c-.2-.61-.31-1.27-.31-1.93s.11-1.32.31-1.93V6.2H2.08c-.69 1.38-1.08 2.94-1.08 4.6s.39 3.22 1.08 4.6l4.39-3.47z" fill="#FBBC05" />
              <path d="M12 6.18c1.25 0 2.37.43 3.25 1.27l2.44-2.44C16.22 3.61 14.28 3 12 3 7.54 3 3.58 5.48 2.08 8.2v2.7l4.39-2.07c.78-2.33 2.96-4.07 5.53-4.07z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-center text-zinc-400 select-none">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors font-bold">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}
