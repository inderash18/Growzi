"use client";

import { useState } from "react";
import Link from "next/link";
import { Code2, ArrowRight, X, Sparkles, Layers, BookOpen, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  techStack: string[];
};

const initialSaved: Project[] = [
  {
    id: "p1",
    title: "Real-time Slack Clone",
    description: "A messaging app built with real-time socket connections, multiple chat channel listings, and private messages capability.",
    difficulty: "BEGINNER",
    category: "MERN Stack",
    techStack: ["React", "Node.js", "Socket.io", "Express"]
  }
];

export default function SavedProjectsPage() {
  const { toast } = useToast();
  const [saved, setSaved] = useState<Project[]>(initialSaved);

  const handleRemove = (id: string, name: string) => {
    setSaved(prev => prev.filter(p => p.id !== id));
    toast(`Removed ${name} from bookmarks`, "info");
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Layers className="h-6 w-6 text-indigo-500" />
            Bookmarked Projects
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Your saved code templates blueprints catalog references shelf.
          </p>
        </div>

        <Link href="/projects" className="shrink-0 select-none">
          <Button variant="outline" size="sm" className="font-semibold">
            Explore All Blueprints
          </Button>
        </Link>
      </div>

      {/* Grid */}
      {saved.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {saved.map((proj) => (
            <Card key={proj.id} className="flex flex-col justify-between group">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start select-none">
                  <span className={`px-2 py-0.5 rounded-full border text-[8px] font-bold uppercase tracking-wider ${getDifficultyColor(proj.difficulty)}`}>
                    {proj.difficulty}
                  </span>
                  
                  <button
                    onClick={() => handleRemove(proj.id, proj.title)}
                    className="p-1 rounded-md text-zinc-500 hover:text-rose-500 hover:bg-rose-950/20 transition-all cursor-pointer"
                    title="Remove Bookmark"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block select-none">
                    {proj.category}
                  </span>
                  <h3 className="font-bold text-sm text-white leading-snug group-hover:text-indigo-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-zinc-450 leading-relaxed font-normal line-clamp-3">
                    {proj.description}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="px-6 pb-6 pt-3 border-t border-zinc-900/40 flex justify-between items-center text-[10px] text-zinc-500 select-none">
                <div className="flex flex-wrap gap-1">
                  {proj.techStack.slice(0, 2).map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 rounded bg-zinc-950 border border-zinc-850 text-zinc-400 text-[8px]">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <Link href={`/projects/${proj.id}`} className="font-bold text-[9px] text-indigo-400 hover:text-indigo-300 uppercase tracking-wider flex items-center gap-0.5">
                  Specs <ExternalLink className="h-3 w-3" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl text-center select-none">
          <BookOpen className="h-10 w-10 text-zinc-750 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">No Bookmarks Saved</h3>
          <p className="text-xs text-zinc-550 max-w-sm mx-auto leading-relaxed">
            Browse the Projects Ideation Hub to bookmark interesting coding repositories templates.
          </p>
        </div>
      )}

    </div>
  );
}
