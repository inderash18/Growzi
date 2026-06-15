"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Globe, 
  Save, 
  ExternalLink, 
  Layout, 
  Sliders, 
  Eye, 
  Settings, 
  FileCode2, 
  CheckCircle,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

type PortfolioContent = {
  slug: string;
  isPublished: boolean;
  theme: 'MINIMAL' | 'VIBRANT' | 'DARK' | 'LIGHT';
  heroTitle: string;
  heroSubtitle: string;
  aboutMe: string;
  github: string;
  linkedin: string;
  email: string;
};

const defaultPortfolio: PortfolioContent = {
  slug: "alex-carter",
  isPublished: true,
  theme: "MINIMAL",
  heroTitle: "Building solutions that solve real-world problems",
  heroSubtitle: "Computer Science student at Apex Engineering College specializing in Next.js and PostgreSQL architectures.",
  aboutMe: "I am a passionate software developer eager to build scalable web applications. I focus on clean code, database query optimizations, and seamless user experiences.",
  github: "https://github.com/alexcarter",
  linkedin: "https://linkedin.com/in/alexcarter",
  email: "alex.carter@apex.edu",
};

export default function PortfolioBuilder() {
  const { currentTenant } = useTenantStore();

  const [portfolio, setPortfolio] = useState<PortfolioContent>(defaultPortfolio);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSlugChange = (val: string) => {
    const sanitized = val.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    setPortfolio({ ...portfolio, slug: sanitized });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Globe className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Portfolio Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure your public portfolio landing page to showcase projects, skills, and resume details.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          {portfolio.isPublished && (
            <Link
              href={`/p/${portfolio.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              <Eye className="h-4 w-4" /> View Live Page
            </Link>
          )}

          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg border border-indigo-500/30"
            style={{ 
              backgroundColor: currentTenant?.secondaryColor,
              boxShadow: `0 4px 14px ${currentTenant?.secondaryColor}25`
            }}
          >
            <Save className="h-4 w-4" /> 
            {isSaved ? "Saved Changes" : "Save Changes"}
          </button>
        </div>
      </div>

      {portfolio.isPublished && (
        <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl text-indigo-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="h-5 w-5 text-indigo-400 shrink-0" />
            <div>
              <span className="text-xs font-bold block text-white">Your Portfolio is Live!</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Recruiters can view it at:</span>
            </div>
          </div>
          <Link 
            href={`/p/${portfolio.slug}`}
            target="_blank"
            className="text-xs font-bold text-white hover:underline flex items-center gap-1 bg-indigo-600 px-3.5 py-2 rounded-lg"
            style={{ backgroundColor: currentTenant?.secondaryColor }}
          >
            growzi.com/p/{portfolio.slug}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* Configuration Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COMPONENT: CONFIGURATORS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Metadata Settings */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
              <Settings className="h-4 w-4 text-indigo-400" /> Basic Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Public URL Slug</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-600 text-xs font-sans pointer-events-none">
                    /p/
                  </span>
                  <input
                    type="text"
                    required
                    value={portfolio.slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="alex-carter"
                    className="w-full pl-8 pr-4 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Theme Layout Style</label>
                <select
                  value={portfolio.theme}
                  onChange={(e) => setPortfolio({ ...portfolio, theme: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-855 rounded-lg text-xs text-slate-300 focus:outline-none"
                >
                  <option value="MINIMAL">Minimalist Mono</option>
                  <option value="VIBRANT">Vibrant Gradient</option>
                  <option value="DARK">Sleek Dark Mode</option>
                  <option value="LIGHT">Clean Light Mode</option>
                </select>
              </div>

              <div className="md:col-span-2 flex items-center gap-3 p-4 bg-slate-950 border border-slate-900 rounded-xl">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={portfolio.isPublished}
                  onChange={(e) => setPortfolio({ ...portfolio, isPublished: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-800 text-indigo-600 bg-slate-950 focus:ring-indigo-500"
                />
                <div>
                  <label htmlFor="isPublished" className="text-xs font-bold text-slate-200 block cursor-pointer">
                    Publish Portfolio Landing Page
                  </label>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Make your portfolio page indexable and visible via the public URL.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Layout Content Editor */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
              <Sliders className="h-4 w-4 text-indigo-400" /> Hero & Header Content
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Hero Landing Title</label>
                <input
                  type="text"
                  required
                  value={portfolio.heroTitle}
                  onChange={(e) => setPortfolio({ ...portfolio, heroTitle: e.target.value })}
                  placeholder="e.g. Building scalable web experiences"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Hero Subtitle</label>
                <textarea
                  required
                  value={portfolio.heroSubtitle}
                  onChange={(e) => setPortfolio({ ...portfolio, heroSubtitle: e.target.value })}
                  placeholder="Describe your current status and focus area..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Detailed Biography (About Me)</label>
                <textarea
                  required
                  value={portfolio.aboutMe}
                  onChange={(e) => setPortfolio({ ...portfolio, aboutMe: e.target.value })}
                  placeholder="Describe your history, passion, and engineering approach..."
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Social Links configuration */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
              <Globe className="h-4 w-4 text-indigo-400" /> Professional Connections
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">GitHub URL</label>
                <input
                  type="url"
                  value={portfolio.github}
                  onChange={(e) => setPortfolio({ ...portfolio, github: e.target.value })}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">LinkedIn URL</label>
                <input
                  type="url"
                  value={portfolio.linkedin}
                  onChange={(e) => setPortfolio({ ...portfolio, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Public Email</label>
                <input
                  type="email"
                  value={portfolio.email}
                  onChange={(e) => setPortfolio({ ...portfolio, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: PREVIEW SCREEN DIALOGUE */}
        <div>
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl sticky top-6 text-center space-y-4">
            <Layout className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
            <h3 className="font-bold text-white text-sm">Theme Blueprint preview</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Below is a miniature visual layout preview using the <strong className="text-slate-300">{portfolio.theme}</strong> theme preset.
            </p>

            <div className={`border rounded-xl p-4 text-left font-sans select-none overflow-hidden aspect-[4/3] relative flex flex-col justify-between ${
              portfolio.theme === 'DARK' ? "bg-slate-950 text-slate-100 border-slate-900" :
              portfolio.theme === 'LIGHT' ? "bg-white text-slate-900 border-slate-200" :
              portfolio.theme === 'VIBRANT' ? "bg-gradient-to-tr from-indigo-950 via-slate-950 to-blue-950 text-slate-100 border-slate-900" :
              "bg-zinc-950 text-zinc-100 border-zinc-900"
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b pb-2 text-[8px] opacity-60">
                  <span className="font-bold">Alex Carter</span>
                  <div className="flex gap-2">
                    <span>About</span>
                    <span>Projects</span>
                  </div>
                </div>

                <div className="pt-2">
                  <h4 className="text-[10px] font-extrabold leading-tight text-white line-clamp-2" style={{ color: portfolio.theme === 'LIGHT' ? '#0f172a' : 'white' }}>
                    {portfolio.heroTitle}
                  </h4>
                  <p className="text-[8px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {portfolio.heroSubtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t text-[8px] flex justify-between items-center opacity-60">
                <span>Created via Growzi Builder</span>
                <span className="flex items-center gap-0.5">Live Link <ArrowRight className="h-2 w-2" /></span>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
