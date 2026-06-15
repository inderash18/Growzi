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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PortfolioData = {
  name: string;
  username: string;
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

const portfoliosDb: Record<string, PortfolioData> = {
  "alex-carter": {
    name: "Alex Carter",
    username: "alex-carter",
    theme: "MINIMAL",
    heroTitle: "Building solutions that solve real-world problems",
    heroSubtitle: "Computer Science student at Apex Engineering College specializing in Next.js and PostgreSQL architectures.",
    aboutMe: "I am a passionate software developer eager to build scalable web applications. I focus on clean code, database query optimizations, and seamless user experiences.",
    github: "https://github.com/alexcarter",
    linkedin: "https://linkedin.com/in/alexcarter",
    email: "student@growzi.com",
    skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Git", "Docker"],
    projects: [
      {
        title: "Real-time Slack Clone",
        description: "Implemented a socket-based channel messaging platform displaying online users list, chat history, and custom avatars.",
        tech: ["React", "Node.js", "Socket.io", "Express"],
        github: "https://github.com/apex-students/slack-clone",
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
        name: "React Web Development Certified",
        score: "Score: 100% (Certified Grade)",
        date: "Verified June 15, 2026",
      }
    ]
  }
};

export default function PublicStudentPortfolio() {
  const params = useParams();
  const username = params.username as string;

  const data = portfoliosDb[username] || portfoliosDb["alex-carter"];

  const getThemeStyles = () => {
    switch(data.theme) {
      case 'DARK':
        return {
          wrapper: "bg-zinc-950 text-zinc-100 selection:bg-zinc-800",
          card: "bg-zinc-900/20 border border-zinc-900",
          accentText: "text-indigo-400",
          accentBtn: "bg-indigo-600 hover:bg-indigo-550 text-white shadow-md",
          headerBorder: "border-zinc-900",
          heading: "text-white"
        };
      case 'LIGHT':
        return {
          wrapper: "bg-zinc-50 text-zinc-900 selection:bg-zinc-200",
          card: "bg-white border border-zinc-200 shadow-sm",
          accentText: "text-zinc-950",
          accentBtn: "bg-zinc-950 hover:bg-zinc-800 text-white shadow-sm",
          headerBorder: "border-zinc-200",
          heading: "text-zinc-950"
        };
      case 'VIBRANT':
        return {
          wrapper: "bg-gradient-to-tr from-zinc-950 via-zinc-950 to-indigo-950 text-zinc-200 selection:bg-indigo-900",
          card: "bg-zinc-900/30 border border-zinc-850 backdrop-blur-md",
          accentText: "text-indigo-400",
          accentBtn: "bg-indigo-600 hover:bg-indigo-550 text-white shadow-md",
          headerBorder: "border-zinc-900",
          heading: "text-white"
        };
      case 'MINIMAL':
      default:
        return {
          wrapper: "bg-zinc-950 text-zinc-350 selection:bg-zinc-800",
          card: "bg-zinc-900/20 border border-zinc-900",
          accentText: "text-white",
          accentBtn: "bg-white hover:bg-zinc-200 text-zinc-950 font-bold",
          headerBorder: "border-zinc-900",
          heading: "text-white"
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <div className={`min-h-screen relative font-sans flex flex-col justify-between overflow-x-hidden ${theme.wrapper}`}>
      
      {/* Visual top border */}
      <div className="absolute top-0 inset-x-0 h-1 bg-zinc-800" />
      
      {/* Header */}
      <header className={`border-b ${theme.headerBorder} py-6 sticky top-0 bg-transparent backdrop-blur-md z-40 select-none`}>
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <span className={`text-xs font-bold tracking-widest uppercase ${theme.accentText}`}>
            {data.name}
          </span>
          <div className="flex gap-4 items-center">
            <a href={`mailto:${data.email}`} className="text-zinc-550 hover:text-white transition-colors" title="Email">
              <Mail className="h-4.5 w-4.5" />
            </a>
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-zinc-550 hover:text-white transition-colors" title="GitHub">
              <GitHub className="h-4.5 w-4.5" />
            </a>
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-550 hover:text-white transition-colors" title="LinkedIn">
              <LinkedIn className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero content */}
      <main className="max-w-4xl mx-auto px-6 py-16 flex-1 space-y-16">
        
        <section className="space-y-6 text-center sm:text-left">
          <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${theme.heading}`}>
            {data.heroTitle}
          </h1>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl font-normal mx-auto sm:mx-0">
            {data.heroSubtitle}
          </p>
          <div className="pt-2 select-none">
            <a href={`mailto:${data.email}`}>
              <Button className={theme.accentBtn} size="md">
                Get In Touch <Mail className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>

        {/* Biography */}
        <section className="space-y-4">
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-900 pb-1.5 select-none">About Me</h2>
          <p className="text-xs sm:text-sm text-zinc-450 leading-relaxed max-w-3xl font-normal">
            {data.aboutMe}
          </p>
        </section>

        {/* Credentials */}
        {data.credentials.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-900 pb-1.5 select-none">Academic Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.credentials.map((cred, idx) => (
                <Card key={idx} className={`${theme.card} hover:border-zinc-900`}>
                  <div className="p-5 flex items-start gap-4">
                    <div className="h-9 w-9 rounded-lg bg-zinc-950 border border-zinc-850 flex items-center justify-center text-indigo-400 shrink-0 select-none">
                      <ShieldCheck className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-bold ${theme.heading}`}>
                        {cred.name}
                      </h4>
                      <span className="text-[10px] text-emerald-500 font-semibold block mt-0.5">{cred.score}</span>
                      <span className="text-[9px] text-zinc-550 block mt-1">{cred.date}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-900 pb-1.5 select-none">Skills</h2>
          <div className="flex flex-wrap gap-2 select-none">
            {data.skills.map((skill) => (
              <span key={skill} className={`px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 ${theme.card}`}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Projects list */}
        <section className="space-y-4">
          <h2 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 border-b border-zinc-900 pb-1.5 select-none">Selected Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.projects.map((proj, idx) => (
              <Card key={idx} className={`${theme.card} hover:border-zinc-950`}>
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-2">
                    <h3 className={`font-bold text-sm ${theme.heading}`}>
                      {proj.title}
                    </h3>
                    <p className="text-[11px] text-zinc-500 leading-relaxed font-normal">
                      {proj.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-zinc-900/10 flex justify-between items-center gap-4 select-none">
                    <div className="flex flex-wrap gap-1">
                      {proj.tech.map(t => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-zinc-950/40 border border-zinc-900 text-zinc-550 text-[8px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[9px] font-bold text-zinc-450 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider"
                      >
                        Code <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={`border-t ${theme.headerBorder} py-8 select-none`}>
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-550 font-medium">
          <span>&copy; {new Date().getFullYear()} {data.name}. Powered by Growzi.</span>
          <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
            <ArrowLeft className="h-3 w-3" /> Growzi Homepage
          </Link>
        </div>
      </footer>

    </div>
  );
}
