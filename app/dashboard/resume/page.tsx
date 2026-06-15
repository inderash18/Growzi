"use client";

import { useState } from "react";
import { 
  FileText, 
  Printer, 
  Plus, 
  Trash2, 
  Briefcase, 
  GraduationCap, 
  User, 
  Award, 
  Layers 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";

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
    email: "student@growzi.com",
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
      name: "Real-time Slack Clone",
      description: "Built a fully-featured message board and channel directories catalog. Integrated dynamic sockets overlays.",
    }
  ],
};

export default function StudentResumeBuilder() {
  const [resume, setResume] = useState<ResumeContent>(defaultResume);
  const [template, setTemplate] = useState<'FRESHER' | 'SOFTWARE_ENGINEER' | 'FULL_STACK' | 'DATA_ANALYST'>('SOFTWARE_ENGINEER');
  const [skillInput, setSkillInput] = useState("");
  const [activeTab, setActiveTab] = useState<'CONTACT' | 'EDUCATION' | 'EXPERIENCE' | 'PROJECTS' | 'SKILLS'>('CONTACT');

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
    <div className="space-y-6 animate-fade-in print:p-0 print:m-0 print:bg-white pb-16">
      {/* Print Overrides */}
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
            padding: 40px !important;
            margin: 0px !important;
            z-index: 99999;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0px !important;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-200 pb-5 print:hidden select-none">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
            <FileText className="h-6 w-6 text-blue-600" />
            Resume Builder
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Build a technical CV using standard recruiter templates and export to PDF.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Select
            value={template}
            onChange={(e) => setTemplate(e.target.value as any)}
            className="w-auto font-medium"
          >
            <option value="SOFTWARE_ENGINEER">Software Engineer</option>
            <option value="FULL_STACK">Full Stack Developer</option>
            <option value="DATA_ANALYST">Data Analyst</option>
            <option value="FRESHER">Fresher / Graduate</option>
          </Select>

          <Button
            onClick={handlePrint}
            size="sm"
            className="font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Printer className="h-4 w-4" /> Print / Export PDF
          </Button>
        </div>
      </div>

      {/* Main Workspace Split */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 print:block">
        
        {/* LEFT COLUMN: EDITOR PANEL (hidden during printing) */}
        <div className="space-y-6 print:hidden">
          {/* Section Stepper Tabs */}
          <div className="flex bg-slate-100/50 border border-slate-200 p-1.5 rounded-xl gap-1.5 overflow-x-auto scrollbar-none select-none shadow-sm">
            {(['CONTACT', 'EDUCATION', 'EXPERIENCE', 'PROJECTS', 'SKILLS'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap flex-1 text-center ${
                  activeTab === tab 
                    ? "bg-white text-blue-600 shadow-sm border-slate-200" 
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Stepper Content */}
          {activeTab === 'CONTACT' && (
            <Card className="bg-white border-slate-200 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User className="h-4 w-4 text-blue-500" /> Personal Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-bold">Full Name</Label>
                    <Input
                      type="text"
                      value={resume.personal.fullName}
                      onChange={(e) => updatePersonal("fullName", e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-bold">Email Address</Label>
                    <Input
                      type="email"
                      value={resume.personal.email}
                      onChange={(e) => updatePersonal("email", e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-bold">Phone Number</Label>
                    <Input
                      type="text"
                      value={resume.personal.phone}
                      onChange={(e) => updatePersonal("phone", e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-bold">Location</Label>
                    <Input
                      type="text"
                      value={resume.personal.location}
                      onChange={(e) => updatePersonal("location", e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-bold">GitHub Username</Label>
                    <Input
                      type="text"
                      value={resume.personal.github}
                      onChange={(e) => updatePersonal("github", e.target.value)}
                      className="font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-700 font-bold">LinkedIn Profile URL</Label>
                    <Input
                      type="text"
                      value={resume.personal.linkedin}
                      onChange={(e) => updatePersonal("linkedin", e.target.value)}
                      className="font-medium"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'EDUCATION' && (
            <Card className="bg-white border-slate-200 shadow-sm space-y-4">
              <CardContent className="p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 select-none">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-blue-500" /> Education History
                  </h3>
                  <button 
                    onClick={addEducation}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add School
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative space-y-5">
                      <button
                        onClick={() => removeEducation(idx)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="sm:col-span-2 space-y-1.5">
                          <Label className="text-slate-700 font-bold">School / University</Label>
                          <Input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(idx, "school", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Degree / Course</Label>
                          <Input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">GPA / Score</Label>
                          <Input
                            type="text"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(idx, "gpa", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Dates Attended</Label>
                          <Input
                            type="text"
                            value={edu.date}
                            placeholder="e.g. 2022 - 2026"
                            onChange={(e) => updateEducation(idx, "date", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'EXPERIENCE' && (
            <Card className="bg-white border-slate-200 shadow-sm space-y-4">
              <CardContent className="p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 select-none">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-blue-500" /> Professional Experience
                  </h3>
                  <button 
                    onClick={addExperience}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Work
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.experience.map((exp, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative space-y-5">
                      <button
                        onClick={() => removeExperience(idx)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Company / Organization</Label>
                          <Input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(idx, "company", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Role / Job Title</Label>
                          <Input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(idx, "role", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Duration Dates</Label>
                          <Input
                            type="text"
                            value={exp.date}
                            placeholder="e.g. June 2025 - Present"
                            onChange={(e) => updateExperience(idx, "date", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="sm:col-span-2 space-y-1.5">
                          <Label className="text-slate-700 font-bold">Role Description / Achievements</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(idx, "description", e.target.value)}
                            rows={3}
                            className="font-medium bg-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'PROJECTS' && (
            <Card className="bg-white border-slate-200 shadow-sm space-y-4">
              <CardContent className="p-6 space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3 select-none">
                  <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Layers className="h-4 w-4 text-blue-500" /> Portfolio Projects
                  </h3>
                  <button 
                    onClick={addProject}
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Add Project
                  </button>
                </div>

                <div className="space-y-4">
                  {resume.projects.map((proj, idx) => (
                    <div key={idx} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative space-y-5">
                      <button
                        onClick={() => removeProject(idx)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 cursor-pointer transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <div className="space-y-5">
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Project Name</Label>
                          <Input
                            type="text"
                            value={proj.name}
                            onChange={(e) => updateProject(idx, "name", e.target.value)}
                            className="font-medium bg-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-slate-700 font-bold">Brief Description</Label>
                          <Textarea
                            value={proj.description}
                            onChange={(e) => updateProject(idx, "description", e.target.value)}
                            rows={3}
                            className="font-medium bg-white resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'SKILLS' && (
            <Card className="bg-white border-slate-200 shadow-sm space-y-4">
              <CardContent className="p-6 space-y-5">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Award className="h-4 w-4 text-blue-500" /> Technology Skills
                </h3>

                <form onSubmit={handleAddSkill} className="flex gap-3">
                  <Input
                    placeholder="e.g. Docker, TypeScript, AWS"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="font-medium"
                  />
                  <Button 
                    type="submit"
                    variant="outline"
                    className="font-bold bg-slate-50 border-slate-200 hover:bg-slate-100"
                  >
                    Add Skill
                  </Button>
                </form>

                <div className="flex flex-wrap gap-2 pt-2 select-none">
                  {resume.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-lg bg-blue-50/50 border border-blue-100 text-blue-800 text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      {skill}
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="text-blue-400 hover:text-rose-500 cursor-pointer font-black"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* RIGHT COLUMN: PREVIEW CANVAS (printable frame) */}
        <div className="bg-slate-100/50 rounded-2xl border border-slate-200 xl:sticky xl:top-6 flex justify-center h-max select-text overflow-hidden">
          <div 
            id="resume-print-frame"
            className="w-full max-w-[800px] aspect-[1/1.414] bg-white text-slate-900 p-12 shadow-sm text-[11px] leading-relaxed flex flex-col justify-between origin-top"
            style={{
              fontFamily: template === "FRESHER" ? "ui-sans-serif, system-ui, sans-serif" : "Georgia, serif",
              color: "#0f172a"
            }}
          >
            <div className="space-y-5">
              <div className="text-center space-y-1.5 pb-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 font-sans uppercase">
                  {resume.personal.fullName}
                </h1>
                <p className="text-[9px] text-slate-600 font-sans tracking-wide">
                  {resume.personal.email} &bull; {resume.personal.phone} &bull; {resume.personal.location}
                </p>
                <p className="text-[9px] text-slate-500 font-sans tracking-wide">
                  {resume.personal.github} &bull; {resume.personal.linkedin}
                </p>
              </div>

              <hr className="border-t border-slate-200" />

              {/* SECTION: EDUCATION */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold text-slate-900 font-sans uppercase tracking-wider border-b border-slate-100 pb-0.5">Education</h3>
                <div className="space-y-3">
                  {resume.education.map((edu, i) => (
                    <div key={i} className="flex justify-between">
                      <div>
                        <strong className="text-slate-900 font-sans">{edu.school || "School / University"}</strong>
                        <span className="italic block text-[9.5px] text-slate-600 mt-0.5">{edu.degree || "Degree Details"}</span>
                      </div>
                      <div className="text-right text-[9.5px] text-slate-500">
                        <span>{edu.date || "Dates"}</span>
                        <span className="block font-medium mt-0.5 text-slate-700">GPA: {edu.gpa || "GPA Score"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION: EXPERIENCE */}
              {resume.experience.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-[10px] font-bold text-slate-900 font-sans uppercase tracking-wider border-b border-slate-100 pb-0.5">Experience</h3>
                  <div className="space-y-4">
                    {resume.experience.map((exp, i) => (
                      <div key={i} className="space-y-1.5">
                        <div className="flex justify-between">
                          <div>
                            <strong className="text-slate-900 font-sans">{exp.role || "Job Title"}</strong>
                            <span className="text-slate-600 font-medium"> &ndash; {exp.company || "Company"}</span>
                          </div>
                          <span className="text-[9.5px] text-slate-500 font-medium">{exp.date}</span>
                        </div>
                        <p className="text-[9.5px] text-slate-600 leading-relaxed pl-2.5 border-l-2 border-slate-200 whitespace-pre-wrap">
                          {exp.description || "Describe achievements and responsibilities."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: PROJECTS */}
              {resume.projects.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <h3 className="text-[10px] font-bold text-slate-900 font-sans uppercase tracking-wider border-b border-slate-100 pb-0.5">Projects</h3>
                  <div className="space-y-3">
                    {resume.projects.map((proj, i) => (
                      <div key={i} className="space-y-1.5">
                        <strong className="text-slate-900 font-sans block text-[9.5px]">{proj.name || "Project Name"}</strong>
                        <p className="text-[9.5px] text-slate-600 pl-2.5 border-l-2 border-slate-200 leading-relaxed whitespace-pre-wrap">
                          {proj.description || "Brief explanation of code module achievements."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* SECTION: SKILLS */}
            {resume.skills.length > 0 && (
              <div className="space-y-2 pt-4 border-t border-slate-200 mt-6">
                <h3 className="text-[10px] font-bold text-slate-900 font-sans uppercase tracking-wider">Technical Skills</h3>
                <p className="text-[9.5px] text-slate-600 leading-normal font-medium">
                  <strong className="text-slate-900 font-bold">Technologies:</strong> {resume.skills.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
