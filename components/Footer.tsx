"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast("Thank you for subscribing to our newsletter!", "success");
    }, 800);
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-16 px-6 select-none relative z-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Upper section: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-max">
              <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-extrabold tracking-tight text-slate-900">
                Growzi
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Discover project ideas, build professional resumes and portfolios, access study resources, and hire us for responsive website services.
            </p>
          </div>

          {/* Newsletter (Referencing Image 4) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-150 p-6 rounded-2xl space-y-4 max-w-lg lg:ml-auto w-full">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Subscribe to our newsletter</h4>
              <p className="text-[10px] text-slate-500">Subscribe to receive insights, resources updates, and expert tips.</p>
            </div>

            <form onSubmit={handleSubscribe} className="flex gap-2 flex-col sm:flex-row">
              <Input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-slate-200 shadow-sm"
              />
              <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting} className="font-semibold shrink-0">
                Subscribe
              </Button>
            </form>
            <p className="text-[8px] text-slate-400">
              By subscribing you agree to our <Link href="#" className="underline hover:text-slate-600">Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Middle section: Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
          
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Platform</h5>
            <nav className="flex flex-col gap-2.5 text-xs text-slate-500 font-semibold">
              <Link href="/projects" className="hover:text-slate-900 transition-colors">Project Hub</Link>
              <Link href="/resources" className="hover:text-slate-900 transition-colors">Study Resources</Link>
              <Link href="/services" className="hover:text-slate-900 transition-colors">Website Services</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Creator Tools</h5>
            <nav className="flex flex-col gap-2.5 text-xs text-slate-500 font-semibold">
              <Link href="/dashboard/resume" className="hover:text-slate-900 transition-colors">Resume Builder</Link>
              <Link href="/dashboard/portfolio" className="hover:text-slate-900 transition-colors">Portfolio Creator</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Support desk</h5>
            <nav className="flex flex-col gap-2.5 text-xs text-slate-500 font-semibold">
              <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact Support</Link>
              <Link href="/dashboard/tickets" className="hover:text-slate-900 transition-colors">Submit Ticket</Link>
            </nav>
          </div>

          <div className="space-y-3">
            <h5 className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">Contact Info</h5>
            <div className="flex flex-col gap-2.5 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-2 font-semibold text-slate-500"><Mail className="h-4 w-4 shrink-0 text-slate-400" /> support@growzi.in</span>
              <span className="flex items-center gap-2 font-semibold text-slate-500"><Phone className="h-4 w-4 shrink-0 text-slate-400" /> +91 (800) 555-0192</span>
              <span className="flex items-center gap-2 font-semibold text-slate-500"><MapPin className="h-4 w-4 shrink-0 text-slate-400" /> Bangalore, KA, India</span>
            </div>
          </div>
        </div>

        {/* Lower section: Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-slate-100 text-[10px] text-slate-450 font-semibold">
          <p>&copy; 2026 Growzi. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
