"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Code2, 
  Terminal, 
  FileText, 
  Globe, 
  BookOpen, 
  Sparkles, 
  Smartphone,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans">
      
      {/* Background Grid - Premium SaaS style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E8F0_1px,transparent_1px),linear-gradient(to_bottom,#E2E8F0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Hero Section (Reference Image 1 style: Lando layout) */}
      <section className="relative pt-24 pb-16 px-6 max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 bg-white text-slate-500 text-[10px] font-bold tracking-wider uppercase select-none shadow-sm">
          <Sparkles className="h-3 w-3 text-blue-600" />
          - Growzi Academic Platform -
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.08] font-sans">
          Build Projects.<br />
          Build Your Resume.<br />
          <span className="text-blue-600">Build Your Future.</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Discover project ideas, request custom projects, build professional resumes and portfolios, and access study resources.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto select-none">
          <Link href="/projects" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto font-bold px-6 h-11 shadow-md" size="lg" variant="primary">
              Browse Projects
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto text-slate-700 bg-white border-slate-200 hover:bg-slate-50 font-bold px-6 h-11" size="lg">
              Request Custom Project
            </Button>
          </Link>
        </div>

        {/* Trusted By logo strip (Reference Image 1 Lando style) */}
        <div className="pt-16 space-y-4 select-none">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Trusted by student developers at world-class institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400 text-xs font-extrabold">
            <span className="tracking-tight hover:text-slate-600 transition-colors">Apex Engineering</span>
            <span className="tracking-tight hover:text-slate-600 transition-colors">State Tech University</span>
            <span className="tracking-tight hover:text-slate-600 transition-colors">St. Xavier Institute</span>
            <span className="tracking-tight hover:text-slate-600 transition-colors">National Coding Academy</span>
            <span className="tracking-tight hover:text-slate-600 transition-colors">City Tech College</span>
          </div>
        </div>
      </section>

      {/* Core Capability Offerings Container (Rounded clean layout) */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm space-y-16">
          
          <div className="text-center space-y-2 max-w-md mx-auto select-none">
            <span className="text-[9px] font-bold text-blue-600 tracking-widest uppercase block">Refocused Platform</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              One Unified Workspace
            </h2>
            <p className="text-xs text-slate-500 font-normal leading-relaxed">
              We eliminated the enterprise bloat to build a clean client platform designed to help you construct software and showcase achievements.
            </p>
          </div>

          {/* Core Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Goal 1: Browse Projects */}
            <Link href="/projects" className="group block">
              <Card className="h-full group-hover:border-slate-300 transition-all border-slate-150">
                <CardHeader className="p-6">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                    <Code2 className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Browse Projects</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500">
                    Discover project blueprints in Python, MERN Stack, Java, Android, IoT, Cybersecurity, and AI.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Goal 2: Request Custom Projects */}
            <Link href="/dashboard" className="group block">
              <Card className="h-full group-hover:border-slate-300 transition-all border-slate-150">
                <CardHeader className="p-6">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                    <Terminal className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Request Custom Projects</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500">
                    Need a customized academic prototype? Submit your specific requirements and track build status.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Goal 3: Build Resumes */}
            <Link href="/dashboard/resume" className="group block">
              <Card className="h-full group-hover:border-slate-300 transition-all border-slate-150">
                <CardHeader className="p-6">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Build Resumes</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500">
                    Generate recruiter-optimized software engineer resumes and export them cleanly as PDF files.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Goal 4: Create Portfolios */}
            <Link href="/dashboard/portfolio" className="group block">
              <Card className="h-full group-hover:border-slate-300 transition-all border-slate-150">
                <CardHeader className="p-6">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                    <Globe className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Create Portfolios</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500">
                    Launch a public personal portfolio at growzi.in/p/username to link your blueprints and certificates.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Goal 5: Study Resources */}
            <Link href="/resources" className="group block">
              <Card className="h-full group-hover:border-slate-300 transition-all border-slate-150">
                <CardHeader className="p-6">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                    <BookOpen className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Access Resources</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500">
                    Download CSE/IT semesters question papers, lab manual sheets, slides, and reference files.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Goal 6: Website Services */}
            <Link href="/services" className="group block">
              <Card className="h-full group-hover:border-slate-300 transition-all border-slate-150">
                <CardHeader className="p-6">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-500 group-hover:text-blue-600 transition-colors">
                    <Smartphone className="h-4.5 w-4.5" />
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Website Services</CardTitle>
                  <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500">
                    Order custom static pages, portfolios, or full-stack database application builds from our team.
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
