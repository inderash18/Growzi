"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Code2, 
  Search, 
  ExternalLink, 
  Layers, 
  X, 
  ChevronRight, 
  Terminal,
  Bookmark,
  Sparkles,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: 'Java' | 'Python' | 'MERN Stack' | 'Android' | 'Flutter' | 'Data Science' | 'AI' | 'IoT' | 'Cybersecurity';
  techStack: string[];
  screenshots: string[];
  documentation: string;
  features: string[];
  resources: string[];
};

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "Real-time Slack Clone",
    description: "A messaging app built with real-time socket connections, multiple chat channel listings, and private messages capability.",
    difficulty: "BEGINNER",
    category: "MERN Stack",
    techStack: ["React", "Node.js", "Socket.io", "Express", "MongoDB"],
    screenshots: ["https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=60"],
    documentation: "Clone repository, run npm install in frontend and backend. Initialize server on port 5000 and setup state hooks.",
    features: ["Instant chat updates", "Channel rooms routing", "Online status indicator"],
    resources: ["Socket.io rooms guide", "React Context docs"]
  },
  {
    id: "p2",
    title: "AI Resume Parser & Scraper",
    description: "Extract text structure from PDF resumes using OCR pipelines, parse experiences, and suggest scoring fits using LLM integrations.",
    difficulty: "ADVANCED",
    category: "AI",
    techStack: ["Python", "FastAPI", "Tesseract OCR", "OpenAI API"],
    screenshots: ["https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=60"],
    documentation: "Create a python virtualenv, configure OpenAI API keys in config, and run fastapi server on port 8000.",
    features: ["PDF document OCR conversion", "LLM structure translation", "Skill ranking algorithm"],
    resources: ["FastAPI routing docs", "Tesseract layout analyzer guide"]
  },
  {
    id: "p3",
    title: "Smart Home Automated Hub",
    description: "IoT micro-controller network dashboard that monitors temperature sensors and handles automated relay toggling.",
    difficulty: "INTERMEDIATE",
    category: "IoT",
    techStack: ["C++", "ESP32", "Arduino IDE", "Node-RED", "MQTT"],
    screenshots: ["https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=60"],
    documentation: "Upload arduino sketch to ESP32 board, link MQTT broker path, and run Node-RED workspace logic.",
    features: ["DHT22 sensor scanning loop", "MQTT broker topics publish", "Relay state lock dashboard"],
    resources: ["MQTT setup documentation", "Arduino library instructions"]
  },
  {
    id: "p4",
    title: "Vulnerability Scanner Tool",
    description: "A fast python port scanner that checks host systems for open ports, versions banners, and lists known CVE matches.",
    difficulty: "INTERMEDIATE",
    category: "Cybersecurity",
    techStack: ["Python", "Scapy", "Nmap Library", "Shodan API"],
    screenshots: ["https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60"],
    documentation: "Configure API access key environment parameters, run python scanner.py --host example.com.",
    features: ["TCP SYN stealth scanning", "Service banner extraction", "CVE vulnerability indexing"],
    resources: ["Scapy scanner details", "CVE database mappings"]
  },
  {
    id: "p5",
    title: "Data Science Forecaster",
    description: "Interactive dashboard displaying sales performance and forecast metrics using linear regressions.",
    difficulty: "BEGINNER",
    category: "Data Science",
    techStack: ["Python", "Pandas", "Scikit-Learn", "Streamlit"],
    screenshots: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60"],
    documentation: "Run pip install pandas streamlit scikit-learn. Start local streamlit server via commandline.",
    features: ["Interactive CSV dataset upload", "Dynamic line forecast graphs", "Linear regression modeling"],
    resources: ["Streamlit widgets guide", "Scikit regression models"]
  }
];

const categoriesList = ["All", "Java", "Python", "MERN Stack", "Android", "Flutter", "Data Science", "AI", "IoT", "Cybersecurity"];

export default function PublicProjectsCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED'>('ALL');
  const [activeCategory, setActiveCategory] = useState("All");

  const getDifficultyColor = (diff: Project['difficulty']) => {
    switch(diff) {
      case 'BEGINNER': return "bg-emerald-50 border-emerald-250 text-emerald-600";
      case 'INTERMEDIATE': return "bg-amber-50 border-amber-250 text-amber-600";
      case 'ADVANCED': return "bg-rose-50 border-rose-250 text-rose-600";
    }
  };

  const filteredProjects = initialProjects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = difficultyFilter === "ALL" || p.difficulty === difficultyFilter;
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-12 relative z-10">
          
          {/* Header Title */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[9px] font-bold text-blue-600 tracking-widest uppercase block select-none">Catalog Hub</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Discover Project Blueprints
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Explore step-by-step deployment structures, complete file-trees, and reference instructions.
            </p>
          </div>

          {/* Large Centered Search Bar */}
          <div className="max-w-xl mx-auto relative select-none">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 pointer-events-none">
              <Search className="h-4 w-4" />
            </span>
            <Input
              placeholder="Search projects by name, technology stack, or category tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 py-3 rounded-2xl border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all text-sm h-12"
            />
          </div>

          {/* Category Filter Pills scroller */}
          <div className="flex justify-center select-none overflow-x-auto max-w-4xl mx-auto scrollbar-none pb-2">
            <div className="flex bg-slate-200/50 p-1 border border-slate-200/80 rounded-2xl gap-1 shrink-0">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-bold tracking-wide transition-all uppercase whitespace-nowrap cursor-pointer ${
                    activeCategory === cat
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty filter controls */}
          <div className="flex justify-center select-none">
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 shadow-sm">
              {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const).map((diff) => (
                <button
                  key={diff}
                  onClick={() => setDifficultyFilter(diff)}
                  className={`px-3 py-1 rounded-lg text-[9px] font-bold tracking-wide transition-all uppercase cursor-pointer ${
                    difficultyFilter === diff
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredProjects.map((proj) => (
                <Card
                  key={proj.id}
                  className="flex flex-col justify-between group bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-md"
                >
                  <div>
                    {/* Visual Card Top */}
                    <div className="relative h-40 w-full bg-slate-100 overflow-hidden border-b border-slate-100 select-none">
                      <img
                        src={proj.screenshots[0]}
                        alt={proj.title}
                        className="object-cover h-full w-full opacity-70 group-hover:scale-[1.015] transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[8px] font-extrabold tracking-wider uppercase ${getDifficultyColor(proj.difficulty)}`}>
                          {proj.difficulty}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-3 border-none p-5">
                      <span className="text-[8px] font-bold text-blue-600 uppercase tracking-widest block">{proj.category}</span>
                      <CardTitle className="text-sm font-extrabold text-slate-900 normal-case leading-snug mt-1 group-hover:text-blue-600 transition-colors">
                        {proj.title}
                      </CardTitle>
                      <CardDescription className="text-xs leading-relaxed line-clamp-3 mt-1 text-slate-500 font-normal">
                        {proj.description}
                      </CardDescription>
                    </CardHeader>
                  </div>

                  <CardContent className="px-5 py-0 select-none">
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-150 text-slate-600 text-[8px] font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="px-5 pb-5 pt-4 border-none flex justify-end items-center select-none">
                    <Link href={`/projects/${proj.id}`} className="block w-full">
                      <Button variant="outline" size="sm" className="w-full font-bold gap-1">
                        View Details <ChevronRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-16 bg-white border border-dashed border-slate-200 rounded-3xl text-center select-none shadow-sm max-w-xl mx-auto">
              <Layers className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                We haven't cataloged project blueprints matching your active selections.
              </p>
            </div>
          )}

          {/* Custom request callout */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 select-none shadow-sm max-w-4xl mx-auto mt-16">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Need something different?</h3>
              <p className="text-xs text-slate-500">
                Submit custom project requirements or technical parameters to our developer guide team.
              </p>
            </div>
            <Link href="/dashboard" className="shrink-0">
              <Button variant="primary" size="sm" className="font-bold gap-1.5">
                <Terminal className="h-4 w-4" /> Request a Custom Project <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </section>

        </main>
      </div>

      <Footer />
    </div>
  );
}
