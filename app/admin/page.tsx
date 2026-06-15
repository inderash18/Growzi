"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Terminal, 
  MessageSquare, 
  Download, 
  Clock, 
  Sparkles,
  ChevronRight,
  TrendingUp
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type RequestSummary = {
  id: string;
  studentName: string;
  type: "CUSTOM_PROJECT" | "WEBSITE_DEVELOPMENT";
  title: string;
  budget: number;
  status: "PENDING" | "IN_REVIEW" | "APPROVED" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
};

type TicketSummary = {
  id: string;
  studentName: string;
  subject: string;
  category: "DOUBT" | "TECHNICAL" | "BILLING" | "OTHER";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  createdAt: string;
};

const recentRequests: RequestSummary[] = [
  {
    id: "req-1",
    studentName: "Alex Carter",
    type: "CUSTOM_PROJECT",
    title: "E-Commerce App with Payment integrations",
    budget: 250,
    status: "IN_REVIEW",
    createdAt: "2026-06-14"
  },
  {
    id: "req-2",
    studentName: "Alex Carter",
    type: "WEBSITE_DEVELOPMENT",
    title: "Carter Consulting Business Website",
    budget: 150,
    status: "PENDING",
    createdAt: "2026-06-15"
  },
  {
    id: "req-3",
    studentName: "Sophia Martinez",
    type: "CUSTOM_PROJECT",
    title: "Automated Attendance System using Face API",
    budget: 450,
    status: "APPROVED",
    createdAt: "2026-06-12"
  },
  {
    id: "req-4",
    studentName: "Devon James",
    type: "WEBSITE_DEVELOPMENT",
    title: "Student Community Forum and Blogs Portal",
    budget: 300,
    status: "IN_PROGRESS",
    createdAt: "2026-06-10"
  }
];

const activeTickets: TicketSummary[] = [
  {
    id: "tkt-2",
    studentName: "Alex Carter",
    subject: "Explain React Server Actions state validation strategies",
    category: "DOUBT",
    status: "OPEN",
    createdAt: "2026-06-15"
  },
  {
    id: "tkt-1",
    studentName: "Alex Carter",
    subject: "CORS issues when testing Stripe checkout webhook locally",
    category: "TECHNICAL",
    status: "IN_PROGRESS",
    createdAt: "2026-06-14"
  },
  {
    id: "tkt-3",
    studentName: "Liam Henderson",
    subject: "Trouble downloading CSE Semester 4 Question Papers zip",
    category: "TECHNICAL",
    status: "OPEN",
    createdAt: "2026-06-15"
  }
];

export default function AdminDashboardOverview() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
          <div className="h-96 bg-slate-200 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const getRequestStatusColor = (status: RequestSummary["status"]) => {
    switch (status) {
      case "PENDING": return "bg-slate-100 border-slate-200 text-slate-700";
      case "IN_REVIEW": return "bg-amber-50 border-amber-200 text-amber-700";
      case "APPROVED": return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case "IN_PROGRESS": return "bg-blue-50 border-blue-200 text-blue-700";
      case "COMPLETED": return "bg-emerald-50 border-emerald-200 text-emerald-700";
    }
  };

  const getTicketStatusColor = (status: TicketSummary["status"]) => {
    switch (status) {
      case "OPEN": return "bg-rose-50 border-rose-200 text-rose-700";
      case "IN_PROGRESS": return "bg-amber-50 border-amber-200 text-amber-700";
      case "RESOLVED": return "bg-emerald-50 border-emerald-200 text-emerald-700";
    }
  };

  return (
    <div className="space-y-8 animate-fade-in relative z-10 pb-16">
      
      {/* Welcome Banner */}
      <Card className="relative border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Decorative corner grid or line for start-up feel */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px] [mask-image:linear-gradient(to_left,white,transparent)] pointer-events-none" />
        <CardContent className="p-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-100 bg-blue-50 text-[10px] text-blue-700 font-bold uppercase tracking-wider select-none mb-1">
              <Sparkles className="h-3.5 w-3.5" /> Administrative Hub Active
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              Welcome, Admin {user?.name?.split(" ")[0] || "Marcus"}!
            </h1>
            <p className="text-slate-500 text-xs max-w-xl font-medium leading-relaxed">
              Monitor client custom projects orders, resolve programming doubt threads, manage learning note assets, and publish tech blogs.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 select-none">
        <Card className="bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
          <CardContent className="p-6">
            <Users className="h-5 w-5 text-blue-600 mb-4" />
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Students</h3>
            <p className="text-2xl font-black text-slate-900 mt-1">1,248</p>
            <span className="text-[10px] text-emerald-600 font-bold inline-flex items-center gap-1 mt-2 bg-emerald-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="h-3 w-3" /> +12% this week
            </span>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
          <CardContent className="p-6">
            <Terminal className="h-5 w-5 text-blue-600 mb-4" />
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Requests</h3>
            <p className="text-2xl font-black text-slate-900 mt-1">8</p>
            <span className="text-[10px] text-amber-600 font-bold inline-flex items-center gap-1 mt-2 bg-amber-50 px-2 py-0.5 rounded-md">
              4 pending client briefs
            </span>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
          <CardContent className="p-6">
            <MessageSquare className="h-5 w-5 text-blue-600 mb-4" />
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Support Doubts</h3>
            <p className="text-2xl font-black text-slate-900 mt-1">3</p>
            <span className="text-[10px] text-rose-600 font-bold inline-flex items-center gap-1 mt-2 bg-rose-50 px-2 py-0.5 rounded-md">
              3 unresolved tickets
            </span>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all">
          <CardContent className="p-6">
            <Download className="h-5 w-5 text-blue-600 mb-4" />
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Resource Downloads</h3>
            <p className="text-2xl font-black text-slate-900 mt-1">3,492</p>
            <span className="text-[10px] text-slate-600 font-bold inline-flex items-center gap-1 mt-2 bg-slate-100 px-2 py-0.5 rounded-md">
              Notes & papers
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Grid: Split Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Service Requests Panel */}
        <Card className="bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center select-none">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="h-4.5 w-4.5 text-blue-600" /> Recent Service Requests
            </h3>
            <Link
              href="/admin/requests"
              className="text-slate-400 hover:text-blue-600 text-[10px] font-bold uppercase transition-colors flex items-center gap-1"
            >
              Manage <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          <CardContent className="p-5 space-y-3">
            {recentRequests.map(req => (
              <div key={req.id} className="p-4 bg-slate-50/50 border border-slate-200/60 rounded-xl flex items-center justify-between gap-4 transition-colors hover:bg-slate-50">
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-slate-900 truncate">{req.title}</span>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 select-none">
                    <span className="font-bold text-slate-700">{req.studentName}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-bold">{req.type.replace("_", " ")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 select-none">
                  <span className="text-xs font-black text-slate-900">${req.budget}</span>
                  <span className={`px-2.5 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wider ${getRequestStatusColor(req.status)}`}>
                    {req.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Support doubts / tickets Panel */}
        <Card className="bg-white border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center select-none">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5 text-blue-600" /> Open Support Tickets
            </h3>
            <Link
              href="/admin/tickets"
              className="text-slate-400 hover:text-blue-600 text-[10px] font-bold uppercase transition-colors flex items-center gap-1"
            >
              Manage <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <CardContent className="p-5 space-y-3">
            {activeTickets.map(tkt => (
              <div key={tkt.id} className="p-4 bg-slate-50/50 border border-slate-200/60 rounded-xl flex items-center justify-between gap-4 transition-colors hover:bg-slate-50">
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-slate-900 truncate">{tkt.subject}</span>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-slate-500 select-none">
                    <span className="font-bold text-slate-700">{tkt.studentName}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-bold">{tkt.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 select-none">
                  <span className={`px-2.5 py-1 rounded-md border text-[9px] font-bold uppercase tracking-wider ${getTicketStatusColor(tkt.status)}`}>
                    {tkt.status}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}
