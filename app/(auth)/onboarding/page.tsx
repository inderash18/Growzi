"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowRight, User, BookOpen, Layers, CheckCircle2, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/store/useAuthStore";

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useAuthStore();
  const [step, setStep] = useState(1);

  // Form states
  const [college, setCollege] = useState("Apex Engineering College");
  const [department, setDepartment] = useState("Computer Science");
  const [phone, setPhone] = useState("+1 (555) 019-2834");
  const [bio, setBio] = useState("Aspiring full-stack developer eager to learn new architectures.");
  const [theme, setTheme] = useState<'MINIMAL' | 'DARK' | 'VIBRANT'>('MINIMAL');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update session store
      if (user) {
        setUser({
          ...user,
          name: user.name || "Alex Carter",
        });
      }
      
      toast("Onboarding configuration completed!", "success");
      
      if (user?.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      toast("Setup failed. Try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-center items-center py-12 px-6 relative font-sans overflow-x-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0e_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 pointer-events-none" />

      {/* Stepper Progress bar */}
      <div className="w-full max-w-lg mb-8 select-none">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-zinc-900 -translate-y-1/2 z-0" />
          <div className="absolute left-0 top-1/2 h-0.5 bg-indigo-500 -translate-y-1/2 z-0 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }} />

          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-7 w-7 rounded-full border flex items-center justify-center text-xs font-bold relative z-10 transition-all duration-300 ${
                step >= s
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-600/10"
                  : "bg-zinc-950 border-zinc-900 text-zinc-550"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] font-bold text-zinc-550 uppercase tracking-widest mt-2 px-1">
          <span>Institutions</span>
          <span>Profile Specs</span>
          <span>Theme Presets</span>
        </div>
      </div>

      <Card className="w-full max-w-lg border-zinc-850 shadow-2xl animate-scale-in">
        <CardHeader className="h-14 px-6 border-b border-zinc-900/60 flex flex-row items-center justify-between select-none">
          <CardTitle>Welcome Onboard</CardTitle>
          <CardDescription className="mt-0 text-[10px] uppercase font-bold text-zinc-500">Step {step} of 3</CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-4 animate-scale-in">
              <div className="space-y-1 select-none">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5"><GraduationCap className="h-4.5 w-4.5 text-indigo-400" /> College Credentials</h3>
                <p className="text-xs text-zinc-550 font-normal leading-relaxed">Provide details of your academic campus database parameters.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Institutional Name / College</Label>
                  <Input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Department Course</Label>
                  <Input
                    type="text"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-scale-in">
              <div className="space-y-1 select-none">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5"><User className="h-4.5 w-4.5 text-indigo-400" /> Personal Identity</h3>
                <p className="text-xs text-zinc-550 font-normal leading-relaxed">Add bio details and phone indicators for public verification.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Phone Verification</Label>
                  <Input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <Label>Short Biography (Bio)</Label>
                  <Textarea
                    required
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-scale-in">
              <div className="space-y-1 select-none">
                <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5"><Layers className="h-4.5 w-4.5 text-indigo-400" /> Theme Configuration</h3>
                <p className="text-xs text-zinc-550 font-normal leading-relaxed">Select a sub-theme styling catalog configuration preset.</p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 select-none">
                {(['MINIMAL', 'DARK', 'VIBRANT'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTheme(t)}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-center items-center gap-2 ${
                      theme === t
                        ? "bg-zinc-900/40 border-indigo-500 text-indigo-400 font-bold"
                        : "bg-zinc-950 border-zinc-900 text-zinc-500 hover:border-zinc-800"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold tracking-wider">{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stepper actions footer */}
          <div className="flex justify-between items-center border-t border-zinc-900/60 pt-6 mt-6 select-none">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={step === 1 || isSubmitting}
              className="font-semibold"
            >
              Back
            </Button>

            {step < 3 ? (
              <Button
                type="button"
                variant="indigo"
                size="sm"
                onClick={handleNext}
                className="font-semibold"
              >
                Next <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="button"
                variant="indigo"
                size="sm"
                isLoading={isSubmitting}
                onClick={handleFinish}
                className="font-semibold"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
