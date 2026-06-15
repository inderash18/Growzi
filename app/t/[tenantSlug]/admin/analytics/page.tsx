"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  LineChart as LucideLineChart, 
  Users, 
  Trophy, 
  BookOpen, 
  TrendingUp, 
  ArrowUpRight,
  Download
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

// Mock datasets matching seed files
const weeklyAttempts = [
  { name: "Week 1", attempts: 24, score: 72 },
  { name: "Week 2", attempts: 38, score: 75 },
  { name: "Week 3", attempts: 42, score: 81 },
  { name: "Week 4", attempts: 56, score: 78 },
  { name: "Week 5", attempts: 68, score: 85 },
  { name: "Week 6", attempts: 74, score: 82 }
];

const deptBreakdown = [
  { name: "Computer Science", value: 65, color: "#3b82f6" }, // blue-500
  { name: "Information Tech.", value: 35, color: "#10b981" }, // emerald-500
  { name: "Electronics Eng.", value: 18, color: "#6366f1" }, // indigo-500
  { name: "Management", value: 12, color: "#f59e0b" } // amber-500
];

export default function AdminAnalytics() {
  const { currentTenant } = useTenantStore();

  if (!currentTenant) return null;

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <LucideLineChart className="h-6 w-6 text-indigo-500" style={{ color: currentTenant.secondaryColor }} />
            Institution Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track student quiz completions, resources downloads, and placement readiness rate
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Students</h3>
            <p className="text-2xl font-bold text-white mt-1">124</p>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1.5">
              +12% <ArrowUpRight className="h-3 w-3" /> month
            </span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
            <Users className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Test Score</h3>
            <p className="text-2xl font-bold text-white mt-1">78.5%</p>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5 mt-1.5">
              +2.3% <ArrowUpRight className="h-3 w-3" /> week
            </span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
            <Trophy className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resource Downloads</h3>
            <p className="text-2xl font-bold text-white mt-1">482</p>
            <span className="text-[10px] text-slate-500 font-medium block mt-1.5">PDFs & links</span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>

        <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Placement Readiness</h3>
            <p className="text-2xl font-bold text-white mt-1">82.0%</p>
            <span className="text-[10px] text-slate-500 font-medium block mt-1.5">Target: 90.0%</span>
          </div>
          <div className="h-10 w-10 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
            <TrendingUp className="h-5 w-5" style={{ color: currentTenant.secondaryColor }} />
          </div>
        </div>
      </div>

      {/* Visual Chart Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Weekly attempts line chart */}
        <div className="lg:col-span-2 bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-4">
          <h3 className="font-bold text-white text-sm">Weekly Assessment Attempts</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttempts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px", fontSize: "11px" }}
                  itemStyle={{ color: "#f1f5f9" }}
                  labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                />
                <Bar dataKey="attempts" fill={currentTenant.secondaryColor} radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pie chart breakdown */}
        <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-6 flex flex-col justify-between">
          <h3 className="font-bold text-white text-sm">Onboarded Students by Course</h3>
          
          <div className="h-52 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white">130</span>
              <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mt-0.5">Total Users</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {deptBreakdown.map((entry, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                  <span>{entry.name}</span>
                </div>
                <span className="text-white font-bold">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
