"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTenantStore } from "@/store/useTenantStore";

export default function LoginPage() {
  const router = useRouter();
  const { setUser, setSession, setLoading } = useAuthStore();
  const { setMemberships } = useTenantStore();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock users database to support instant testing
  const presetUsers = [
    {
      email: "superadmin@growzi.com",
      name: "Super Admin",
      role: "SUPER_ADMIN" as const,
      memberships: [],
    },
    {
      email: "admin@apex.edu",
      name: "Dr. Rajesh Kumar",
      role: "ADMIN" as const,
      memberships: [
        {
          id: "m1",
          role: "ADMIN" as const,
          tenant: {
            id: "t1",
            name: "Apex Engineering College",
            slug: "apex-engineering",
            type: "COLLEGE",
            primaryColor: "#0f172a",
            secondaryColor: "#3b82f6",
            logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop&q=80",
          }
        }
      ]
    },
    {
      email: "faculty@apex.edu",
      name: "Prof. Sarah Miller",
      role: "FACULTY" as const,
      memberships: [
        {
          id: "m2",
          role: "FACULTY" as const,
          tenant: {
            id: "t1",
            name: "Apex Engineering College",
            slug: "apex-engineering",
            type: "COLLEGE",
            primaryColor: "#0f172a",
            secondaryColor: "#3b82f6",
            logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop&q=80",
          }
        }
      ]
    },
    {
      email: "student@apex.edu",
      name: "Alex Carter",
      role: "STUDENT" as const,
      memberships: [
        {
          id: "m3",
          role: "STUDENT" as const,
          tenant: {
            id: "t1",
            name: "Apex Engineering College",
            slug: "apex-engineering",
            type: "COLLEGE",
            primaryColor: "#0f172a",
            secondaryColor: "#3b82f6",
            logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop&q=80",
          }
        }
      ]
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Look up inside preset credentials first for instant testing
      const matched = presetUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (matched) {
        // Mock successful login
        setUser({
          id: matched.email === "superadmin@growzi.com" ? "sa" : "usr-" + matched.role.toLowerCase(),
          email: matched.email,
          name: matched.name,
          role: matched.role,
        });
        setSession({ access_token: "mock-token", user: matched });
        setMemberships(matched.memberships);
        setLoading(false);
        
        router.push("/select-workspace");
        return;
      }

      // Fallback: Check if they input values or if we should warn
      if (email && password) {
        // Create an on-the-fly student user if not in presets to be developer friendly
        setUser({
          id: "usr-dynamic",
          email: email,
          name: email.split("@")[0],
          role: "STUDENT",
        });
        setSession({ access_token: "mock-token" });
        setMemberships([
          {
            id: "m-dynamic",
            role: "STUDENT",
            tenant: {
              id: "t1",
              name: "Apex Engineering College",
              slug: "apex-engineering",
              type: "COLLEGE",
              primaryColor: "#0f172a",
              secondaryColor: "#3b82f6",
            }
          }
        ]);
        setLoading(false);
        router.push("/select-workspace");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An unexpected error occurred during sign in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = (emailStr: string) => {
    setEmail(emailStr);
    setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center py-12 px-6 relative font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/40 border border-slate-800 p-8 rounded-2xl relative z-10 backdrop-blur-md shadow-2xl shadow-indigo-950/25">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Growzi</span>
          </Link>
          <h2 className="text-xl font-semibold">Welcome back</h2>
          <p className="text-slate-400 text-sm mt-1">Sign in to access your dashboard</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <Link 
                href="/forgot-password" 
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-semibold rounded-lg text-white transition-colors border border-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Sign up
          </Link>
        </p>

        {/* Preset accounts container */}
        <div className="mt-8 pt-6 border-t border-slate-800/60">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3.5 text-center">
            Instant Role Presets for Testing
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleQuickLogin("student@apex.edu")}
              className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-left hover:border-indigo-500/30 hover:bg-slate-900/50 transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="font-semibold block text-slate-200">Alex Carter</span>
                <span className="text-slate-500 block text-[10px]">Role: Student</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleQuickLogin("faculty@apex.edu")}
              className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-left hover:border-indigo-500/30 hover:bg-slate-900/50 transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="font-semibold block text-slate-200">Prof. Sarah</span>
                <span className="text-slate-500 block text-[10px]">Role: Faculty</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleQuickLogin("admin@apex.edu")}
              className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-left hover:border-indigo-500/30 hover:bg-slate-900/50 transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="font-semibold block text-slate-200">Dr. Rajesh</span>
                <span className="text-slate-500 block text-[10px]">Role: Inst. Admin</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </button>

            <button
              onClick={() => handleQuickLogin("superadmin@growzi.com")}
              className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-left hover:border-indigo-500/30 hover:bg-slate-900/50 transition-colors group flex items-center justify-between"
            >
              <div>
                <span className="font-semibold block text-slate-200">Super Admin</span>
                <span className="text-slate-500 block text-[10px]">Role: Platform Owner</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
