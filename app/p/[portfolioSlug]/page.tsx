"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Mail, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  BookOpen, 
  ArrowLeft,
  Briefcase,
  GraduationCap
} from "lucide-react";
import { GitHub, LinkedIn } from "@/components/icons";

type PortfolioData = {
  name: string;
  slug: string;
  theme: 'MINIMAL' | 'VIBRANT' | 'DARK' | 'LIGHT';
  heroTitle: string;
  heroSubtitle: string;
  aboutMe: string;
  github: string;
  linkedin: string;
  email: string;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    github?: string;
  }>;
  credentials: Array<{
    name: string;
    score: string;
    date: string;
  }>;
};

// Mock portfolio databases matching seed files
const portfoliosDb: Record<string, PortfolioData> = {
  "alex-carter": {
    name: "Alex Carter",
    slug: "alex-carter",
    theme: "MINIMAL",
    heroTitle: "Building solutions that solve real-world problems",
    heroSubtitle: "Computer Science student at Apex Engineering College specializing in Next.js and PostgreSQL architectures.",
    aboutMe: "I am a passionate software developer eager to build scalable web applications. I focus on clean code, database query optimizations, and seamless user experiences.",
    github: "https://github.com/alexcarter",
    linkedin: "https://linkedin.com/in/alexcarter",
    email: "alex.carter@apex.edu",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Git", "Docker"],
    projects: [
      {
        title: "Enterprise SaaS Analytics Portal",
        description: "Implemented a multi-tenant client billing dashboard displaying real-time server statistics and subscription statuses.",
        tech: ["Next.js", "Prisma", "PostgreSQL", "Tailwind"],
        github: "https://github.com/apex-students/saas-analytics",
      },
      {
        title: "AI Resume Parser & Analyzer",
        description: "Constructed an automated processing engine for extraction of text inputs from PDF resumes using OCR pipelines.",
        tech: ["Python", "FastAPI", "React"],
        github: "https://github.com/devsunited/ai-resume-parser",
      }
    ],
    credentials: [
      {
        name: "Core Web Technologies Certified",
        score: "Score: 30/30 (Perfect Pass)",
        date: "Verified June 14, 2026",
      }
    ]
  }
};

export default function PublicPortfolioPage() {
  const params = useParams();
  const slug = params.portfolioSlug as string;

  // Resolve matching portfolio, or fallback to default alex-carter
  const data = portfoliosDb[slug] || portfoliosDb["alex-carter"];

  const getThemeStyles = () => {
    switch(data.theme) {
      case 'DARK':
        return {
          wrapper: "bg-slate-950 text-slate-100 selection:bg-slate-800",
          card: "bg-slate-900/40 border border-slate-850",
          accentText: "text-indigo-400",
          accentBtn: "bg-indigo-600 hover:bg-indigo-500 text-white",
          headerBorder: "border-slate-900"
        };
      case 'LIGHT':
        return {
          wrapper: "bg-zinc-50 text-zinc-900 selection:bg-indigo-100",
          card: "bg-white border border-zinc-200/80 shadow-sm",
          accentText: "text-indigo-600",
          accentBtn: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10",
          headerBorder: "border-zinc-200"
        };
      case 'VIBRANT':
        return {
          wrapper: "bg-gradient-to-tr from-slate-950 via-slate-950 to-indigo-950 text-slate-100 selection:bg-indigo-500",
          card: "bg-slate-900/30 border border-slate-800 backdrop-blur-md",
          accentText: "text-indigo-400",
          accentBtn: "bg-gradient-to-tr from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white",
          headerBorder: "border-slate-900"
        };
      case 'MINIMAL':
      default:
        return {
          wrapper: "bg-zinc-950 text-zinc-300 selection:bg-zinc-800",
          card: "bg-zinc-900/30 border border-zinc-900",
          accentText: "text-white",
          accentBtn: "bg-white hover:bg-zinc-200 text-zinc-950",
          headerBorder: "border-zinc-900"
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen relative font-sans flex flex-col justify-between overflow-x-hidden ${theme.wrapper}`}>
      
      {/* Visual top border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500" />
      
      {/* Header Navigation */}
      <header className={`border-b ${theme.headerBorder} py-6`}>
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <span className={`text-base font-bold tracking-tight uppercase ${theme.accentText}`}>
            {data.name}
          </span>
          <div className="flex gap-4">
            <a href={`mailto:${data.email}`} className="text-slate-400 hover:text-white transition-colors">
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <GitHub className="h-4.5 w-4.5" />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <LinkedIn className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Body Content */}
      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 space-y-16">
        
        {/* Title details */}
        <section className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ color: data.theme === 'LIGHT' ? '#09090b' : 'white' }}>
            {data.heroTitle}
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed max-w-2xl">
            {data.heroSubtitle}
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${data.email}`}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${theme.accentBtn}`}
            >
              Get In Touch
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Section: Biography */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">About Me</h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed max-w-3xl">
            {data.aboutMe}
          </p>
        </section>

        {/* Section: Verified Credentials badges */}
        {data.credentials.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">Verified Assessments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.credentials.map((cred, idx) => (
                <div key={idx} className={`p-4 rounded-xl flex items-start gap-3.5 ${theme.card}`}>
                  <div className="h-10 w-10 rounded-lg bg-indigo-950/40 border border-indigo-900/50 flex items-center justify-center text-indigo-400 shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white" style={{ color: data.theme === 'LIGHT' ? '#09090b' : 'white' }}>
                      {cred.name}
                    </h4>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">{cred.score}</span>
                    <span className="text-[9px] text-slate-500 block mt-1">{cred.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Skills */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">Skills & Tooling</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span key={skill} className={`px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 ${theme.card}`}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Section: Built projects list */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-500">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj, idx) => (
              <div key={idx} className={`p-6 rounded-2xl flex flex-col justify-between ${theme.card}`}>
                <div>
                  <h3 className="font-bold text-sm text-white" style={{ color: data.theme === 'LIGHT' ? '#09090b' : 'white' }}>
                    {proj.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-900/10 flex justify-between items-center gap-4">
                  <div className="flex gap-1">
                    {proj.tech.map(t => (
                      <span key={t} className="px-1.5 py-0.5 rounded bg-slate-950/40 border border-slate-900 text-slate-500 text-[8px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[9px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      Code <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`border-t ${theme.headerBorder} py-8`}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <span>&copy; {new Date().getFullYear()} {data.name}. Generated via Growzi platform.</span>
          <Link href="/" className="hover:text-slate-400 flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Growzi Homepage
          </Link>
        </div>
      </footer>

    </div>
  );
}
