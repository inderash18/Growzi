"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, Lock, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      toast("Password updated successfully!", "success");
    } catch (err) {
      setError("Failed to update password. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row relative font-sans overflow-x-hidden">
      
      {/* LEFT COLUMN: BRANDING & DETAILS */}
      <div className="hidden md:flex md:w-1/2 bg-zinc-950 border-r border-zinc-900 p-12 flex-col justify-between relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />
        <Link href="/" className="flex items-center gap-2.5 relative z-10 group max-w-max">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Growzi</span>
        </Link>
        <div className="space-y-4 max-w-md relative z-10">
          <h2 className="text-3xl font-extrabold text-white">Update Credentials</h2>
          <p className="text-zinc-400 text-sm">
            Set up a secure passcode parameters to protect your portfolio builders and requests history.
          </p>
        </div>
        <div className="text-[10px] text-zinc-650">Growzi Platform</div>
      </div>

      {/* RIGHT COLUMN: RESET FORM */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 relative z-10">
        <div className="w-full max-w-sm space-y-6">
          
          <div className="text-center md:text-left space-y-2 select-none">
            <h1 className="text-2xl font-bold tracking-tight text-white">New Password</h1>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed">
              Create a secure passcode containing at least 6 characters.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/20 border border-rose-900/30 text-rose-455 text-xs rounded-xl font-semibold flex items-center gap-2 animate-scale-in">
              <Sparkles className="h-4.5 w-4.5 shrink-0" /> {error}
            </div>
          )}

          {isSuccess ? (
            <div className="space-y-4 animate-scale-in">
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/30 rounded-xl text-emerald-400 text-xs font-semibold flex items-start gap-2">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>Your password has been reset successfully. Click return below to authenticate.</span>
              </div>
              <Link href="/login" className="w-full block">
                <Button variant="secondary" size="md" className="w-full font-bold select-none cursor-pointer flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Go to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>New Password</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-655 pointer-events-none">
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label>Confirm New Password</Label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-655 pointer-events-none">
                    <Lock className="h-4 w-4" />
                  </span>
                  <Input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="indigo"
                size="md"
                isLoading={isSubmitting}
                className="w-full font-bold select-none cursor-pointer mt-2"
              >
                Reset Password
              </Button>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
