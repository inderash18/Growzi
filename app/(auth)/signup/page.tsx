"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, Mail, User, ShieldCheck, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTenantStore } from "@/store/useTenantStore";

export default function SignupPage() {
  const router = useRouter();
  const { setUser, setSession, setLoading } = useAuthStore();
  const { setMemberships } = useTenantStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'STUDENT' | 'FACULTY' | 'ADMIN'>('STUDENT');
  const [workspaceCode, setWorkspaceCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Simulate account registration
      const mockUser = {
        id: "usr-" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
      };

      setUser(mockUser);
      setSession({ access_token: "mock-token", user: mockUser });

      // Associate a default membership based on selected role
      setMemberships([
        {
          id: "m-new",
          role: role,
          tenant: {
            id: "t-new",
            name: workspaceCode || "My Registered Workspace",
            slug: (workspaceCode || "my-registered-workspace").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            type: role === "ADMIN" ? "TRAINING_INSTITUTE" : "COLLEGE",
            primaryColor: "#0f172a",
            secondaryColor: "#3b82f6",
          }
        }
      ]);
      setLoading(false);

      router.push("/select-workspace");
    } catch (err) {
      setError("An error occurred creating your account.");
    } finally {
      setIsSubmitting(false);
    }
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
          <h2 className="text-xl font-semibold">Create an account</h2>
          <p className="text-slate-400 text-sm mt-1">Get started with Growzi multi-tenant workspace</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <User className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Carter"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
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
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['STUDENT', 'FACULTY', 'ADMIN'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                  role === r
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                {r.charAt(0) + r.slice(1).toLowerCase()}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Workspace Code / Title
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <input
                type="text"
                required
                value={workspaceCode}
                onChange={(e) => setWorkspaceCode(e.target.value)}
                placeholder="e.g. Apex Engineering"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-200 placeholder-slate-600 transition-colors"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Enter your organization name to create or join a tenant workspace</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-semibold rounded-lg text-white transition-colors border border-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="text-xs text-center text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
