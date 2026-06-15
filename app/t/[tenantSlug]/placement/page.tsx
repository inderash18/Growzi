"use client";

import { useState } from "react";
import { 
  Briefcase, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Bookmark, 
  BookOpen, 
  Clock, 
  Star,
  Users
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

type Question = {
  id: string;
  category: 'APTITUDE' | 'TECHNICAL' | 'HR' | 'COMPANY_PREP';
  question: string;
  answer: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  company?: string;
  isMarked?: boolean;
};

const initialQuestions: Question[] = [
  {
    id: "pq-1",
    category: "APTITUDE",
    question: "A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?",
    answer: "Length of the train is calculated using: Speed * Time.\nFirst, convert speed into meters per second:\n60 * (5/18) = 16.67 m/s.\nThen multiply by crossing time:\n16.67 * 9 = 150 meters.\n\nTherefore, the length of the train is 150 meters.",
    difficulty: "EASY"
  },
  {
    id: "pq-2",
    category: "TECHNICAL",
    question: "What is the difference between SQL's WHERE and HAVING clauses?",
    answer: "1. WHERE is used to filter rows BEFORE grouping is applied (evalutes individual rows). It cannot filter aggregate functions (like SUM, AVG).\n2. HAVING is used to filter grouped records AFTER GROUP BY is applied (evaluates aggregated values). It can include filters on aggregate functions.",
    difficulty: "MEDIUM"
  },
  {
    id: "pq-3",
    category: "HR",
    question: "Why should we hire you as a fresher software engineer?",
    answer: "Align your answer around three pillars:\n1. Your strong foundational fundamentals (such as clean coding principles or database tuning knowledge) verified by coursework and certifications.\n2. Your quick learning curve and adaptability demonstrated by building full-stack projects during semesters.\n3. Your team collaborations inside community groups and placement cells.",
    difficulty: "EASY"
  },
  {
    id: "pq-4",
    category: "COMPANY_PREP",
    question: "Stripe Developer Interview: What does idempotency in REST APIs solve?",
    answer: "Idempotency ensures that making multiple identical API requests yields the exact same state outcome on the server (e.g. avoiding charging a customer twice if a network failure happens during payment request processing). In Stripe, this is accomplished by passing an 'Idempotency-Key' header that records the transaction ID in a cache server.",
    difficulty: "HARD",
    company: "Stripe"
  }
];

export default function PlacementPrep() {
  const { currentTenant } = useTenantStore();

  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [activeTab, setActiveTab] = useState<'APTITUDE' | 'TECHNICAL' | 'HR' | 'COMPANY_PREP'>('APTITUDE');
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleToggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleToggleMark = (id: string) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return { ...q, isMarked: !q.isMarked };
      }
      return q;
    }));
  };

  const filteredQuestions = questions.filter(q => {
    const matchesTab = q.category === activeTab;
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (q.company && q.company.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const getDifficultyColor = (diff: Question['difficulty']) => {
    switch(diff) {
      case 'EASY': return "text-emerald-400 bg-emerald-950/20 border-emerald-900/30";
      case 'MEDIUM': return "text-yellow-400 bg-yellow-950/20 border-yellow-900/30";
      case 'HARD': return "text-red-400 bg-red-950/20 border-red-900/30";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Briefcase className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Placement Preparation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Review interview Q&As, practice logical aptitude, and check company-specific selection guides.
          </p>
        </div>
      </div>

      {/* Categories select tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-slate-950 border border-slate-900 p-1.5 rounded-xl gap-1 shrink-0">
        {(['APTITUDE', 'TECHNICAL', 'HR', 'COMPANY_PREP'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setExpandedId(null);
            }}
            className={`py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all ${
              activeTab === tab
                ? "bg-slate-900 text-white shadow-sm border border-slate-800"
                : "text-slate-500 hover:text-slate-350"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Control bar */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder={`Search ${activeTab.toLowerCase().replace("_", " ")} Q&As...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-900/40 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-slate-200 placeholder-slate-600 transition-colors"
        />
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;
            return (
              <div 
                key={q.id}
                className="bg-slate-900/20 border border-slate-900 hover:border-slate-800/80 rounded-2xl overflow-hidden transition-all"
              >
                <div 
                  onClick={() => handleToggleExpand(q.id)}
                  className="p-5 flex items-start justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                      <HelpCircle className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-xs md:text-sm leading-relaxed pr-6">
                        {q.question}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2.5 mt-2.5">
                        <span className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase tracking-wider ${getDifficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                        {q.company && (
                          <span className="px-2 py-0.5 rounded bg-indigo-950/20 border border-indigo-900/30 text-indigo-400 text-[8px] font-bold">
                            Company: {q.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleMark(q.id);
                      }}
                      className={`h-8 w-8 rounded-lg border flex items-center justify-center transition-colors ${
                        q.isMarked
                          ? "bg-slate-900 border-slate-700 text-yellow-400"
                          : "bg-slate-950 hover:bg-slate-900 border-slate-850 text-slate-500 hover:text-slate-350"
                      }`}
                    >
                      <Bookmark className={`h-4 w-4 ${q.isMarked ? 'fill-yellow-400' : ''}`} />
                    </button>
                    {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-500" /> : <ChevronDown className="h-5 w-5 text-slate-500" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-900/60 bg-slate-950/30">
                    <div className="pl-12 pr-6">
                      <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 mb-2">Detailed Answer Guide</h4>
                      <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-wrap font-sans">
                        {q.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-16 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl text-center">
            <BookOpen className="h-10 w-10 text-slate-700 mx-auto mb-4" />
            <h3 className="font-semibold text-white mb-1">No Q&As Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No preparation guides match your active search terms.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
