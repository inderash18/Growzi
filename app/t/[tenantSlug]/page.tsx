"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  ArrowRight, 
  BookOpen, 
  Trophy, 
  Users, 
  Upload, 
  Play, 
  CheckCircle, 
  Clock, 
  Plus, 
  Sparkles,
  TrendingUp,
  Activity,
  FileCheck,
  Globe
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDate } from "@/lib/utils";

export default function TenantDashboard() {
  const { currentTenant, activeRole } = useTenantStore();
  const { user } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple transition animation delay
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || !currentTenant) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-900 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 bg-slate-900 rounded-xl animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-96 bg-slate-900 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-900 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  // --- RENDERING Student Dashboard ---
  if (activeRole === "STUDENT") {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Card */}
        <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 p-8 rounded-2xl overflow-hidden shadow-2xl">
          <div 
            className="absolute right-0 bottom-0 top-0 w-80 opacity-10 pointer-events-none blur-2xl rounded-full"
            style={{ backgroundColor: currentTenant.secondaryColor }}
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold mb-3">
                <Sparkles className="h-3.5 w-3.5" style={{ color: currentTenant.secondaryColor }} />
                Student Workspace Active
              </div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                Welcome back, {user?.name || "Student"}!
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Ready to accelerate your placements? Track your assessments, update your portfolio, and access learning files uploaded by faculty.
              </p>
            </div>
            <Link
              href={`/t/${currentTenant.slug}/placement`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all shadow-lg border border-indigo-500/30 shrink-0"
              style={{ 
                backgroundColor: currentTenant.secondaryColor,
                boxShadow: `0 4px 14px ${currentTenant.secondaryColor}25`
              }}
            >
              Start Placement Prep
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl relative overflow-hidden group">
            <BookOpen className="h-5 w-5 text-indigo-400 mb-3" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources Available</h3>
            <p className="text-2xl font-bold text-white mt-1">12</p>
            <span className="text-[10px] text-indigo-400 font-medium block mt-1">Across 3 courses</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl relative overflow-hidden group">
            <Trophy className="h-5 w-5 text-emerald-400 mb-3" style={{ color: currentTenant.secondaryColor }} />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assessments Taken</h3>
            <p className="text-2xl font-bold text-white mt-1">3/5</p>
            <span className="text-[10px] text-slate-500 font-medium block mt-1">Average score: 85%</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl relative overflow-hidden group">
            <FileText className="h-5 w-5 text-blue-400 mb-3" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume Profile</h3>
            <p className="text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-1.5 text-sm">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-500" /> Software Engineer
            </p>
            <span className="text-[10px] text-slate-500 font-medium block mt-1">Last edited 2 days ago</span>
          </div>

          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl relative overflow-hidden group">
            <Activity className="h-5 w-5 text-purple-400 mb-3" />
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Public Portfolio</h3>
            <p className="text-2xl font-bold text-emerald-400 mt-1 flex items-center gap-1.5 text-sm">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-500" /> Published Live
            </p>
            <span className="text-[10px] text-indigo-400 font-medium block mt-1">/p/alex-carter</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Actions Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-400" /> Pending Tasks & Quizzes
                </h2>
                <Link 
                  href={`/t/${currentTenant.slug}/assessments`}
                  className="text-xs font-semibold hover:text-white transition-colors"
                  style={{ color: currentTenant.secondaryColor }}
                >
                  View All
                </Link>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-slate-800 transition-all">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">Algorithms & Data Structures Prep</h4>
                    <p className="text-xs text-slate-500 mt-1">Coding Assessment • 1 Question • 30 mins</p>
                  </div>
                  <Link
                    href={`/t/${currentTenant.slug}/assessments`}
                    className="h-8 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 text-slate-300 hover:text-white"
                  >
                    <Play className="h-3 w-3 fill-slate-300" /> Start
                  </Link>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-900 rounded-xl group hover:border-slate-800 transition-all">
                  <div>
                    <h4 className="font-bold text-sm text-slate-200">Aptitude Logical Reasoning Quiz</h4>
                    <p className="text-xs text-slate-500 mt-1">MCQ Assessment • 10 Questions • 15 mins</p>
                  </div>
                  <Link
                    href={`/t/${currentTenant.slug}/assessments`}
                    className="h-8 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold flex items-center gap-1.5 text-slate-300 hover:text-white"
                  >
                    <Play className="h-3 w-3 fill-slate-300" /> Start
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Resources */}
            <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-400" /> Newly Uploaded Resources
                </h2>
                <Link 
                  href={`/t/${currentTenant.slug}/resources`}
                  className="text-xs font-semibold hover:text-white transition-colors"
                  style={{ color: currentTenant.secondaryColor }}
                >
                  Resource Hub
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl">
                  <span className="px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-900 text-indigo-400 text-[9px] uppercase font-bold tracking-wider">
                    CSE
                  </span>
                  <h4 className="font-bold text-sm text-slate-200 mt-2">Computer Networks Study Guide</h4>
                  <p className="text-xs text-slate-500 mt-1">TCP/IP layer review, socket routing notes.</p>
                </div>
                <div className="p-4 bg-slate-950/60 border border-slate-900 rounded-xl">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-900 text-emerald-400 text-[9px] uppercase font-bold tracking-wider">
                    IT
                  </span>
                  <h4 className="font-bold text-sm text-slate-200 mt-2">Postgres Tuning Checklist</h4>
                  <p className="text-xs text-slate-500 mt-1">Indexing structures and explain plans overview.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts Panel */}
          <div className="space-y-6">
            <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl text-center flex flex-col items-center">
              <FileCheck className="h-10 w-10 text-indigo-400 mb-4" />
              <h3 className="font-bold text-white text-base">Resume Builder</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Choose templates customized for Software Engineering and Data Analyst roles. Compile and print directly.
              </p>
              <Link
                href={`/t/${currentTenant.slug}/resume`}
                className="w-full mt-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold transition-all border border-slate-800 flex items-center justify-center gap-1.5"
              >
                Open Resume Workspace
              </Link>
            </div>

            <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl text-center flex flex-col items-center">
              <Globe className="h-10 w-10 text-indigo-400 mb-4" />
              <h3 className="font-bold text-white text-base">Public Portfolio</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Showcase your projects and code profiles. Generate a public website layout to share with recruiters.
              </p>
              <Link
                href={`/t/${currentTenant.slug}/portfolio`}
                className="w-full mt-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold transition-all border border-slate-800 flex items-center justify-center gap-1.5"
              >
                Customize Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDERING Faculty & Admin Dashboard ---
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Card */}
      <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 p-8 rounded-2xl overflow-hidden shadow-2xl">
        <div 
          className="absolute right-0 bottom-0 top-0 w-80 opacity-10 pointer-events-none blur-2xl rounded-full"
          style={{ backgroundColor: currentTenant.secondaryColor }}
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold mb-3">
              <Sparkles className="h-3.5 w-3.5" style={{ color: currentTenant.secondaryColor }} />
              Institution Administration Portal
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Growzi Console &ndash; {currentTenant.name}
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Track student onboarding analytics, upload dynamic resources, coordinate coding assessments, and review results reports.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href={`/t/${currentTenant.slug}/resources`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-all shrink-0"
            >
              <Upload className="h-4 w-4" />
              Upload Resource
            </Link>
            <Link
              href={`/t/${currentTenant.slug}/assessments`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg border border-indigo-500/30 shrink-0"
              style={{ 
                backgroundColor: currentTenant.secondaryColor,
                boxShadow: `0 4px 14px ${currentTenant.secondaryColor}25`
              }}
            >
              <Plus className="h-4 w-4" />
              Add Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl">
          <Users className="h-5 w-5 text-indigo-400 mb-3" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Students</h3>
          <p className="text-2xl font-bold text-white mt-1">124</p>
          <span className="text-[10px] text-indigo-400 font-medium block mt-1">+8% onboarding this week</span>
        </div>

        <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl">
          <BookOpen className="h-5 w-5 text-emerald-400 mb-3" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resources Distributed</h3>
          <p className="text-2xl font-bold text-white mt-1">42</p>
          <span className="text-[10px] text-slate-500 font-medium block mt-1">PDFs, videos, course links</span>
        </div>

        <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl">
          <Trophy className="h-5 w-5 text-blue-400 mb-3" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Quizzes Administered</h3>
          <p className="text-2xl font-bold text-white mt-1">6</p>
          <span className="text-[10px] text-slate-500 font-medium block mt-1">MCQ and Code compilers</span>
        </div>

        <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-xl">
          <TrendingUp className="h-5 w-5 text-purple-400 mb-3" />
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placement Readiness</h3>
          <p className="text-2xl font-bold text-indigo-400 mt-1" style={{ color: currentTenant.secondaryColor }}>82%</p>
          <span className="text-[10px] text-slate-500 font-medium block mt-1">Goal target: 90%</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left main: Pending Submissions review */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-indigo-400" /> Pending Test Submissions
            </h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Alex Carter</h4>
                  <p className="text-xs text-slate-500 mt-1">Algorithms & Data Structures Prep • JavaScript code solution</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-full bg-yellow-950 border border-yellow-900 text-yellow-400 text-[9px] uppercase font-bold tracking-wider">
                    Awaiting Review
                  </span>
                  <Link
                    href={`/t/${currentTenant.slug}/assessments/reports`}
                    className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold flex items-center text-slate-300"
                  >
                    Evaluate
                  </Link>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="font-bold text-sm text-slate-200">Sophia Wang</h4>
                  <p className="text-xs text-slate-500 mt-1">Algorithms & Data Structures Prep • Python code solution</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded-full bg-yellow-950 border border-yellow-900 text-yellow-400 text-[9px] uppercase font-bold tracking-wider">
                    Awaiting Review
                  </span>
                  <Link
                    href={`/t/${currentTenant.slug}/assessments/reports`}
                    className="h-8 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold flex items-center text-slate-300"
                  >
                    Evaluate
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Quick actions & subscription information */}
        <div className="space-y-6">
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl">
            <h3 className="font-bold text-white text-base mb-4">Workspace Settings</h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span>Tenant Type</span>
                <span className="text-slate-200 font-semibold">{currentTenant.type}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-900">
                <span>Billing Period</span>
                <span className="text-slate-200 font-semibold">Enterprise Subscription</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Created At</span>
                <span className="text-slate-200 font-semibold">{formatDate(currentTenant.createdAt || new Date())}</span>
              </div>
            </div>
            <Link
              href={`/t/${currentTenant.slug}/admin/settings`}
              className="w-full mt-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold transition-all border border-slate-800 flex items-center justify-center gap-1.5"
            >
              Configure Branding Colors
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
