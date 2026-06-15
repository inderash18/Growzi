"use client";

import { useState } from "react";
import { 
  FileText, 
  Printer, 
  Plus, 
  Trash2, 
  Save, 
  ChevronRight, 
  Sliders, 
  Briefcase, 
  GraduationCap, 
  User, 
  Award, 
  Layers 
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

type ResumeContent = {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    github: string;
    linkedin: string;
  };
  education: Array<{
    school: string;
    degree: string;
    date: string;
    gpa: string;
  }>;
  experience: Array<{
    company: string;
    role: string;
    date: string;
    description: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
  }>;
};

const defaultResume: ResumeContent = {
  personal: {
    fullName: "Alex Carter",
    email: "alex.carter@apex.edu",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA",
    github: "github.com/alexcarter",
    linkedin: "linkedin.com/in/alexcarter",
  },
  education: [
    {
      school: "Apex Engineering College",
      degree: "B.S. in Computer Science",
      date: "2022 - 2026",
      gpa: "3.8 / 4.0",
    }
  ],
  experience: [
    {
      company: "Tech Startups Inc",
      role: "Software Engineering Intern",
      date: "Summer 2025",
      description: "Developed frontend interface for customer management dashboard using React and Tailwind CSS. Optimized database queries in PostgreSQL, achieving a 20% reduction in API response times.",
    }
  ],
  skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Git"],
  projects: [
    {
      name: "Enterprise SaaS Analytics Portal",
      description: "Built a fully-featured client billing and logs display module. Integrated Recharts visualization overlays.",
    }
  ],
};

export default function ResumeBuilder() {
  const { currentTenant } = useTenantStore();

  const [resume, setResume] = useState<ResumeContent>(defaultResume);
  const [template, setTemplate] = useState<'FRESHER' | 'SOFTWARE_ENGINEER' | 'FULL_STACK' | 'DATA_ANALYST'>('SOFTWARE_ENGINEER');
  const [skillInput, setSkillInput] = useState("");

  const handlePrint = () => {
    window.print();
  };

  const updatePersonal = (field: keyof ResumeContent['personal'], value: string) => {
    setResume({
      ...resume,
      personal: {
        ...resume.personal,
        [field]: value
      }
    });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        { company: "", role: "", date: "", description: "" }
      ]
    });
  };

  const removeExperience = (index: number) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index)
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const nextExp = [...resume.experience];
    nextExp[index] = { ...nextExp[index], [field]: value };
    setResume({ ...resume, experience: nextExp });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        { school: "", degree: "", date: "", gpa: "" }
      ]
    });
  };

  const removeEducation = (index: number) => {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index)
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const nextEd = [...resume.education];
    nextEd[index] = { ...nextEd[index], [field]: value };
    setResume({ ...resume, education: nextEd });
  };

  const addProject = () => {
    setResume({
      ...resume,
      projects: [
        ...resume.projects,
        { name: "", description: "" }
      ]
    });
  };

  const removeProject = (index: number) => {
    setResume({
      ...resume,
      projects: resume.projects.filter((_, i) => i !== index)
    });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const nextProj = [...resume.projects];
    nextProj[index] = { ...nextProj[index], [field]: value };
    setResume({ ...resume, projects: nextProj });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;
    if (!resume.skills.includes(skillInput.trim())) {
      setResume({
        ...resume,
        skills: [...resume.skills, skillInput.trim()]
      });
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setResume({
      ...resume,
      skills: resume.skills.filter(s => s !== skill)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in print:p-0 print:m-0 print:bg-white">
      {/* Dynamic Print Helper Class Injected */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
            background: white !important;
            color: black !important;
          }
          main, main * {
            visibility: hidden;
          }
          header, header * {
            visibility: hidden;
          }
          aside, aside * {
            visibility: hidden;
          }
          #resume-print-frame, #resume-print-frame * {
            visibility: visible;
          }
          #resume-print-frame {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background: white !important;
            color: black !important;
            padding: 0px !important;
            margin: 0px !important;
            z-index: 99999;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0px !important;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5 print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <FileText className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Resume Builder
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build a professional engineering, analyst, or developer resume and export to PDF.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value as any)}
            className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 shrink-0"
          >
            <option value="SOFTWARE_ENGINEER">Software Engineer Template</option>
            <option value="FULL_STACK">Full Stack Developer Template</option>
            <option value="DATA_ANALYST">Data Analyst Template</option>
            <option value="FRESHER">Fresher Template</option>
          </select>

          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg border border-indigo-500/30"
            style={{ 
              backgroundColor: currentTenant?.secondaryColor,
              boxShadow: `0 4px 14px ${currentTenant?.secondaryColor}25`
            }}
          >
            <Printer className="h-4 w-4" /> Print / Export PDF
          </button>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print:block">
        
        {/* LEFT COLUMN: EDITOR PANEL (hidden during printing) */}
        <div className="space-y-6 print:hidden">
          
          {/* Section 1: Personal Contact */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
              <User className="h-4 w-4 text-indigo-400" /> Personal Details
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={resume.personal.fullName}
                  onChange={(e) => updatePersonal("fullName", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={resume.personal.email}
                  onChange={(e) => updatePersonal("email", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={resume.personal.phone}
                  onChange={(e) => updatePersonal("phone", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Location</label>
                <input
                  type="text"
                  value={resume.personal.location}
                  onChange={(e) => updatePersonal("location", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">GitHub Username</label>
                <input
                  type="text"
                  value={resume.personal.github}
                  onChange={(e) => updatePersonal("github", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">LinkedIn Profile</label>
                <input
                  type="text"
                  value={resume.personal.linkedin}
                  onChange={(e) => updatePersonal("linkedin", e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Education */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-indigo-400" /> Education History
              </h3>
              <button 
                onClick={addEducation}
                className="text-xs font-semibold text-indigo-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>

            {resume.education.map((edu, idx) => (
              <div key={idx} className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl relative space-y-3">
                <button
                  onClick={() => removeEducation(idx)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">School / University</label>
                    <input
                      type="text"
                      value={edu.school}
                      onChange={(e) => updateEducation(idx, "school", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Degree / Course</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">GPA / Score</label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(idx, "gpa", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Dates Attended</label>
                    <input
                      type="text"
                      value={edu.date}
                      placeholder="e.g. 2022 - 2026"
                      onChange={(e) => updateEducation(idx, "date", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 3: Work Experience */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-indigo-400" /> Professional Experience
              </h3>
              <button 
                onClick={addExperience}
                className="text-xs font-semibold text-indigo-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>

            {resume.experience.map((exp, idx) => (
              <div key={idx} className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl relative space-y-3">
                <button
                  onClick={() => removeExperience(idx)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Company / Organization</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(idx, "company", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Role / Job Title</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(idx, "role", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Duration Dates</label>
                    <input
                      type="text"
                      value={exp.date}
                      placeholder="e.g. June 2025 - Present"
                      onChange={(e) => updateExperience(idx, "date", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Role Description / Achievements</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => updateExperience(idx, "description", e.target.value)}
                      rows={3}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Projects */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-900 pb-3">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Layers className="h-4 w-4 text-indigo-400" /> Academic & Personal Projects
              </h3>
              <button 
                onClick={addProject}
                className="text-xs font-semibold text-indigo-400 hover:text-white transition-colors flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </div>

            {resume.projects.map((proj, idx) => (
              <div key={idx} className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl relative space-y-3">
                <button
                  onClick={() => removeProject(idx)}
                  className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Project Name</label>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(idx, "name", e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-1">Brief Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(idx, "description", e.target.value)}
                      rows={2}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Section 5: Skills */}
          <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-900 pb-3">
              <Award className="h-4 w-4 text-indigo-400" /> Technology Skills
            </h3>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Docker"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs text-slate-300 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold"
              >
                Add Skill
              </button>
            </form>

            <div className="flex flex-wrap gap-2 pt-2">
              {resume.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="px-2.5 py-1 rounded bg-slate-950 border border-slate-850 text-slate-300 text-xs flex items-center gap-1.5"
                >
                  {skill}
                  <button 
                    onClick={() => removeSkill(skill)}
                    className="text-slate-500 hover:text-red-400"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PREVIEW CANVAS (printable frame) */}
        <div className="bg-slate-950 xl:sticky xl:top-6 flex justify-center">
          <div 
            id="resume-print-frame"
            className="w-full max-w-[800px] aspect-[1/1.414] bg-white text-slate-900 p-10 shadow-2xl rounded-2xl font-serif text-[11px] leading-relaxed border border-slate-100 flex flex-col justify-between"
            style={{
              fontFamily: template === "FRESHER" ? "sans-serif" : "Georgia, serif"
            }}
          >
            {/* Template Header layout */}
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h1 className="text-2xl font-bold tracking-tight text-slate-950 font-sans uppercase">
                  {resume.personal.fullName}
                </h1>
                <p className="text-[10px] text-slate-600 font-sans tracking-wide">
                  {resume.personal.email} &bull; {resume.personal.phone} &bull; {resume.personal.location}
                </p>
                <p className="text-[9px] text-indigo-700 font-sans font-medium tracking-wide">
                  {resume.personal.github} &bull; {resume.personal.linkedin}
                </p>
              </div>

              {/* Template specifics style overrides */}
              <hr className="border-t border-slate-300" />

              {/* SECTION: EDUCATION */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-950 font-sans uppercase tracking-wider">Education</h3>
                <div className="space-y-2">
                  {resume.education.map((edu, i) => (
                    <div key={i} className="flex justify-between">
                      <div>
                        <strong className="text-slate-950">{edu.school}</strong>
                        <span className="italic block text-[10px] text-slate-600">{edu.degree}</span>
                      </div>
                      <div className="text-right text-[10px] text-slate-600">
                        <span>{edu.date}</span>
                        <span className="block font-medium">GPA: {edu.gpa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: EXPERIENCE */}
              {resume.experience.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-950 font-sans uppercase tracking-wider">Experience</h3>
                  <div className="space-y-3">
                    {resume.experience.map((exp, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between">
                          <div>
                            <strong className="text-slate-950">{exp.role}</strong>
                            <span className="text-slate-600"> &ndash; {exp.company}</span>
                          </div>
                          <span className="text-[10px] text-slate-600">{exp.date}</span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-normal pl-2 border-l border-slate-200">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: PROJECTS */}
              {resume.projects.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h3 className="text-xs font-bold text-slate-950 font-sans uppercase tracking-wider">Projects</h3>
                  <div className="space-y-2">
                    {resume.projects.map((proj, i) => (
                      <div key={i} className="space-y-0.5">
                        <strong className="text-slate-950 block text-[10px]">{proj.name}</strong>
                        <p className="text-[10px] text-slate-600 pl-2 leading-normal">
                          {proj.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION: SKILLS */}
            {resume.skills.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-950 font-sans uppercase tracking-wider">Technical Skills</h3>
                <p className="text-[10px] text-slate-700 leading-normal">
                  <strong className="text-slate-950">Technologies:</strong> {resume.skills.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
