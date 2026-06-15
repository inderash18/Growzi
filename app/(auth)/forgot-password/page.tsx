"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Simulate sending password reset email
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSent(true);
    } catch (err) {
      setError("An error occurred trying to send the email.");
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
          <h2 className="text-xl font-semibold">Reset password</h2>
          <p className="text-slate-400 text-sm mt-1">We will email you a link to reset your password</p>
        </div>

        {error && (
          <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {isSent ? (
          <div className="space-y-4 text-center">
            <div className="bg-indigo-950/40 border border-indigo-500/30 text-indigo-200 text-sm p-4 rounded-lg">
              Check your inbox! We have sent password reset instructions to <span className="font-semibold">{email}</span>.
            </div>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mt-4"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-sm font-semibold rounded-lg text-white transition-colors border border-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
