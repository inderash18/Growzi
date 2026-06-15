"use client";

import { useState } from "react";
import { 
  Code2, 
  Search, 
  ExternalLink, 
  Plus, 
  Layers, 
  X, 
  ChevronRight, 
  Video,
  FileCheck,
  FolderOpen
} from "lucide-react";
import { GitHub } from "@/components/icons";
import { useTenantStore } from "@/store/useTenantStore";
import { useAuthStore } from "@/store/useAuthStore";

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  techStack: string[];
  githubUrl?: string;
  videoUrl?: string;
  screenshots: string[];
  resources: string[];
  createdBy: string;
  createdAt: string;
};

// Initial preset projects mimicking seed database
const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "Enterprise SaaS Analytics Portal",
    description: "A comprehensive project involving full-stack implementation of a multi-tenant dashboard displaying active logs, user activity graphs, and subscription billing summaries.",
    difficulty: "ADVANCED",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts", "Tailwind CSS"],
    githubUrl: "https://github.com/apex-students/saas-analytics",
    videoUrl: "https://youtube.com/watch?v=mockSaaSVideo",
    screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60"],
    resources: ["Prisma schema configurations", "Supabase authentication quickstart", "Recharts component examples"],
    createdBy: "Prof. Sarah Miller",
    createdAt: "2026-06-12"
  },
  {
    id: "proj-2",
    title: "AI Resume Parser & Analyzer",
    description: "An open source project to extract information from resumes using Python, OCR engines, and Open Source LLM APIs.",
    difficulty: "INTERMEDIATE",
    techStack: ["Python", "FastAPI", "Tesseract", "OpenAI API", "React"],
    githubUrl: "https://github.com/devsunited/ai-resume-parser",
    screenshots: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"],
    resources: ["FastAPI documentation", "LangChain parsing guidelines", "OCR accuracy logs"],
    createdBy: "Alex Carter",
    createdAt: "2026-06-14"
  },
  {
    id: "proj-3",
    title: "Real-time Slack Clone",
    description: "A messaging app built with real-time subscriptions, multiple channel groups, and custom avatars.",
    difficulty: "BEGINNER",
    techStack: ["React", "CSS", "Vite", "Socket.io", "Node.js"],
    githubUrl: "https://github.com/apex-students/slack-clone",
    screenshots: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60"],
    resources: ["Socket.io rooms introduction", "React hooks docs"],
    createdBy: "Sophia Wang",
    createdAt: "2026-06-15"
  }
];

export default function ProjectHub() {
  const { currentTenant, activeRole } = useTenantStore();
  const { user } = useAuthStore();

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('ALL');
  
  // Modal states
  const [detailProject, setDetailProject] = useState<Project | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('BEGINNER');
  const [techInput, setTechInput] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [resourceInput, setResourceInput] = useState("");

  const isTeacher = activeRole === "ADMIN" || activeRole === "FACULTY" || user?.role === "SUPER_ADMIN";

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newProject: Project = {
      id: "proj-" + Date.now(),
      title,
      description,
      difficulty,
      techStack: techInput.split(",").map(t => t.trim()).filter(Boolean),
      githubUrl: githubUrl || undefined,
      videoUrl: videoUrl || undefined,
      screenshots: ["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60"], // Default coding screenshot
      resources: resourceInput.split("\n").map(r => r.trim()).filter(Boolean),
      createdBy: user?.name || "Faculty Guide",
      createdAt: new Date().toISOString().split("T")[0]
    };

    setProjects([newProject, ...projects]);
    setCreateModalOpen(false);

    // Reset fields
    setTitle("");
    setDescription("");
    setDifficulty("BEGINNER");
    setTechInput("");
    setGithubUrl("");
    setVideoUrl("");
    setResourceInput("");
  };

  const getDifficultyColor = (diff: Project['difficulty']) => {
    switch(diff) {
      case 'BEGINNER': return "bg-emerald-950 border-emerald-900 text-emerald-400";
      case 'INTERMEDIATE': return "bg-yellow-950 border-yellow-900 text-yellow-400";
      case 'ADVANCED': return "bg-red-950 border-red-900 text-red-400";
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === "ALL" || p.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Code2 className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Project Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse structured project templates, review stack requirements, and submit repository links
          </p>
        </div>

        {isTeacher && (
          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg shrink-0 border border-indigo-500/30"
            style={{ 
              backgroundColor: currentTenant?.secondaryColor,
              boxShadow: `0 4px 14px ${currentTenant?.secondaryColor}25`
            }}
          >
            <Plus className="h-4 w-4" /> Create Project Assignment
          </button>
        )}
      </div>

      {/* Control bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search projects by name or technology stack..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/40 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-slate-200 placeholder-slate-600 transition-colors"
          />
        </div>

        {/* Difficulty Selectors */}
        <div className="flex bg-slate-950 border border-slate-900 rounded-lg p-1.5 gap-1 shrink-0">
          {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-3 py-1.5 rounded-md text-[10px] font-bold tracking-wide transition-all uppercase ${
                difficultyFilter === diff
                  ? "bg-slate-900 text-white shadow-sm border border-slate-800"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              onClick={() => setDetailProject(p)}
              className="bg-slate-900/20 border border-slate-900 hover:border-slate-800 rounded-2xl overflow-hidden transition-all group flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-40 w-full bg-slate-950 overflow-hidden border-b border-slate-900">
                  <img
                    src={p.screenshots[0]}
                    alt={p.title}
                    className="object-cover h-full w-full opacity-60 group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold tracking-wider ${getDifficultyColor(p.difficulty)}`}>
                      {p.difficulty}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-white leading-snug group-hover:text-indigo-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {p.techStack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-slate-400 text-[9px]">
                        {tech}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-850 text-slate-500 text-[9px]">
                        +{p.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-slate-900/40 flex items-center justify-between text-[10px] text-slate-500">
                <span>By: {p.createdBy}</span>
                <span className="flex items-center gap-1 hover:text-indigo-400 transition-colors font-bold">
                  View Specs <ChevronRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl text-center">
          <Layers className="h-10 w-10 text-slate-700 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try resetting your difficulty filters or search query parameters.
          </p>
        </div>
      )}

      {/* Project Specs Detail Overlay Modal */}
      {detailProject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl animate-scale-in max-h-[90vh] flex flex-col">
            <div className="h-14 px-6 border-b border-slate-850 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-indigo-400" /> Project Specifications
              </span>
              <button 
                onClick={() => setDetailProject(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-bold tracking-wider uppercase inline-block mb-3 ${getDifficultyColor(detailProject.difficulty)}`}>
                  {detailProject.difficulty}
                </span>
                <h2 className="text-xl font-bold text-white leading-tight">{detailProject.title}</h2>
                <p className="text-xs text-slate-400 mt-3.5 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  {detailProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Tech Stack Required</h4>
                <div className="flex flex-wrap gap-1.5">
                  {detailProject.techStack.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {detailProject.resources.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Required Guide Resources</h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {detailProject.resources.map((res, i) => (
                      <li key={i} className="flex items-center gap-2 p-2.5 bg-slate-950 border border-slate-850 rounded-lg">
                        <FileCheck className="h-4 w-4 text-indigo-400" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action and repository Links */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-900/60">
                {detailProject.githubUrl && (
                  <a
                    href={detailProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all"
                  >
                  <GitHub className="h-4.5 w-4.5" /> Clone Starter Template
                  </a>
                )}
                {detailProject.videoUrl && (
                  <a
                    href={detailProject.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all"
                  >
                    <Video className="h-4.5 w-4.5" /> Watch Setup Walkthrough
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="h-14 px-6 border-b border-slate-850 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Add Project Assignment</h3>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="BEGINNER">Beginner</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="ADVANCED">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Tech Stack chips (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    placeholder="React, Tailwind, Node.js"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Build a Web Scraper App"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write clear project prompt guidelines, expected delivery deliverables, and learning outcomes..."
                  rows={4}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Starter Template GitHub URL (optional)
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Walkthrough Video URL (optional)
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Required Guide Assets / Assets list (one per line)
                </label>
                <textarea
                  value={resourceInput}
                  onChange={(e) => setResourceInput(e.target.value)}
                  placeholder="e.g. Figma wireframe link&#10;API schema definition file"
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-950 border border-slate-850 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  style={{ backgroundColor: currentTenant?.secondaryColor }}
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
