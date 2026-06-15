"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  FileText, 
  Download, 
  Sparkles, 
  Check, 
  HelpCircle, 
  Plus, 
  X,
  FileCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/toast";

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'Notes' | 'PDFs' | 'Lab Manuals' | 'Question Papers' | 'Study Materials';
  department: string;
  semester: string;
  subject: string;
  downloads: number;
};

const initialResources: Resource[] = [
  {
    id: "r1",
    title: "Computer Networks Fundamentals Slide Deck",
    description: "Slide deck review covering TCP/IP protocol stack layers, socket client architectures, and routing interfaces.",
    url: "https://example.com/cn-deck.zip",
    type: "Notes",
    department: "Computer Science",
    semester: "Semester 5",
    subject: "Computer Networks",
    downloads: 142
  },
  {
    id: "r2",
    title: "PostgreSQL Database Performance Tuning Cheatsheet",
    description: "PDF cheatsheet summarizing queries optimizations, indexes structures, and explain plans node formats.",
    url: "https://example.com/db-tuning.pdf",
    type: "PDFs",
    department: "Information Technology",
    semester: "Semester 6",
    subject: "DBMS",
    downloads: 89
  },
  {
    id: "r3",
    title: "Microprocessors 8086 Lab Instruction Sheet",
    description: "Comprehensive step-by-step assembly coding directives and register mappings manual.",
    url: "https://example.com/8086-manual.pdf",
    type: "Lab Manuals",
    department: "Computer Science",
    semester: "Semester 4",
    subject: "Microprocessors",
    downloads: 65
  },
  {
    id: "r4",
    title: "Theory of Computation Main Exam Paper 2025",
    description: "Previous year semester question paper featuring context-free grammars, Turing machines, and decodability proofs.",
    url: "https://example.com/toc-paper-2025.pdf",
    type: "Question Papers",
    department: "Computer Science",
    semester: "Semester 5",
    subject: "Theory of Computation",
    downloads: 204
  }
];

const departments = ["All", "Computer Science", "Information Technology", "Electronics", "Mechanical"];
const semesters = ["All", "Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6", "Semester 7", "Semester 8"];
const resourceTypes = ["All", "Notes", "PDFs", "Lab Manuals", "Question Papers", "Study Materials"];

export default function ResourcesPage() {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDept, setActiveDept] = useState("All");
  const [activeSem, setActiveSem] = useState("All");
  const [activeType, setActiveType] = useState("All");

  // Request form state
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [reqDept, setReqDept] = useState("Computer Science");
  const [reqSem, setReqSem] = useState("Semester 5");
  const [reqSub, setReqSub] = useState("");
  const [reqNeeded, setReqNeeded] = useState("");
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);

  const handleDownload = (id: string) => {
    setResources(prev => prev.map(r => {
      if (r.id === id) {
        return { ...r, downloads: r.downloads + 1 };
      }
      return r;
    }));
    toast("File download started", "success");
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqSub.trim() || !reqNeeded.trim()) return;

    setIsSubmittingRequest(true);
    setTimeout(() => {
      setIsSubmittingRequest(false);
      setIsRequestModalOpen(false);
      setReqSub("");
      setReqNeeded("");
      toast("Study material request submitted successfully", "success");
    }, 800);
  };

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = activeDept === "All" || r.department === activeDept;
    const matchesSem = activeSem === "All" || r.semester === activeSem;
    const matchesType = activeType === "All" || r.type === activeType;
    return matchesSearch && matchesDept && matchesSem && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white relative overflow-hidden font-sans flex flex-col justify-between">
      
      <div>
        {/* Navigation */}
        <Header />

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-16 space-y-12 relative z-10 animate-fade-in">
          
          {/* Header Title */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <span className="text-[9px] font-bold text-blue-600 tracking-widest uppercase block select-none">Resources library</span>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-sans">
              Study Materials & Notes
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Find CSE/IT slide decks, manual guides, references, and previous semesters question papers.
            </p>
          </div>

          {/* Large Centered Search Bar */}
          <div className="max-w-xl mx-auto relative select-none">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 pointer-events-none">
              <Search className="h-4 w-4" />
            </span>
            <Input
              placeholder="Search resource files, notes, or subject name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 py-3 rounded-2xl border-slate-200 shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all text-sm h-12"
            />
          </div>

          {/* Filter selection bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm max-w-3xl mx-auto select-none">
            <div>
              <Label>Department</Label>
              <Select
                value={activeDept}
                onChange={(e) => setActiveDept(e.target.value)}
              >
                {departments.map(d => <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>)}
              </Select>
            </div>

            <div>
              <Label>Semester</Label>
              <Select
                value={activeSem}
                onChange={(e) => setActiveSem(e.target.value)}
              >
                {semesters.map(s => <option key={s} value={s}>{s === "All" ? "All Semesters" : s}</option>)}
              </Select>
            </div>

            <div>
              <Label>Format Type</Label>
              <Select
                value={activeType}
                onChange={(e) => setActiveType(e.target.value)}
              >
                {resourceTypes.map(t => <option key={t} value={t}>{t === "All" ? "All Formats" : t}</option>)}
              </Select>
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredResources.map((res) => (
                <Card 
                  key={res.id} 
                  className="flex flex-col justify-between bg-white border border-slate-200 hover:border-slate-350 hover:shadow-md transition-all"
                >
                  <CardHeader className="p-5 border-none pb-0">
                    <div className="flex items-center justify-between mb-4 select-none">
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-150 text-slate-600 text-[8px] font-extrabold uppercase tracking-wider">
                        {res.type}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-150 text-slate-600 text-[8px] font-extrabold uppercase tracking-wider">
                        {res.semester}
                      </span>
                    </div>

                    <CardTitle className="text-sm font-extrabold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
                      {res.title}
                    </CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-1 text-slate-500 font-normal">
                      {res.description}
                    </CardDescription>

                    <div className="mt-4 pt-4 border-t border-slate-100 text-[9px] text-slate-400 flex justify-between font-bold uppercase select-none">
                      <span>Subject: <span className="text-slate-700">{res.subject}</span></span>
                      <span>Dept: <span className="text-slate-700">{res.department.split(" ")[0]}</span></span>
                    </div>
                  </CardHeader>

                  <CardFooter className="px-5 pb-5 pt-4 border-none flex justify-between items-center select-none">
                    <span className="text-[10px] text-slate-400 font-semibold">{res.downloads} downloads</span>
                    <Button
                      onClick={() => handleDownload(res.id)}
                      variant="outline"
                      size="sm"
                      className="font-bold gap-1 shadow-sm"
                    >
                      <Download className="h-3.5 w-3.5 text-blue-600" /> Get Asset
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="p-16 bg-white border border-dashed border-slate-200 rounded-3xl text-center select-none shadow-sm max-w-xl mx-auto">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="font-bold text-slate-900 mb-1 text-sm uppercase tracking-wider">No Resources Found</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No matching study files indexed. Try modifying your department filters or submit a request request below.
              </p>
            </div>
          )}

          {/* Request callout */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 select-none shadow-sm max-w-4xl mx-auto mt-16 animate-scale-in">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Can't find what you need?</h3>
              <p className="text-xs text-slate-500">
                Submit details about your department course papers or manual logs, and we will upload them.
              </p>
            </div>
            <Button 
              onClick={() => setIsRequestModalOpen(true)}
              variant="primary" 
              size="sm" 
              className="font-bold gap-1.5 shrink-0"
            >
              <Plus className="h-4 w-4" /> Request Notes or Papers
            </Button>
          </section>

        </main>
      </div>

      <Footer />

      {/* Request Modal Overlay */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <Card className="w-full max-w-md bg-white border-slate-200 overflow-hidden shadow-2xl animate-scale-in">
            <CardHeader className="h-14 px-6 border-b border-slate-100 flex flex-row items-center justify-between shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Request Resource Asset</span>
              <button 
                onClick={() => setIsRequestModalOpen(false)}
                className="text-slate-400 hover:text-slate-950 p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </CardHeader>

            <form onSubmit={handleRequestSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <Select
                    value={reqDept}
                    onChange={(e) => setReqDept(e.target.value)}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                  </Select>
                </div>

                <div>
                  <Label>Semester</Label>
                  <Select
                    value={reqSem}
                    onChange={(e) => setReqSem(e.target.value)}
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Subject Name</Label>
                <Input
                  required
                  value={reqSub}
                  onChange={(e) => setReqSub(e.target.value)}
                  placeholder="e.g. Microprocessors 8086"
                />
              </div>

              <div>
                <Label>Material Needed / Notes Type</Label>
                <Textarea
                  required
                  value={reqNeeded}
                  onChange={(e) => setReqNeeded(e.target.value)}
                  placeholder="Describe the lecture files, slide decks, or exam guides needed..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  isLoading={isSubmittingRequest}
                  className="font-bold"
                >
                  <Check className="h-4 w-4" /> Submit Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

    </div>
  );
}
