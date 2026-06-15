import Link from "next/link";
import { GraduationCap, ArrowRight, BookOpen, Trophy, Sparkles, Code2, Users2, BarChart3, Settings2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white relative overflow-hidden font-sans">
      {/* Decorative background grid and gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navigation */}
      <header className="relative border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Growzi
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20 border border-indigo-500/30"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-400 text-xs font-semibold mb-8 animate-fade-in shadow-inner">
          <Sparkles className="h-3.5 w-3.5" />
          The Multi-Tenant OS for Modern Institutions
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Empower Students. Scale Placement Readiness.
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          An enterprise multi-tenant B2B platform connecting colleges, placement cells, and students. Centralize learning, automate coding assessments, generate portfolios, and track placement metrics.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 border border-indigo-500/30 group"
          >
            Start Growing Free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 transition-all"
          >
            Access Workspace
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-20 px-6 max-w-7xl mx-auto border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Built for High-Scale Institutional Collaboration
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Everything your institution, department, faculty, and student communities need under a single secure workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all hover:bg-slate-900/60">
            <div className="h-12 w-12 rounded-xl bg-indigo-950 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-900 group-hover:text-indigo-300 transition-all">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Central Resource Hub</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Distribute PDFs, links, lectures, and images filterable by department, semester, and course subject dynamically.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all hover:bg-slate-900/60">
            <div className="h-12 w-12 rounded-xl bg-blue-950 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-900 group-hover:text-blue-300 transition-all">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Code & MCQ Assessments</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Automated testing module supporting timed MCQ and programming quizzes. Track scores with instant assessment metrics.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all hover:bg-slate-900/60">
            <div className="h-12 w-12 rounded-xl bg-emerald-950 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:bg-emerald-900 group-hover:text-emerald-300 transition-all">
              <Trophy className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Resumes & Portfolios</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Provide students with interactive builders to generate responsive online portfolio sites and compile standard PDF resumes.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-all hover:bg-slate-900/60">
            <div className="h-12 w-12 rounded-xl bg-indigo-950 border border-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-900 group-hover:text-indigo-300 transition-all">
              <Users2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Multi-Tenant Isolation</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every college, campus, or placement community receives a dedicated workspace with independent branding, user bases, and security settings.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all hover:bg-slate-900/60">
            <div className="h-12 w-12 rounded-xl bg-blue-950 border border-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-900 group-hover:text-blue-300 transition-all">
              <BarChart3 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Placement Analytics</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Track student readiness rating, resource usage, active profiles count, and average assessment scores in a real-time admin panel.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-slate-900/40 border border-slate-900 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-all hover:bg-slate-900/60">
            <div className="h-12 w-12 rounded-xl bg-emerald-950 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 group-hover:bg-emerald-900 group-hover:text-emerald-300 transition-all">
              <Settings2 className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2 text-white">Granular Access Control</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Clearly defined user roles (Super Admin, Admin, Faculty, Student) ensure everyone has appropriate workspace access.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 max-w-5xl mx-auto text-center relative z-10 border-t border-slate-900">
        <div className="bg-gradient-to-tr from-slate-900 to-indigo-950/40 border border-slate-800 p-12 md:p-16 rounded-3xl relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-white leading-tight">
            Ready to upgrade your placement process?
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
            Initialize your tenant workspace in seconds. Onboard students, share courses, and view student preparedness metrics instantly.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 border border-indigo-500/30 group"
          >
            Create Your Institution Space
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 relative z-10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center">
              <GraduationCap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-bold tracking-tight text-white">Growzi</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; 2026 Growzi B2B SaaS Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
