"use client";

import { useState } from "react";
import { 
  Terminal, 
  Plus, 
  Clock, 
  CheckCircle, 
  Loader2, 
  X, 
  Sparkles, 
  MessageSquare, 
  Layers, 
  Calendar, 
  DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";

type ProjectRequest = {
  id: string;
  type: 'CUSTOM_PROJECT' | 'WEBSITE_DEVELOPMENT';
  title: string;
  details: string;
  budget: number;
  deadline: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  adminReply?: string;
  createdAt: string;
};

const initialRequests: ProjectRequest[] = [
  {
    id: "req-1",
    type: "CUSTOM_PROJECT",
    title: "E-Commerce App with Payment integrations",
    details: "Tech Stack: React, Next.js, Stripe, Prisma\nRequirements: Looking for a complete shopping cart build with stripe checkout, order summary dashboard, and receipt mailing.",
    budget: 250,
    deadline: "2026-07-15",
    status: "IN_REVIEW",
    adminReply: "Reviewing tech stack requirements. We will match you with a technical guide shortly.",
    createdAt: "2026-06-14"
  },
  {
    id: "req-2",
    type: "WEBSITE_DEVELOPMENT",
    title: "Carter Consulting Business Website",
    details: "Static consultation brochure website. Includes: testimonial carousel slider, custom pricing calculator grids, and feedback submission forms.",
    budget: 150,
    deadline: "2026-08-01",
    status: "PENDING",
    createdAt: "2026-06-15"
  }
];

export default function StudentRequestsPage() {
  const [requests, setRequests] = useState<ProjectRequest[]>(initialRequests);
  const [activeTab, setActiveTab] = useState<'ALL' | 'CUSTOM_PROJECT' | 'WEBSITE'>('ALL');
  
  // Modals
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const [activeRequest, setActiveRequest] = useState<ProjectRequest | null>(null);

  // Custom Project Form
  const [projectTitle, setProjectTitle] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectSpecs, setProjectSpecs] = useState("");
  const [projectDeadline, setProjectDeadline] = useState("");
  const [projectBudget, setProjectBudget] = useState(200);

  // Website Form
  const [webName, setWebName] = useState("");
  const [webType, setWebType] = useState("Portfolio");
  const [webSpecs, setWebSpecs] = useState("");
  const [webDeadline, setWebDeadline] = useState("");
  const [webBudget, setWebBudget] = useState(150);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !projectSpecs) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReq: ProjectRequest = {
        id: "req-" + Date.now(),
        type: "CUSTOM_PROJECT",
        title: projectTitle,
        details: `Tech Stack: ${projectTech}\nRequirements: ${projectSpecs}`,
        budget: projectBudget,
        deadline: projectDeadline || "2026-07-30",
        status: "PENDING",
        createdAt: new Date().toISOString().split("T")[0]
      };

      setRequests([newReq, ...requests]);
      setProjectModalOpen(false);
      setProjectTitle("");
      setProjectTech("");
      setProjectSpecs("");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleWebsiteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!webName || !webSpecs) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReq: ProjectRequest = {
        id: "req-" + Date.now(),
        type: "WEBSITE_DEVELOPMENT",
        title: `${webName} (${webType} Build)`,
        details: webSpecs,
        budget: webBudget,
        deadline: webDeadline || "2026-08-15",
        status: "PENDING",
        createdAt: new Date().toISOString().split("T")[0]
      };

      setRequests([newReq, ...requests]);
      setWebsiteModalOpen(false);
      setWebName("");
      setWebSpecs("");
      setIsSubmitting(false);
    }, 1000);
  };

  const getStatusColor = (status: ProjectRequest['status']) => {
    switch(status) {
      case 'PENDING': return "bg-zinc-950 border-zinc-900 text-zinc-500";
      case 'IN_REVIEW': return "bg-amber-950/20 border-amber-900/30 text-amber-450";
      case 'APPROVED': return "bg-indigo-950/20 border-indigo-900/30 text-indigo-400";
      case 'IN_PROGRESS': return "bg-blue-950/20 border-blue-900/30 text-blue-400";
      case 'COMPLETED': return "bg-emerald-950/20 border-emerald-900/30 text-emerald-400";
      case 'REJECTED': return "bg-rose-950/20 border-rose-900/30 text-rose-450";
    }
  };

  const filteredRequests = requests.filter(r => {
    if (activeTab === "ALL") return true;
    if (activeTab === "CUSTOM_PROJECT") return r.type === "CUSTOM_PROJECT";
    return r.type === "WEBSITE_DEVELOPMENT";
  });

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Terminal className="h-6 w-6 text-indigo-500" />
            Service & Custom Requests
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Submit custom programming requirements or brochure website specifications. Track development logs.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWebsiteModalOpen(true)}
            className="font-semibold"
          >
            Request Website
          </Button>

          <Button
            variant="indigo"
            size="sm"
            onClick={() => setProjectModalOpen(true)}
            className="font-semibold"
          >
            <Plus className="h-4 w-4" /> Request Custom Project
          </Button>
        </div>
      </div>

      {/* Selector tabs */}
      <div className="flex bg-zinc-950 border border-zinc-900 p-1 rounded-xl gap-1 shrink-0 max-w-sm select-none">
        {(['ALL', 'CUSTOM_PROJECT', 'WEBSITE'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === tab
                ? "bg-zinc-900 text-white shadow-sm border border-zinc-800"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequests.map((req) => (
            <Card
              key={req.id}
              onClick={() => setActiveRequest(req)}
              className="flex flex-col justify-between cursor-pointer group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-2 select-none">
                  <span className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-850 text-zinc-500 text-[8px] font-bold uppercase tracking-wider">
                    {req.type.replace("_", " ")}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full border text-[8px] font-semibold uppercase tracking-wider ${getStatusColor(req.status)}`}>
                    {req.status.replace("_", " ")}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm leading-snug group-hover:text-indigo-400 transition-colors">
                  {req.title}
                </h3>
                <p className="text-xs text-zinc-450 leading-relaxed line-clamp-3 whitespace-pre-wrap font-normal">
                  {req.details}
                </p>

                {req.adminReply && (
                  <div className="p-3 bg-indigo-950/10 border border-indigo-900/20 rounded-xl text-indigo-300 text-[10px] leading-relaxed font-normal">
                    <strong>Admin Reply:</strong> {req.adminReply}
                  </div>
                )}
              </CardContent>

              <div className="px-6 pb-6 pt-3 border-t border-zinc-900/40 flex items-center justify-between text-[10px] text-zinc-500 select-none">
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-zinc-655" /> Due: {req.deadline}</span>
                <span className="font-bold text-white text-xs">${req.budget}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl text-center select-none">
          <Terminal className="h-10 w-10 text-zinc-750 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">No Active Orders</h3>
          <p className="text-xs text-zinc-550 max-w-sm mx-auto">
            You haven&apos;t submitted technical website builds or academic project requests.
          </p>
        </div>
      )}

      {/* Project request modal */}
      {projectModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <Card className="w-full max-w-lg border-zinc-850 overflow-hidden shadow-2xl animate-scale-in">
            <CardHeader className="h-14 px-6 border-b border-zinc-900 flex flex-row items-center justify-between shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Request Custom Coding Project</span>
              <button onClick={() => setProjectModalOpen(false)} className="text-zinc-400 hover:text-white p-1 rounded-md">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>

            <form onSubmit={handleCustomProjectSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto select-text">
              <div>
                <Label>Project Title</Label>
                <Input
                  required
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Chat App using Flutter"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Target Stack</Label>
                  <Input
                    required
                    value={projectTech}
                    onChange={(e) => setProjectTech(e.target.value)}
                    placeholder="e.g. Flutter, Firebase"
                  />
                </div>

                <div>
                  <Label>Expected Budget ($)</Label>
                  <Input
                    type="number"
                    required
                    value={projectBudget}
                    onChange={(e) => setProjectBudget(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label>Submission Deadline</Label>
                <Input
                  type="date"
                  required
                  value={projectDeadline}
                  onChange={(e) => setProjectDeadline(e.target.value)}
                  className="text-zinc-400"
                />
              </div>

              <div>
                <Label>Detailed Requirements</Label>
                <Textarea
                  required
                  value={projectSpecs}
                  onChange={(e) => setProjectSpecs(e.target.value)}
                  placeholder="Describe modules, expected database schemas, views specifications, etc."
                  rows={4}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 shrink-0 select-none">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setProjectModalOpen(false)}
                  className="font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="indigo"
                  size="sm"
                  isLoading={isSubmitting}
                  className="font-semibold"
                >
                  Submit Request
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Website build request modal */}
      {websiteModalOpen && (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <Card className="w-full max-w-lg border-zinc-850 overflow-hidden shadow-2xl animate-scale-in">
            <CardHeader className="h-14 px-6 border-b border-zinc-900 flex flex-row items-center justify-between shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Order Website Development</span>
              <button onClick={() => setWebsiteModalOpen(false)} className="text-zinc-400 hover:text-white p-1 rounded-md">
                <X className="h-5 w-5" />
              </button>
            </CardHeader>

            <form onSubmit={handleWebsiteSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto select-text">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Business Name / Name</Label>
                  <Input
                    required
                    value={webName}
                    onChange={(e) => setWebName(e.target.value)}
                    placeholder="e.g. Carter Consulting"
                  />
                </div>

                <div>
                  <Label>Website Type</Label>
                  <Select
                    value={webType}
                    onChange={(e) => setWebType(e.target.value)}
                  >
                    <option value="Portfolio">Brochure Portfolio</option>
                    <option value="Consulting">Consulting Business</option>
                    <option value="SaaS">SaaS Landing Page</option>
                    <option value="E-Commerce">E-Commerce Shop</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expected Budget ($)</Label>
                  <Input
                    type="number"
                    required
                    value={webBudget}
                    onChange={(e) => setWebBudget(Number(e.target.value))}
                  />
                </div>

                <div>
                  <Label>Target Deadline</Label>
                  <Input
                    type="date"
                    required
                    value={webDeadline}
                    onChange={(e) => setWebDeadline(e.target.value)}
                    className="text-zinc-400"
                  />
                </div>
              </div>

              <div>
                <Label>Features & Specifications</Label>
                <Textarea
                  required
                  value={webSpecs}
                  onChange={(e) => setWebSpecs(e.target.value)}
                  placeholder="List pages needed, integrations (Stripe, Calendly), dark mode toggle features, etc."
                  rows={4}
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 shrink-0 select-none">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setWebsiteModalOpen(false)}
                  className="font-semibold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="indigo"
                  size="sm"
                  isLoading={isSubmitting}
                  className="font-semibold"
                >
                  Order Website
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
