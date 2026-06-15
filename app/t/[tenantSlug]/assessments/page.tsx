"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Trophy, 
  Search, 
  Plus, 
  Clock, 
  Award, 
  Layers, 
  CheckCircle, 
  Play, 
  X, 
  FileCheck,
  TrendingUp
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";
import { useAuthStore } from "@/store/useAuthStore";
import { formatDate } from "@/lib/utils";

type Test = {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  passingScore: number;
  type: 'MCQ' | 'CODING' | 'SUBJECTIVE';
  questionsCount: number;
  score?: number;
  status: 'NOT_STARTED' | 'COMPLETED';
};

const initialTests: Test[] = [
  {
    id: "test-1",
    title: "Core Web Technologies Quiz",
    description: "Evaluate your understanding of CSS Grid, JavaScript event loop mechanisms, and DOM manipulation basics.",
    durationMinutes: 15,
    passingScore: 60,
    type: "MCQ",
    questionsCount: 3,
    score: 30, // 30/30 (Perfect Pass)
    status: "COMPLETED",
  },
  {
    id: "test-2",
    title: "Algorithms & Logic Prep",
    description: "Write code to solve standard dynamic programming and string parsing tasks.",
    durationMinutes: 30,
    passingScore: 50,
    type: "CODING",
    questionsCount: 1,
    status: "NOT_STARTED",
  }
];

export default function AssessmentsPage() {
  const { currentTenant, activeRole } = useTenantStore();
  const { user } = useAuthStore();

  const [tests, setTests] = useState<Test[]>(initialTests);
  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(30);
  const [passingScore, setPassingScore] = useState(50);
  const [type, setType] = useState<'MCQ' | 'CODING'>('MCQ');

  const isTeacher = activeRole === "ADMIN" || activeRole === "FACULTY" || user?.role === "SUPER_ADMIN";

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newTest: Test = {
      id: "test-" + Date.now(),
      title,
      description,
      durationMinutes: duration,
      passingScore,
      type,
      questionsCount: type === "CODING" ? 1 : 5,
      status: "NOT_STARTED"
    };

    setTests([...tests, newTest]);
    setCreateModalOpen(false);

    // Reset Form
    setTitle("");
    setDescription("");
    setDuration(30);
    setPassingScore(50);
    setType("MCQ");
  };

  const filteredTests = tests.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Trophy className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Assessments Module
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access, take, and review timed skill tests created by department faculty.
          </p>
        </div>

        <div className="flex gap-3 shrink-0">
          <Link
            href={`/t/${currentTenant?.slug}/assessments/reports`}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <FileCheck className="h-4 w-4" /> Score Reports
          </Link>

          {isTeacher && (
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg shrink-0 border border-indigo-500/30"
              style={{ 
                backgroundColor: currentTenant?.secondaryColor,
                boxShadow: `0 4px 14px ${currentTenant?.secondaryColor}25`
              }}
            >
              <Plus className="h-4 w-4" /> Create Test Quiz
            </button>
          )}
        </div>
      </div>

      {/* Control bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search active assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900/40 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-slate-200 placeholder-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Tests Catalog Grid */}
      {filteredTests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="bg-slate-900/20 border border-slate-900 hover:border-slate-800 p-5 rounded-2xl flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-850 text-slate-400 text-[10px] font-semibold">
                    {test.type} Test
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{test.durationMinutes} mins</span>
                  </div>
                </div>

                <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-400 transition-colors">
                  {test.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {test.description}
                </p>

                <div className="mt-4 pt-4 border-t border-slate-900/40 text-[10px] text-slate-500 flex justify-between">
                  <span>Questions: <strong className="text-slate-400 font-semibold">{test.questionsCount}</strong></span>
                  <span>Passing score: <strong className="text-slate-400 font-semibold">{test.passingScore}%</strong></span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-900/40 flex items-center justify-between gap-4">
                {test.status === "COMPLETED" ? (
                  <>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/20 px-2.5 py-1 rounded-full border border-emerald-900/30">
                      <CheckCircle className="h-3.5 w-3.5" /> Evaluated
                    </span>
                    <span className="text-xs font-bold text-white">Score: {test.score}/30</span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      Not Started
                    </span>
                    <Link
                      href={`/t/${currentTenant?.slug}/assessments/${test.id}`}
                      className="h-8 px-4 rounded-lg hover:bg-slate-800 text-xs font-bold flex items-center gap-1 text-white border transition-colors"
                      style={{ 
                        backgroundColor: currentTenant?.secondaryColor,
                        borderColor: currentTenant?.secondaryColor 
                      }}
                    >
                      <Play className="h-3 w-3 fill-white" /> Start Test
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl text-center">
          <Trophy className="h-10 w-10 text-slate-700 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">No Tests Found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Faculty members have not uploaded quizzes matching your search filters.
          </p>
        </div>
      )}

      {/* Quiz Creation Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-md bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="h-14 px-6 border-b border-slate-850 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Create Assessment Quiz</h3>
              <button 
                onClick={() => setCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Assessment Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Database Management MCQs"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write clear instructions for candidates..."
                  rows={3}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Duration (Min)
                  </label>
                  <input
                    type="number"
                    required
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Passing %
                  </label>
                  <input
                    type="number"
                    required
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Test Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="MCQ">MCQs</option>
                    <option value="CODING">Programming</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-950 border border-slate-850 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                  style={{ backgroundColor: currentTenant?.secondaryColor }}
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
