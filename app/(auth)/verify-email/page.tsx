"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function VerifyEmailPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, val: string) => {
    const clean = val.replace(/[^0-9]/g, "").substring(0, 1);
    const newCode = [...code];
    newCode[index] = clean;
    setCode(newCode);

    // Auto focus next input
    if (clean && index < 3) {
      const nextInput = document.getElementById(`code-in-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-in-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const fullCode = code.join("");
    if (fullCode.length < 4) {
      setError("Please input the 4-digit code");
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast("Email verified successfully!", "success");
      router.push("/onboarding");
    } catch (err) {
      setError("Invalid verification code. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    toast("New verification code dispatched to your email inbox.", "success");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row relative font-sans overflow-x-hidden">
      
      {/* LEFT COLUMN: BRANDING */}
      <div className="hidden md:flex md:w-1/2 bg-zinc-950 border-r border-zinc-900 p-12 flex-col justify-between relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />
        <Link href="/" className="flex items-center gap-2.5 relative z-10 group max-w-max">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Growzi</span>
        </Link>
        <div className="space-y-4 max-w-md relative z-10">
          <h2 className="text-3xl font-extrabold text-white">Confirm Account</h2>
          <p className="text-zinc-400 text-sm">
            Please verify your enrollment credentials email address parameters to continue onboarding logs.
          </p>
        </div>
        <div className="text-[10px] text-zinc-650">Growzi Platform</div>
      </div>

      {/* RIGHT COLUMN: VERIFICATION CODE CARD */}
      <div className="flex-1 flex flex-col justify-center items-center py-12 px-6 relative z-10">
        <div className="w-full max-w-sm space-y-6">
          
          <div className="text-center md:text-left space-y-2 select-none">
            <h1 className="text-2xl font-bold tracking-tight text-white">Verify Email</h1>
            <p className="text-xs text-zinc-500 font-normal leading-relaxed">
              Input the 4-digit code dispatched to your institutional inbox parameters.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/20 border border-rose-900/30 text-rose-455 text-xs rounded-xl font-semibold flex items-center gap-2 animate-scale-in">
              <Sparkles className="h-4.5 w-4.5 shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex gap-4 justify-between max-w-xs mx-auto md:mx-0">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  id={`code-in-${idx}`}
                  type="text"
                  required
                  maxLength={1}
                  value={code[idx]}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-14 h-14 bg-zinc-950 border border-zinc-800 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 rounded-xl text-center text-lg font-bold text-white focus:outline-none"
                />
              ))}
            </div>

            <Button
              type="submit"
              variant="indigo"
              size="md"
              isLoading={isSubmitting}
              className="w-full font-bold select-none cursor-pointer mt-4"
            >
              Verify Code
            </Button>
          </form>

          <div className="text-center md:text-left text-xs text-zinc-550 select-none">
            <span>Didn&apos;t receive email? </span>
            {timer > 0 ? (
              <span className="font-semibold text-zinc-400">Resend in {timer}s</span>
            ) : (
              <button 
                onClick={handleResend}
                className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors cursor-pointer"
              >
                Resend Code
              </button>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
