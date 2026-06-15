"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

type RequestSummary = {
  id: string;
  type: 'Custom Project' | 'Website Request' | 'Notes Request';
  status: 'In Progress' | 'Pending' | 'Completed';
};

const mockRequests: RequestSummary[] = [
  { id: "req-1", type: "Custom Project", status: "In Progress" },
  { id: "req-2", type: "Website Request", status: "Pending" },
  { id: "req-3", type: "Notes Request", status: "Completed" }
];

const mockDownloads = [
  "Java Notes",
  "Python Lab Manual",
  "DBMS Question Paper"
];

export default function StudentDashboardOverview() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-12 max-w-2xl mx-auto pb-16">
        <div className="h-12 w-64 bg-slate-200 rounded-lg animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-14 bg-slate-200 rounded-xl animate-pulse" />)}
        </div>
        <div className="space-y-4 mt-12">
          <div className="h-8 w-32 bg-slate-200 rounded animate-pulse" />
          <div className="h-24 bg-slate-200 rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  const getStatusStyle = (status: RequestSummary['status']) => {
    switch (status) {
      case 'In Progress': return "text-blue-600";
      case 'Pending': return "text-amber-600";
      case 'Completed': return "text-emerald-600";
    }
  };

  return (
    <div className="space-y-10 max-w-2xl mx-auto animate-fade-in relative z-10 pb-20 pt-4">
      
      {/* Welcome Section */}
      <div className="space-y-3">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
          Hello, {user?.name?.split(' ')[0] || "Inderash"} <span className="text-3xl">👋</span>
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          What would you like to do today?
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Link href="/projects" className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-[13px] font-bold text-slate-700 select-none">
          Browse Projects
        </Link>
        <Link href="/dashboard/requests/new" className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-[13px] font-bold text-slate-700 select-none">
          Request Project
        </Link>
        <Link href="/dashboard/resume" className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-[13px] font-bold text-slate-700 select-none">
          Build Resume
        </Link>
        <Link href="/dashboard/portfolio" className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-[13px] font-bold text-slate-700 select-none">
          Build Portfolio
        </Link>
        <Link href="/services" className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-[13px] font-bold text-slate-700 select-none">
          Request Website
        </Link>
        <Link href="/resources" className="flex items-center justify-center p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all text-[13px] font-bold text-slate-700 select-none">
          Request Notes
        </Link>
      </div>

      <div className="h-px w-full bg-slate-200/60 my-2"></div>

      {/* My Requests */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Requests</h2>
        <div className="space-y-4">
          {mockRequests.map(req => (
            <div key={req.id} className="flex justify-between items-center text-[15px] font-medium">
              <span className="text-slate-700">{req.type}</span>
              <span className={getStatusStyle(req.status)}>{req.status}</span>
            </div>
          ))}
        </div>
        <div className="pt-2">
          <Link href="/dashboard/requests" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center gap-1 select-none">
            [ View All ]
          </Link>
        </div>
      </section>

      <div className="h-px w-full bg-slate-200/60 my-2"></div>

      {/* My Resume */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Resume</h2>
        <div className="text-[15px] font-medium text-slate-500">
          Last Updated: 2 Days Ago
        </div>
        <div className="pt-1">
          <Link href="/dashboard/resume" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center gap-1 select-none">
            [ Edit Resume ]
          </Link>
        </div>
      </section>

      <div className="h-px w-full bg-slate-200/60 my-2"></div>

      {/* My Portfolio */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Portfolio</h2>
        <div className="text-[15px] font-medium text-slate-800">
          growzi.in/p/inderash
        </div>
        <div className="pt-1 flex items-center gap-6">
          <Link href="/p/inderash" target="_blank" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center gap-1 select-none">
            [ View ]
          </Link>
          <Link href="/dashboard/portfolio" className="text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors inline-flex items-center gap-1 select-none">
            [ Edit ]
          </Link>
        </div>
      </section>

      <div className="h-px w-full bg-slate-200/60 my-2"></div>

      {/* Recent Downloads */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Recent Downloads</h2>
        <div className="space-y-3">
          {mockDownloads.map((dl, i) => (
            <div key={i} className="text-[15px] font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer">
              {dl}
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-slate-200/60 my-2"></div>

    </div>
  );
}
