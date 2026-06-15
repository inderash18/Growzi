"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FileCheck, 
  ChevronLeft, 
  MessageSquare, 
  Trash2, 
  Check, 
  AlertCircle, 
  User, 
  Clock, 
  Activity,
  Sliders
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";
import { formatDate } from "@/lib/utils";

type Submission = {
  id: string;
  studentName: string;
  studentEmail: string;
  testTitle: string;
  testType: 'MCQ' | 'CODING';
  score: number;
  maxScore: number;
  submittedAt: string;
  status: 'PENDING' | 'EVALUATED';
  feedback?: string;
  answers: Record<string, string>;
};

const initialSubmissions: Submission[] = [
  {
    id: "sub-1",
    studentName: "Alex Carter",
    studentEmail: "student@apex.edu",
    testTitle: "Core Web Technologies Quiz",
    testType: "MCQ",
    score: 30,
    maxScore: 30,
    submittedAt: "2026-06-14T15:00:00Z",
    status: "EVALUATED",
    feedback: "Perfect scores! Displayed deep understanding of event loops and grids.",
    answers: { "q1": "1", "q2": "1", "q3": "2" }
  },
  {
    id: "sub-2",
    studentName: "Sophia Wang",
    studentEmail: "student@devsunited.org",
    testTitle: "Algorithms & Logic Prep",
    testType: "CODING",
    score: 10,
    maxScore: 20,
    submittedAt: "2026-06-15T09:30:00Z",
    status: "PENDING",
    answers: {
      "q4": "function isPalindrome(str) {\n  // Partial effort\n  return str === str.split('').reverse().join('');\n}"
    }
  }
];

export default function AssessmentReports() {
  const { currentTenant } = useTenantStore();

  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [activeSubmission, setActiveSubmission] = useState<Submission | null>(null);
  const [feedbackInput, setFeedbackInput] = useState("");
  const [scoreInput, setScoreInput] = useState(10);

  const handleGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSubmission) return;

    const updated = submissions.map(s => {
      if (s.id === activeSubmission.id) {
        return {
          ...s,
          score: scoreInput,
          feedback: feedbackInput,
          status: "EVALUATED" as const
        };
      }
      return s;
    });

    setSubmissions(updated);
    setActiveSubmission(null);
    setFeedbackInput("");
  };

  if (!currentTenant) return null;

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      {/* Page Header */}
      <div className="flex items-center gap-3 border-b border-slate-900 pb-5 shrink-0">
        <Link
          href={`/t/${currentTenant.slug}/assessments`}
          className="h-9 w-9 rounded-lg border border-slate-900 bg-slate-900/20 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Assessment Score Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review test run details, view student source codes, and write review evaluations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: SUBMISSIONS LIST */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="p-4 bg-slate-950/40 border-b border-slate-900">
              <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Candidate Submissions</h3>
            </div>

            <div className="divide-y divide-slate-900">
              {submissions.map((sub) => {
                const passed = sub.score >= (sub.maxScore * 0.6);
                return (
                  <div
                    key={sub.id}
                    onClick={() => {
                      setActiveSubmission(sub);
                      setFeedbackInput(sub.feedback || "");
                      setScoreInput(sub.score);
                    }}
                    className={`p-5 flex items-center justify-between gap-6 cursor-pointer transition-all hover:bg-slate-900/30 ${
                      activeSubmission?.id === sub.id ? "bg-slate-900/40" : ""
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm font-bold text-white leading-tight">{sub.studentName}</strong>
                        <span className="text-[10px] text-slate-500 font-medium">({sub.studentEmail})</span>
                      </div>
                      <span className="block text-xs text-slate-400">{sub.testTitle} &bull; {sub.testType}</span>
                      <span className="block text-[10px] text-slate-500">Submitted: {formatDate(sub.submittedAt)}</span>
                    </div>

                    <div className="text-right flex items-center gap-4">
                      <div>
                        {sub.status === "PENDING" ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-yellow-950 border border-yellow-900 text-yellow-400 text-[9px] uppercase font-bold tracking-wider mb-1">
                            Pending Review
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-900 text-emerald-400 text-[9px] uppercase font-bold tracking-wider mb-1">
                            Evaluated
                          </span>
                        )}
                        <span className="block text-xs text-slate-400 mt-1">
                          Score: <strong className="text-white font-bold">{sub.score} / {sub.maxScore}</strong>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EVALUATION WORKSPACE */}
        <div>
          {activeSubmission ? (
            <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl space-y-5 shadow-2xl">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-slate-500">Evaluation details</span>
                <h3 className="text-base font-bold text-white mt-1">{activeSubmission.studentName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{activeSubmission.testTitle}</p>
              </div>

              <div className="space-y-3 p-4 bg-slate-950 border border-slate-900 rounded-xl">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Student Answers</h4>
                {Object.entries(activeSubmission.answers).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <span className="text-[9px] font-semibold text-slate-500">Question ID: {key}</span>
                    <pre className="p-3 bg-slate-900 border border-slate-850 rounded-lg text-[10px] font-mono text-indigo-300 overflow-x-auto whitespace-pre-wrap leading-normal">
                      {val}
                    </pre>
                  </div>
                ))}
              </div>

              {/* Grading Form */}
              <form onSubmit={handleGrade} className="space-y-4">
                {activeSubmission.testType === "CODING" && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Assigned Score Points (Max {activeSubmission.maxScore})
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      max={activeSubmission.maxScore}
                      value={scoreInput}
                      onChange={(e) => setScoreInput(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Feedback / Evaluation Comments
                  </label>
                  <textarea
                    required
                    value={feedbackInput}
                    onChange={(e) => setFeedbackInput(e.target.value)}
                    placeholder="Write constructive notes for the student..."
                    rows={4}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-505 text-xs font-bold text-white transition-colors border border-indigo-500/30 flex items-center justify-center gap-1.5"
                    style={{ backgroundColor: currentTenant.secondaryColor }}
                  >
                    <Check className="h-4 w-4" /> Save Score Review
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900/10 border border-dashed border-slate-900 p-8 rounded-2xl text-center">
              <Sliders className="h-8 w-8 text-slate-700 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-400 text-xs mb-1">Select Submission</h3>
              <p className="text-[10px] text-slate-500 max-w-xs mx-auto">
                Click on any student submission card in the left list panel to begin reviewing details and writing evaluations.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
