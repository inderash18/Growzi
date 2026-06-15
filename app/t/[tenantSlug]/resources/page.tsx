"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Plus, 
  FileText, 
  Video, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Download, 
  ExternalLink,
  Trash2,
  Check,
  X
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDate } from "@/lib/utils";

type Resource = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'PDF' | 'VIDEO' | 'IMAGE' | 'LINK';
  department: string;
  semester: string;
  subject: string;
  createdAt: string;
  createdBy: string;
};

// Initial dataset mimicking seed database
const initialResources: Resource[] = [
  {
    id: "res-1",
    title: "Computer Networks Fundamentals",
    description: "Comprehensive study guide covering TCP/IP stack layers, routing protocols, and HTTP protocol mechanics.",
    url: "https://www.w3.org/People/Frystyk/book/Overview.html",
    type: "LINK",
    department: "Computer Science",
    semester: "Semester 5",
    subject: "Computer Networks",
    createdAt: "2026-06-14T12:00:00Z",
    createdBy: "Prof. Sarah Miller"
  },
  {
    id: "res-2",
    title: "SQL Performance Tuning Guide",
    description: "Hands-on cheat sheet for indexing strategies, query execution plans, and optimization tips in PostgreSQL.",
    url: "https://example.com/resources/sql-performance.pdf",
    type: "PDF",
    department: "Information Technology",
    semester: "Semester 6",
    subject: "Database Management Systems",
    createdAt: "2026-06-13T10:30:00Z",
    createdBy: "Prof. Sarah Miller"
  },
  {
    id: "res-3",
    title: "Building Microservices with Go",
    description: "Introductory tutorial video demonstrating gRPC setup and containerization of simple Go microservices.",
    url: "https://www.youtube.com/watch?v=mockGoVideo",
    type: "VIDEO",
    department: "Computer Science",
    semester: "Semester 8",
    subject: "Distributed Systems",
    createdAt: "2026-06-12T09:00:00Z",
    createdBy: "Prof. Sarah Miller"
  }
];

export default function ResourceHub() {
  const { currentTenant, activeRole } = useTenantStore();
  const { user } = useAuthStore();

  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedSemester, setSelectedSemester] = useState("All");
  
  // Upload modal states
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState<'PDF' | 'VIDEO' | 'IMAGE' | 'LINK'>('PDF');
  const [department, setDepartment] = useState("Computer Science");
  const [semester, setSemester] = useState("Semester 5");
  const [subject, setSubject] = useState("");

  const isTeacher = activeRole === "ADMIN" || activeRole === "FACULTY" || user?.role === "SUPER_ADMIN";

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !subject) return;

    const newResource: Resource = {
      id: "res-" + Date.now(),
      title,
      description,
      url,
      type,
      department,
      semester,
      subject,
      createdAt: new Date().toISOString(),
      createdBy: user?.name || "Faculty Member"
    };

    setResources([newResource, ...resources]);
    setUploadModalOpen(false);

    // Reset inputs
    setTitle("");
    setDescription("");
    setUrl("");
    setSubject("");
  };

  const handleDelete = (id: string) => {
    setResources(resources.filter(r => r.id !== id));
  };

  // Filter calculations
  const departments = ["All", ...Array.from(new Set(resources.map(r => r.department)))];
  const semesters = ["All", ...Array.from(new Set(resources.map(r => r.semester)))];

  const filteredResources = resources.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || res.department === selectedDept;
    const matchesSem = selectedSemester === "All" || res.semester === selectedSemester;
    return matchesSearch && matchesDept && matchesSem;
  });

  const getIcon = (type: Resource['type']) => {
    switch(type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-400" />;
      case 'VIDEO': return <Video className="h-5 w-5 text-blue-400" />;
      case 'IMAGE': return <ImageIcon className="h-5 w-5 text-emerald-400" />;
      case 'LINK': return <LinkIcon className="h-5 w-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <BookOpen className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Resource Hub
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access course study guides, slide decks, and lecture recordings distributed by faculty
          </p>
        </div>

        {isTeacher && (
          <button
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg shadow-indigo-600/10 shrink-0 border border-indigo-500/30"
            style={{ 
              backgroundColor: currentTenant?.secondaryColor,
              boxShadow: `0 4px 14px ${currentTenant?.secondaryColor}25`
            }}
          >
            <Plus className="h-4 w-4" /> Upload Learning Resource
          </button>
        )}
      </div>

      {/* Filter Control Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/10 border border-slate-900 p-4 rounded-xl">
        <div className="relative md:col-span-2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search by title, topic or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-slate-200 placeholder-slate-600 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-slate-500 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 text-xs text-slate-300"
          >
            {departments.map(d => (
              <option key={d} value={d}>{d === "All" ? "All Departments" : d}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 text-xs text-slate-300"
          >
            {semesters.map(s => (
              <option key={s} value={s}>{s === "All" ? "All Semesters" : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resource Grid Cards */}
      {filteredResources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div 
              key={res.id} 
              className="bg-slate-900/20 border border-slate-900 hover:border-slate-800 p-5 rounded-2xl flex flex-col justify-between transition-all group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-9 w-9 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center">
                    {getIcon(res.type)}
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-850 text-slate-400 text-[10px] font-semibold">
                      {res.department}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-850 text-slate-400 text-[10px] font-semibold">
                      {res.semester}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-400 transition-colors">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {res.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-900/60 text-[10px] text-slate-500 flex justify-between">
                  <span>Subject: <strong className="text-slate-400 font-semibold">{res.subject}</strong></span>
                  <span>Uploaded {formatDate(res.createdAt)}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 flex items-center justify-between gap-4">
                <span className="text-[10px] text-slate-500">By: {res.createdBy}</span>
                <div className="flex items-center gap-2">
                  {isTeacher && (
                    <button
                      onClick={() => handleDelete(res.id)}
                      className="h-8 w-8 rounded-lg bg-slate-950 hover:bg-red-950/40 border border-slate-850 hover:border-red-900/50 flex items-center justify-center text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-3.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-850 flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition-colors"
                  >
                    {res.type === 'PDF' ? (
                      <>
                        <Download className="h-3.5 w-3.5" /> Open
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-3.5 w-3.5" /> View
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl text-center">
          <BookOpen className="h-10 w-10 text-slate-700 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">No Resources Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or filter selectors to find files.
          </p>
        </div>
      )}

      {/* Upload Resource Dialogue Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="h-14 px-6 border-b border-slate-850 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Upload Study Resource</h3>
              <button 
                onClick={() => setUploadModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Course Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics Eng.">Electronics Eng.</option>
                    <option value="Business Management">Business Management</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 5">Semester 5</option>
                    <option value="Semester 6">Semester 6</option>
                    <option value="Semester 7">Semester 7</option>
                    <option value="Semester 8">Semester 8</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Subject Topic
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Distributed Databases"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Resource Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lecture Slides on NoSQL databases"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief summary of the course document contents..."
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    File URL / Document Link
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/file.pdf"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    File Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="PDF">PDF File</option>
                    <option value="VIDEO">Video Link</option>
                    <option value="LINK">External URL</option>
                    <option value="IMAGE">Image File</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-950 border border-slate-850 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  style={{ backgroundColor: currentTenant?.secondaryColor }}
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
