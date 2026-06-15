"use client";

import { useState } from "react";
import Link from "next/link";
import { GraduationCap, Mail, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSent(true);
      toast("Password reset instructions sent!", "success");
    } catch (err) {
      setError("An error occurred trying to send the email.");
      toast("Request failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row relative font-sans overflow-x-hidden">
      
      {/* LEFT COLUMN: BRANDING & TESTIMONIALS */}
      <div className="hidden md:flex md:w-1/2 bg-zinc-950 border-r border-zinc-900 p-12 flex-col justify-between relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />
        <div className="absolute top-[-20%] right-[-20%] w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 relative z-10 group max-w-max">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/10">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Growzi</span>
        </Link>

        {/* Value Prop */}
        <div className="space-y-6 max-w-md relative z-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Recover Your Password.
          </h2>
          <p className="text-zinc-400 text-sm font-normal leading-relaxed">
            Enter your institutional or profile email address to generate verification links, bypassing standard ERP login blocks.
          </p>

          <div className="space-y-3 pt-4">
            <div className="flex items-start gap-2.5 text-xs text-zinc-350">
              <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>Instant link generation for profile access recovery</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-zinc-350">
              <CheckCircle2 className="h-4.5 w-4.5 text-indigo-400 shrink-0 mt-0.5" />
              <span>Bypass database locking triggers</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-zinc-600 relative z-10 select-none">
          Growzi Platform &copy; {new Date().getFullYear()}
        </div>
      </div>

      {/* RIGHT COLUMN: RECOVERY CARD */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 relative z-10">
        <div className="w-full max-w-sm space-y-6">
          
          <div className="text-center md:text-left space-y-2 select-none">
            <h1 className="text-2xl font-bold tracking-tight text-white">Reset Password</h1>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed">
              We will email you reset guidelines and recovery credentials parameters.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/20 border border-rose-900/30 text-rose-455 text-xs rounded-xl font-semibold flex items-center gap-2 animate-scale-in">
              <Sparkles className="h-4.5 w-4.5 shrink-0" /> {error}
            </div>
          )}

          {isSent ? (
            <div className="space-y-5 animate-scale-in">
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-emerald-400 text-xs leading-relaxed font-semibold flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>Check your inbox! Password reset guidelines have been sent to {email}.</span>
              </div>

              <Link href="/login" className="w-full">
                <Button variant="secondary" size="md" className="w-full font-bold select-none cursor-pointer flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label>Email Address</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-655 pointer-events-none">
                    <Mail className="h-4 w-4" />
                  </span>
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.edu"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="indigo"
                size="md"
                isLoading={isSubmitting}
                className="w-full font-bold select-none cursor-pointer"
              >
                Send Reset Link
              </Button>

              <div className="text-center select-none">
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-350 transition-colors font-semibold"
                >
                  <ArrowLeft className="h-4 w-4" /> Return to Login
                </Link>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
