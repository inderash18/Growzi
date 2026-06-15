"use client";

import { useState } from "react";
import { 
  Terminal, 
  User,
  Calendar,
  DollarSign,
  Search,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input, Label, Textarea, Select } from "@/components/ui/input";

type RequestItem = {
  id: string;
  studentName: string;
  college: string;
  department: string;
  type: 'CUSTOM_PROJECT' | 'WEBSITE_DEVELOPMENT';
  title: string;
  details: string;
  budget: number;
  deadline: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED';
  adminReply?: string;
  createdAt: string;
};

const initialRequests: RequestItem[] = [
  {
    id: "req-1",
    studentName: "Alex Carter",
    college: "Apex Engineering College",
    department: "Computer Science",
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
    studentName: "Alex Carter",
    college: "Apex Engineering College",
    department: "Computer Science",
    type: "WEBSITE_DEVELOPMENT",
    title: "Carter Consulting Business Website",
    details: "Static consultation brochure website. Includes: testimonial carousel slider, custom pricing calculator grids, and feedback submission forms.",
    budget: 150,
    deadline: "2026-08-01",
    status: "PENDING",
    createdAt: "2026-06-15"
  },
  {
    id: "req-3",
    studentName: "Sophia Martinez",
    college: "St. Xavier Institute",
    department: "Electronics",
    type: "CUSTOM_PROJECT",
    title: "Automated Attendance System using Face API",
    details: "Tech Stack: Python, OpenCV, Flask, MySQL\nRequirements: Build a desktop camera pipeline that scans faces, compares embeddings with student photo folders, and marks attendance parameters.",
    budget: 450,
    deadline: "2026-07-20",
    status: "APPROVED",
    adminReply: "Approved for full OpenCV deployment structure. Ready to allocate mentor guide.",
    createdAt: "2026-06-12"
  },
  {
    id: "req-4",
    studentName: "Devon James",
    college: "State Tech University",
    department: "Information Technology",
    type: "WEBSITE_DEVELOPMENT",
    title: "Student Community Forum and Blogs Portal",
    details: "Features: User signup profiles, category pages, content markdown editor post uploads, and likes thread comments sections.",
    budget: 300,
    deadline: "2026-08-10",
    status: "IN_PROGRESS",
    adminReply: "Design system mockups complete. Currently assembling core database schema models for forums.",
    createdAt: "2026-06-10"
  }
];

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>(initialRequests);
  const [activeReqId, setActiveReqId] = useState<string>("req-1");
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'PENDING' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [searchQuery, setSearchQuery] = useState("");

  // Update states
  const [replyText, setReplyText] = useState("Reviewing tech stack requirements. We will match you with a technical guide shortly.");
  const [statusSelect, setStatusSelect] = useState<RequestItem['status']>("IN_REVIEW");
  const [isUpdating, setIsUpdating] = useState(false);

  const activeRequest = requests.find(r => r.id === activeReqId);

  const handleSelectRequest = (req: RequestItem) => {
    setActiveReqId(req.id);
    setReplyText(req.adminReply || "");
    setStatusSelect(req.status);
  };

  const handleUpdateStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReqId) return;

    setIsUpdating(true);
    setTimeout(() => {
      setRequests(prev => prev.map(r => {
        if (r.id === activeReqId) {
          return {
            ...r,
            status: statusSelect,
            adminReply: replyText
          };
        }
        return r;
      }));
      setIsUpdating(false);
    }, 800);
  };

  const getStatusColor = (status: RequestItem['status']) => {
    switch(status) {
      case 'PENDING': return "bg-zinc-950 border-zinc-900 text-zinc-400";
      case 'IN_REVIEW': return "bg-yellow-950/20 border-yellow-900/30 text-yellow-450";
      case 'APPROVED': return "bg-indigo-950/20 border-indigo-900/30 text-indigo-400";
      case 'IN_PROGRESS': return "bg-blue-950/20 border-blue-900/30 text-blue-400";
      case 'COMPLETED': return "bg-emerald-950/20 border-emerald-900/30 text-emerald-400";
      case 'REJECTED': return "bg-rose-950/20 border-rose-900/30 text-rose-455";
    }
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.college.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filterStatus === 'ALL') return true;
    if (filterStatus === 'PENDING') return r.status === 'PENDING';
    if (filterStatus === 'ACTIVE') return ['IN_REVIEW', 'APPROVED', 'IN_PROGRESS'].includes(r.status);
    return r.status === 'COMPLETED';
  });

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16 h-[calc(100vh-8rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 shrink-0 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Terminal className="h-6 w-6 text-rose-500" />
            Service Requests Management
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Review custom student applications, allocate mentors, and update request progress loops.
          </p>
        </div>
      </div>

      {/* Main Grid split */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Order List */}
        <div className="lg:col-span-5 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-zinc-900 flex flex-col gap-3 shrink-0">
            {/* Search */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-655 pointer-events-none">
                <Search className="h-3.5 w-3.5" />
              </span>
              <Input
                type="text"
                placeholder="Search orders or students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 py-2 rounded-xl"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex bg-zinc-950 border border-zinc-900 p-1 rounded-xl gap-1 shrink-0 select-none">
              {(['ALL', 'PENDING', 'ACTIVE', 'COMPLETED'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterStatus(tab)}
                  className={`flex-1 py-1.5 rounded-lg text-[9px] font-bold tracking-wide transition-all uppercase cursor-pointer ${
                    filterStatus === tab
                      ? "bg-zinc-900 text-white shadow-sm border border-zinc-800"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-zinc-900/60 custom-scrollbar">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(req => {
                const isActive = req.id === activeReqId;
                return (
                  <button
                    key={req.id}
                    onClick={() => handleSelectRequest(req)}
                    className={`w-full p-4 text-left transition-all hover:bg-zinc-900/20 flex flex-col gap-2.5 border-l-2 cursor-pointer ${
                      isActive 
                        ? "bg-zinc-900/10 border-rose-500" 
                        : "border-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 select-none">
                      <span className="px-2 py-0.5 rounded-full bg-zinc-950 border border-zinc-850 text-zinc-500 text-[8px] font-bold uppercase tracking-wider">
                        {req.type.replace("_", " ")}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[8px] font-semibold uppercase tracking-wider ${getStatusColor(req.status)}`}>
                        {req.status.replace("_", " ")}
                      </span>
                    </div>

                    <h3 className={`font-bold text-xs truncate w-full ${isActive ? 'text-rose-455' : 'text-zinc-200'}`}>
                      {req.title}
                    </h3>

                    <div className="flex justify-between items-center text-[10px] text-zinc-500 w-full select-none">
                      <span>{req.studentName}</span>
                      <span className="font-semibold text-zinc-350">${req.budget}</span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-zinc-650 flex flex-col items-center justify-center h-full">
                <Terminal className="h-8 w-8 text-zinc-800 mb-2" />
                <p className="text-xs">No requests match filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Action Console */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 rounded-2xl flex flex-col overflow-hidden h-full">
          {activeRequest ? (
            <div className="flex flex-col h-full overflow-hidden">
              
              {/* Header Details */}
              <div className="p-5 border-b border-zinc-900 bg-zinc-900/10 shrink-0">
                <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-500 text-[9px] font-bold uppercase tracking-wider select-none">
                  {activeRequest.type.replace("_", " ")}
                </span>
                <h2 className="text-base font-bold text-white mt-2 leading-tight">{activeRequest.title}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-[10px] text-zinc-550 select-none">
                  <span className="flex items-center gap-1"><User className="h-3.5 w-3.5 text-zinc-600" /> {activeRequest.studentName}</span>
                  <span>•</span>
                  <span>{activeRequest.college} ({activeRequest.department})</span>
                  <span>•</span>
                  <span>Created {activeRequest.createdAt}</span>
                </div>
              </div>

              {/* Central Info Details */}
              <div className="p-5 space-y-5 flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-4 select-none">
                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl">
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-500">Proposed Budget</span>
                    <span className="text-base font-bold text-white inline-flex items-center gap-0.5 mt-0.5"><DollarSign className="h-4 w-4 text-emerald-500" /> {activeRequest.budget}</span>
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded-xl">
                    <span className="block text-[8px] font-bold uppercase tracking-wider text-zinc-500">Submission Target</span>
                    <span className="text-xs font-semibold text-zinc-350 inline-flex items-center gap-1.5 mt-1"><Calendar className="h-4 w-4 text-indigo-400" /> {activeRequest.deadline}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 select-none">Requirements Specification</h4>
                  <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {activeRequest.details}
                  </div>
                </div>

                {/* Status Action Form */}
                <form onSubmit={handleUpdateStatus} className="border-t border-zinc-900/60 pt-5 space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-rose-455 select-none">Fulfillment Controls</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Update Status</Label>
                      <Select
                        value={statusSelect}
                        onChange={(e) => setStatusSelect(e.target.value as any)}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_REVIEW">IN REVIEW</option>
                        <option value="APPROVED">APPROVED (Allocate Mentor)</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="REJECTED">REJECTED</option>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Admin Comments / Build Guidelines</Label>
                    <Textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Instruct details, assign repo links, describe setup parameters for student review..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end pt-2 select-none">
                    <Button
                      type="submit"
                      variant="rose"
                      size="sm"
                      isLoading={isUpdating}
                      className="font-semibold"
                    >
                      <Check className="h-4 w-4" /> Update Order State
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-650 p-8 text-center select-none">
              <Terminal className="h-10 w-10 text-zinc-800 mb-3" />
              <h3 className="font-semibold text-zinc-350">No Request Selected</h3>
              <p className="text-xs max-w-xs text-zinc-500 mt-1 leading-relaxed">
                Select an incoming service order from the sidebar to review parameters or allocate guide pipelines.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
