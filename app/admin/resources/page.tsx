"use client";

import { useState } from "react";
import { BookOpen, Plus, Edit, Trash, Settings, Sparkles, Check, Download, FileText, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

type Resource = {
  id: string;
  title: string;
  subject: string;
  type: 'PDF' | 'ZIP' | 'LINK';
  department: string;
  semester: string;
  url: string;
};

const initialResources: Resource[] = [
  {
    id: "r1",
    title: "Computer Networks Fundamentals Slide Deck",
    subject: "Computer Networks",
    type: "ZIP",
    department: "Computer Science",
    semester: "Semester 5",
    url: "https://example.com/cn-deck.zip"
  },
  {
    id: "r2",
    title: "PostgreSQL Database Performance Tuning Cheatsheet",
    subject: "DBMS",
    type: "PDF",
    department: "Information Technology",
    semester: "Semester 6",
    url: "https://example.com/db-tuning.pdf"
  }
];

export default function AdminResourcesPage() {
  const { toast } = useToast();
  const [resourcesList, setResourcesList] = useState<Resource[]>(initialResources);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [type, setType] = useState<'PDF' | 'ZIP' | 'LINK'>("PDF");
  const [department, setDepartment] = useState("Computer Science");
  const [semester, setSemester] = useState("Semester 5");
  const [url, setUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = (r: Resource) => {
    setEditingId(r.id);
    setTitle(r.title);
    setSubject(r.subject);
    setType(r.type);
    setDepartment(r.department);
    setSemester(r.semester);
    setUrl(r.url);
  };

  const handleClear = () => {
    setEditingId(null);
    setTitle("");
    setSubject("");
    setType("PDF");
    setDepartment("Computer Science");
    setSemester("Semester 5");
    setUrl("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim() || !subject.trim()) return;

    setIsSaving(true);
    setTimeout(() => {
      if (editingId) {
        setResourcesList(prev => prev.map(r => {
          if (r.id === editingId) {
            return { ...r, title, subject, type, department, semester, url };
          }
          return r;
        }));
        toast("Study resource modified successfully", "success");
      } else {
        const newRes: Resource = {
          id: "res-" + Date.now(),
          title,
          subject,
          type,
          department,
          semester,
          url
        };
        setResourcesList([newRes, ...resourcesList]);
        toast("New study resource added successfully", "success");
      }
      handleClear();
      setIsSaving(false);
    }, 800);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setResourcesList(prev => prev.filter(r => r.id !== id));
      toast("Resource asset cleared from database", "info");
      if (editingId === id) handleClear();
    }
  };

  const getIcon = (t: Resource['type']) => {
    switch(t) {
      case 'PDF': return <FileText className="h-4 w-4 text-red-400" />;
      case 'LINK': return <LinkIcon className="h-4 w-4 text-indigo-400" />;
      default: return <Download className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="border-b border-zinc-900 pb-5 shrink-0 select-none">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
          <BookOpen className="h-6 w-6 text-rose-500" />
          Study Resources Manager
        </h1>
        <p className="text-xs text-zinc-500 mt-1 font-normal">
          Upload class notes, add PPT slide links, catalog examination syllabus PDF files, and manage download libraries.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Upload Form */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 p-6 rounded-2xl space-y-6">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-2 select-none">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            {editingId ? "Modify Study Resource Specs" : "Upload New Study Resource"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Resource Title</Label>
                <Input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Computer Networks Fundamentals Slide Deck"
                />
              </div>

              <div>
                <Label>Subject Name</Label>
                <Input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Computer Networks"
                />
              </div>

              <div>
                <Label>Asset Format Type</Label>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                >
                  <option value="PDF">PDF Document</option>
                  <option value="ZIP">ZIP Archive / PPT</option>
                  <option value="LINK">External URL Link</option>
                </Select>
              </div>

              <div>
                <Label>Department</Label>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                </Select>
              </div>

              <div>
                <Label>Semester</Label>
                <Select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                >
                  <option value="Semester 5">Semester 5</option>
                  <option value="Semester 6">Semester 6</option>
                  <option value="Semester 7">Semester 7</option>
                  <option value="Semester 8">Semester 8</option>
                </Select>
              </div>
            </div>

            <div>
              <Label>Asset Download URL Path</Label>
              <Input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste host link or local path..."
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
                <Check className="h-4 w-4" /> {editingId ? "Update Resource" : "Upload Resource"}
              </Button>
            </div>
          </form>
        </div>

        {/* Right: Listings */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="bg-zinc-950">
            <CardHeader className="border-b border-zinc-900/40 select-none pb-4">
              <span className="text-[10px] font-bold text-zinc-550 uppercase tracking-widest block">Active Catalog</span>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              {resourcesList.map(res => (
                <div key={res.id} className="p-3.5 bg-zinc-950 border border-zinc-900 rounded-xl space-y-3 relative group">
                  <div className="overflow-hidden">
                    <div className="flex items-center justify-between gap-2 select-none mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-850 text-zinc-550 text-[8px] font-bold uppercase tracking-wider flex items-center gap-1">
                        {getIcon(res.type)} {res.type}
                      </span>
                      <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-wider block">{res.semester}</span>
                    </div>
                    <h4 className="font-bold text-xs text-white truncate mt-0.5">{res.title}</h4>
                    <span className="block text-[9px] text-zinc-550 mt-1 uppercase font-bold select-none">Subject: {res.subject}</span>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 text-[9px] text-zinc-550 select-none">
                    <span>Dept: {res.department.split(" ")[0]}</span>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(res)}
                        className="text-zinc-450 hover:text-white transition-colors cursor-pointer"
                        title="Edit Resource"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(res.id, res.title)}
                        className="text-rose-500/80 hover:text-rose-400 transition-colors cursor-pointer"
                        title="Delete Resource"
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
