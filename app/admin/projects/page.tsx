"use client";

import { useState } from "react";
import { Code2, Plus, Edit, Trash, Settings, Sparkles, Check, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

type Project = {
  id: string;
  title: string;
  category: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  techStack: string[];
  description: string;
};

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "Real-time Slack Clone",
    category: "MERN Stack",
    difficulty: "BEGINNER",
    techStack: ["React", "Node.js", "Socket.io", "Express"],
    description: "A messaging app built with real-time socket connections, multiple chat channel listings, and private messages capability."
  },
  {
    id: "p2",
    title: "AI Resume Parser & Scraper",
    category: "AI",
    difficulty: "ADVANCED",
    techStack: ["Python", "FastAPI", "Tesseract OCR", "OpenAI API"],
    description: "Extract text structure from PDF resumes using OCR pipelines, parse experiences, and suggest scoring fits using LLM integrations."
  }
];

export default function AdminProjectsPage() {
  const { toast } = useToast();
  const [projectsList, setProjectsList] = useState<Project[]>(initialProjects);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("MERN Stack");
  const [difficulty, setDifficulty] = useState<'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>("BEGINNER");
  const [techStackText, setTechStackText] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (p: Project) => {
    setEditingId(p.id);
    setTitle(p.title);
    setCategory(p.category);
    setDifficulty(p.difficulty);
    setTechStackText(p.techStack.join(", "));
    setDescription(p.description);
  };

  const handleClear = () => {
    setEditingId(null);
    setTitle("");
    setCategory("MERN Stack");
    setDifficulty("BEGINNER");
    setTechStackText("");
    setDescription("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      const parsedTech = techStackText.split(",").map(t => t.trim()).filter(Boolean);
      
      if (editingId) {
        setProjectsList(prev => prev.map(p => {
          if (p.id === editingId) {
            return { ...p, title, category, difficulty, techStack: parsedTech, description };
          }
          return p;
        }));
        toast("Project blueprint modified successfully", "success");
      } else {
        const newProj: Project = {
          id: "p-" + Date.now(),
          title,
          category,
          difficulty,
          techStack: parsedTech,
          description
        };
        setProjectsList([newProj, ...projectsList]);
        toast("New project blueprint added successfully", "success");
      }
      handleClear();
      setIsSaving(false);
    }, 800);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setProjectsList(prev => prev.filter(p => p.id !== id));
      toast("Project blueprint removed", "info");
      if (editingId === id) handleClear();
    }
  };

  const getDifficultyColor = (diff: Project['difficulty']) => {
    switch(diff) {
      case 'BEGINNER': return "bg-emerald-950/20 border-emerald-900/30 text-emerald-400";
      case 'INTERMEDIATE': return "bg-amber-950/20 border-amber-900/30 text-amber-450";
      case 'ADVANCED': return "bg-rose-950/20 border-rose-900/30 text-rose-455";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="border-b border-zinc-900 pb-5 shrink-0 select-none">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <Code2 className="h-6 w-6 text-rose-500" />
          Projects Blueprints Manager
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-normal">
          Upload new starter code repositories catalogs, write build guidelines, and modify technology tags.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Composer Form */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-6">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-2 select-none">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            {editingId ? "Modify Blueprint Specs" : "Upload New Code Blueprint"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Project Title</Label>
                <Input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Chat App using Flutter"
                />
              </div>

              <div>
                <Label>Difficulty Rating</Label>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                >
                  <option value="BEGINNER">BEGINNER</option>
                  <option value="INTERMEDIATE">INTERMEDIATE</option>
                  <option value="ADVANCED">ADVANCED</option>
                </Select>
              </div>

              <div>
                <Label>Category</Label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="AI">AI Algorithm</option>
                  <option value="Flutter">Flutter Mobile</option>
                  <option value="Python">Python Scripts</option>
                </Select>
              </div>
            </div>

            <div>
              <Label>Tech Stack (comma separated)</Label>
              <Input
                type="text"
                value={techStackText}
                onChange={(e) => setTechStackText(e.target.value)}
                placeholder="e.g. React, Node.js, Express"
              />
            </div>

            <div>
              <Label>Detailed Specifications Description</Label>
              <Textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write the specifications body details of the blueprint..."
                rows={5}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 select-none">
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClear}
                  className="font-semibold"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                variant="rose"
                size="sm"
                isLoading={isSaving}
                className="font-semibold"
              >
                <Check className="h-4 w-4" /> {editingId ? "Update Blueprint" : "Upload Blueprint"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Catalog Listings */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-zinc-950">
            <CardHeader className="border-b border-zinc-900/40 select-none pb-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Active Catalog</span>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {projectsList.map(proj => (
                <div key={proj.id} className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3 relative group">
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between gap-2 select-none mb-2">
                      <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold tracking-wider uppercase ${getDifficultyColor(proj.difficulty)}`}>
                        {proj.difficulty}
                      </span>
                      <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider block">{proj.category}</span>
                    </div>
                    <h4 className="font-bold text-xs text-white truncate mt-0.5">{proj.title}</h4>
                    <p className="text-[10px] text-zinc-500 line-clamp-2 mt-1 leading-relaxed font-normal">{proj.description}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 text-[9px] text-zinc-500 select-none">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.slice(0, 2).map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-zinc-400 text-[8px]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(proj)}
                        className="text-zinc-450 hover:text-white transition-colors cursor-pointer"
                        title="Edit Blueprint"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        className="text-rose-500/80 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Blueprint"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
