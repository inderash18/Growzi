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
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";

type PortfolioContent = {
  username: string;
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
  username: "alex-carter",
  isPublished: true,
  theme: "MINIMAL",
  heroTitle: "Building solutions that solve real-world problems",
  heroSubtitle: "Computer Science student at Apex Engineering College specializing in Next.js and PostgreSQL architectures.",
  aboutMe: "I am a passionate software developer eager to build scalable web applications. I focus on clean code, database query optimizations, and seamless user experiences.",
  github: "https://github.com/alexcarter",
  linkedin: "https://linkedin.com/in/alexcarter",
  email: "student@growzi.com",
};

export default function StudentPortfolioBuilder() {
  const [portfolio, setPortfolio] = useState<PortfolioContent>(defaultPortfolio);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleUsernameChange = (val: string) => {
    const sanitized = val.toLowerCase().replace(/[^a-z0-9_-]+/g, "-");
    setPortfolio({ ...portfolio, username: sanitized });
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <Globe className="h-6 w-6 text-blue-600" />
            Portfolio Builder
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Configure your public portfolio page to showcase projects, assessments, and links to recruiters.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          {portfolio.isPublished && (
            <Link
              href={`/p/${portfolio.username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="font-bold">
                <Eye className="h-4 w-4" /> View Live Page
              </Button>
            </Link>
          )}

          <Button
            onClick={handleSave}
            size="sm"
            className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Save className="h-4 w-4" /> 
            {isSaved ? "Saved Changes" : "Save Changes"}
          </Button>
        </div>
      </div>

      {portfolio.isPublished && (
        <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="h-5 w-5 text-blue-600 shrink-0" />
            <div>
              <span className="text-sm font-bold block text-slate-900">Your Portfolio is Live!</span>
              <span className="text-xs text-slate-500 block mt-0.5 font-medium">Recruiters can view it at:</span>
            </div>
          </div>
          <Link 
            href={`/p/${portfolio.username}`}
            target="_blank"
            className="text-sm font-bold text-blue-700 hover:text-blue-800 hover:underline flex items-center gap-1.5 bg-blue-100/50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors"
          >
            growzi.com/p/{portfolio.username}
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Editor grids */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left configs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Metadata */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                <Settings className="h-4 w-4 text-blue-500" /> Basic Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">Public URL Username</Label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 text-sm font-medium pointer-events-none">
                      /p/
                    </span>
                    <Input
                      required
                      value={portfolio.username}
                      onChange={(e) => handleUsernameChange(e.target.value)}
                      className="pl-9 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">Theme Preset</Label>
                  <Select
                    value={portfolio.theme}
                    onChange={(e) => setPortfolio({ ...portfolio, theme: e.target.value as any })}
                    className="font-medium"
                  >
                    <option value="MINIMAL">Minimalist Mono</option>
                    <option value="DARK">Sleek Dark Mode</option>
                    <option value="LIGHT">Clean Light Mode</option>
                    <option value="VIBRANT">Vibrant Gradient</option>
                  </Select>
                </div>

                <div className="md:col-span-2 flex items-center gap-3.5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={portfolio.isPublished}
                    onChange={(e) => setPortfolio({ ...portfolio, isPublished: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <div>
                    <label htmlFor="isPublished" className="text-sm font-bold text-slate-900 block cursor-pointer select-none">
                      Publish Portfolio Landing Page
                    </label>
                    <span className="text-xs text-slate-500 block mt-0.5 font-medium select-none">
                      Make your portfolio page indexable and visible via the public URL.
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Copy edits */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sliders className="h-4 w-4 text-blue-500" /> Hero & About Content
              </h3>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">Hero Headline Title</Label>
                  <Input
                    required
                    value={portfolio.heroTitle}
                    onChange={(e) => setPortfolio({ ...portfolio, heroTitle: e.target.value })}
                    className="font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">Hero Description</Label>
                  <Textarea
                    required
                    value={portfolio.heroSubtitle}
                    onChange={(e) => setPortfolio({ ...portfolio, heroSubtitle: e.target.value })}
                    rows={2}
                    className="font-medium resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">Detailed Biography (About Me)</Label>
                  <Textarea
                    required
                    value={portfolio.aboutMe}
                    onChange={(e) => setPortfolio({ ...portfolio, aboutMe: e.target.value })}
                    rows={4}
                    className="font-medium resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                <Globe className="h-4 w-4 text-blue-500" /> Social Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">GitHub URL</Label>
                  <Input
                    type="url"
                    value={portfolio.github}
                    onChange={(e) => setPortfolio({ ...portfolio, github: e.target.value })}
                    className="font-medium text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">LinkedIn URL</Label>
                  <Input
                    type="url"
                    value={portfolio.linkedin}
                    onChange={(e) => setPortfolio({ ...portfolio, linkedin: e.target.value })}
                    className="font-medium text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-slate-700 font-bold">Email Address</Label>
                  <Input
                    type="email"
                    value={portfolio.email}
                    onChange={(e) => setPortfolio({ ...portfolio, email: e.target.value })}
                    className="font-medium text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Blueprint */}
        <div>
          <Card className="bg-white border-slate-200 shadow-sm p-6 text-center space-y-5 sticky top-6">
            <CardContent className="p-0 space-y-4">
              <Layout className="h-8 w-8 text-slate-300 mx-auto mb-2 shrink-0" />
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest select-none">Theme Blueprint Preview</h3>
              
              <div className={`border rounded-xl p-5 text-left select-none overflow-hidden aspect-[4/3] relative flex flex-col justify-between shadow-sm ${
                portfolio.theme === 'DARK' ? "bg-slate-900 text-slate-100 border-slate-800" :
                portfolio.theme === 'LIGHT' ? "bg-white text-slate-900 border-slate-200" :
                portfolio.theme === 'VIBRANT' ? "bg-gradient-to-tr from-blue-900 via-indigo-900 to-purple-900 text-white border-slate-800" :
                "bg-slate-50 text-slate-900 border-slate-200"
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-current pb-2 text-[10px] opacity-70">
                    <span className="font-bold uppercase tracking-wider">Alex Carter</span>
                    <div className="flex gap-3">
                      <span>About</span>
                      <span>Work</span>
                    </div>
                  </div>
                  <div className="pt-3">
                    <h4 className="text-sm font-black tracking-tight leading-tight line-clamp-2">
                      {portfolio.heroTitle}
                    </h4>
                    <p className="text-[10px] opacity-70 mt-1.5 line-clamp-2 leading-relaxed font-medium">
                      {portfolio.heroSubtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-current text-[10px] flex justify-between items-center opacity-70 font-medium">
                  <span>Generated via Growzi</span>
                  <span className="flex items-center gap-1">Preview <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </form>
    </div>
  );
}
