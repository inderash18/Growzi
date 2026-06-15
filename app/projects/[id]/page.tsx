"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { 
  Code2, 
  ArrowLeft, 
  Terminal, 
  Bookmark, 
  Sparkles,
  ExternalLink,
  Check,
  Copy,
  Layers,
  FileText,
  Calendar,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  techStack: string[];
  screenshots: string[];
  documentation: string;
  features: string[];
  resources: string[];
  fileTree: string[];
  commands: string[];
};

const projectsDb: Record<string, Project> = {
  "p1": {
    id: "p1",
    title: "Real-time Slack Clone",
    description: "A messaging app built with real-time socket connections, multiple chat channel listings, and private messages capability.",
    difficulty: "BEGINNER",
    category: "MERN Stack",
    techStack: ["React", "Node.js", "Socket.io", "Express", "MongoDB"],
    screenshots: ["https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=60"],
    documentation: "Clone repository, run npm install in frontend and backend. Initialize server on port 5000 and setup state hooks.",
    features: ["Instant chat updates", "Channel rooms routing", "Online status indicator"],
    resources: ["Socket.io rooms guide", "React Context docs"],
    fileTree: [
      "src/server.js",
      "src/routes/chat.js",
      "src/models/Message.js",
      "public/index.html",
      "package.json"
    ],
    commands: [
      "git clone https://github.com/apex-students/slack-clone.git",
      "cd slack-clone",
      "npm install",
      "npm run dev"
    ]
  },
  "p2": {
    id: "p2",
    title: "AI Resume Parser & Scraper",
    description: "Extract text structure from PDF resumes using OCR pipelines, parse experiences, and suggest scoring fits using LLM integrations.",
    difficulty: "ADVANCED",
    category: "AI",
    techStack: ["Python", "FastAPI", "Tesseract OCR", "OpenAI API"],
    screenshots: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"],
    documentation: "Create a python virtualenv, configure OpenAI API keys in config, and run fastapi server on port 8000.",
    features: ["PDF document OCR conversion", "LLM structure translation", "Skill ranking algorithm"],
    resources: ["FastAPI routing docs", "Tesseract layout analyzer guide"],
    fileTree: [
      "main.py",
      "config.py",
      "parser/ocr.py",
      "parser/gpt_client.py",
      "requirements.txt"
    ],
    commands: [
      "git clone https://github.com/devsunited/ai-resume-parser.git",
      "cd ai-resume-parser",
      "python -m venv venv",
      "source venv/bin/activate",
      "pip install -r requirements.txt",
      "uvicorn main:app --reload"
    ]
  }
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "Initializing local environment setup...",
    "Verifying package versions: match.",
    "Ready for local execution."
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const projectId = params.id as string;
  const project = projectsDb[projectId] || projectsDb["p1"];

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setIsCopied(true);
    toast("Command copied to clipboard", "success");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleRunTerminal = () => {
    if (isRunning) return;
    setIsRunning(true);
    setTerminalLogs(prev => [...prev, "Starting local dev server...", "$ npm run dev"]);
    
    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        "Ready on http://localhost:3000",
        "Database connected successfully.",
        "Listening for sockets: port 5000 initialized."
      ]);
      toast("Local environment started!", "success");
    }, 1200);
  };

  const getDifficultyColor = (diff: Project['difficulty']) => {
    switch(diff) {
      case 'BEGINNER': return "bg-emerald-50 border-emerald-250 text-emerald-600";
      case 'INTERMEDIATE': return "bg-amber-50 border-amber-250 text-amber-600";
      case 'ADVANCED': return "bg-rose-50 border-rose-250 text-rose-600";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans flex flex-col justify-between">
      
      <div>
        {/* Navigation */}
        <Header />

        {/* Main documentation content */}
        <main className="max-w-6xl mx-auto px-6 py-12 space-y-12 relative z-10">
          
          {/* Back link */}
          <Link href="/projects" className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 transition-colors text-xs font-semibold select-none">
            <ArrowLeft className="h-4 w-4" /> Back to projects catalog
          </Link>

          {/* Details header */}
          <section className="space-y-4 max-w-3xl">
            <div className="flex gap-2 items-center select-none">
              <span className={`px-2.5 py-0.5 rounded-full border text-[8px] font-extrabold tracking-wider uppercase ${getDifficultyColor(project.difficulty)}`}>
                {project.difficulty}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-500 text-[8px] font-extrabold uppercase tracking-wider">
                {project.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">{project.title}</h1>
          </section>

          {/* Grid Layout: Doc Left, Sticky Sidebar Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Documentation Sections */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Overview */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 select-none">Overview</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {project.description}
                </p>
              </section>

              {/* Features */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 select-none">Core Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, idx) => (
                    <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center gap-2 select-none font-semibold">
                      <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </section>

              {/* Technology Stack */}
              <section className="space-y-3 select-none">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2">Technology Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>

              {/* Documentation / Setup Guide */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 select-none">Documentation</h3>
                <p className="text-xs text-slate-500 font-normal leading-relaxed">
                  Execute the following terminal commands to replicate and launch the blueprint locally on your system:
                </p>
                <div className="space-y-3">
                  {project.commands.map((cmd, idx) => (
                    <div key={idx} className="p-3.5 bg-slate-900 border border-slate-950 rounded-xl flex items-center justify-between gap-4 font-mono text-[10px] text-slate-200">
                      <span className="overflow-hidden truncate">{cmd}</span>
                      <button
                        onClick={() => handleCopyCommand(cmd)}
                        className="text-slate-500 hover:text-white transition-colors cursor-pointer p-1 rounded hover:bg-slate-800 shrink-0"
                        title="Copy Command"
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Web Console Simulator */}
              <section className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 select-none">Local Console Executor</h3>
                <Card className="bg-slate-950 border-slate-900 rounded-2xl overflow-hidden">
                  <div className="h-10 px-4 bg-slate-900/60 border-b border-slate-900 flex flex-row items-center justify-between select-none">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Terminal className="h-3.5 w-3.5 text-blue-500 animate-pulse" /> bash Console</span>
                    <button
                      onClick={handleRunTerminal}
                      disabled={isRunning}
                      className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isRunning ? "Server Active" : "Run Dev Server"}
                    </button>
                  </div>
                  <CardContent className="p-4 bg-slate-950 font-mono text-[10px] text-slate-300 space-y-1 overflow-x-auto select-text min-h-[120px]">
                    {terminalLogs.map((log, idx) => (
                      <div key={idx} className="leading-relaxed">
                        <span className="text-slate-600 select-none mr-2">&gt;</span>
                        {log}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </section>

            </div>

            {/* Right Column: Sticky Action Card Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
              
              {/* Sticky Action Card */}
              <Card className="bg-white border-slate-200 shadow-md">
                <CardHeader className="p-6 pb-4 border-b border-slate-100 select-none">
                  <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Service Allocation</span>
                  <CardTitle className="text-sm font-bold text-slate-900 mt-1">Need a custom build?</CardTitle>
                  <CardDescription className="text-xs text-slate-500 leading-normal">
                    Order a custom setup, allocate developers, and get guided configurations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-4 select-none">
                  <div className="space-y-3 font-semibold text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Budget Range</span>
                      <span className="text-slate-800">$150 - $250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Fulfillment</span>
                      <span className="text-slate-800">5-7 Days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mentor Sync</span>
                      <span className="text-emerald-600">Included</span>
                    </div>
                  </div>

                  <Link href="/dashboard" className="block pt-2">
                    <Button variant="primary" size="sm" className="w-full font-bold">
                      Request Similar Project
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Structure File Tree */}
              <Card className="bg-white border-slate-200 select-none">
                <CardHeader className="p-5 pb-3 border-b border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-blue-500" /> Structure File Tree
                  </span>
                </CardHeader>
                <CardContent className="p-4 font-mono text-[10px] text-slate-500 space-y-1.5">
                  {project.fileTree.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-2 py-0.5">
                      <FileText className="h-3.5 w-3.5 text-slate-350 shrink-0" />
                      <span>{file}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  );
}
