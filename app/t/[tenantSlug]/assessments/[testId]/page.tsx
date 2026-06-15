"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  CheckCircle,
  FileCheck,
  AlertTriangle
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

type Question = {
  id: string;
  type: 'MCQ' | 'CODING';
  text: string;
  options?: string[];
  correctAnswer: string;
  points: number;
};

const mockQuestions: Record<string, Question[]> = {
  "test-1": [
    {
      id: "q1",
      type: "MCQ",
      text: "Which of the following is true about JavaScript's event loop?",
      options: [
        "It executes blocking synchronous tasks in the background.",
        "It continuously checks the call stack and event callback queues.",
        "It operates on multi-threaded parallel processes.",
        "It bypasses standard CPU thread allocations entirely."
      ],
      correctAnswer: "1", // Index 1
      points: 10
    },
    {
      id: "q2",
      type: "MCQ",
      text: "What does CSS Grid's 'fr' unit represent?",
      options: [
        "A fixed ratio multiplier.",
        "A fraction of the free space in the grid container.",
        "A frame boundary constraint.",
        "A font-responsive height reference."
      ],
      correctAnswer: "1",
      points: 10
    },
    {
      id: "q3",
      type: "MCQ",
      text: "Which array method returns a new array with all elements that pass a test?",
      options: [
        "map()",
        "forEach()",
        "filter()",
        "reduce()"
      ],
      correctAnswer: "2",
      points: 10
    }
  ],
  "test-2": [
    {
      id: "q4",
      type: "CODING",
      text: "Write a function `isPalindrome(str)` that accepts a string and returns `true` if the string reads the same backward as forward (ignoring casing and non-alphanumeric characters), and `false` otherwise.\n\nExample:\n`isPalindrome(\"A man, a plan, a canal: Panama\")` -> `true`\n`isPalindrome(\"race a car\")` -> `false`",
      correctAnswer: "function isPalindrome(str) {\n  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return clean === clean.split('').reverse().join('');\n}",
      points: 20
    }
  ]
};

export default function AssessmentRunner() {
  const router = useRouter();
  const params = useParams();
  const { currentTenant } = useTenantStore();
  const testId = params.testId as string;

  const testTitle = testId === "test-1" ? "Core Web Technologies Quiz" : "Algorithms & Logic Prep";
  const initialDuration = testId === "test-1" ? 15 * 60 : 30 * 60; // seconds

  const questions = mockQuestions[testId] || mockQuestions["test-1"];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOptionSelect = (qId: string, optionIdx: string) => {
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const handleCodeChange = (qId: string, code: string) => {
    setAnswers({ ...answers, [qId]: code });
  };

  const handleAutoSubmit = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate testing environment loading (compiling or saving answers)
    await new Promise(resolve => setTimeout(resolve, 2000));

    let score = 0;
    questions.forEach(q => {
      if (q.type === 'MCQ') {
        if (answers[q.id] === q.correctAnswer) {
          score += q.points;
        }
      } else {
        // Coding challenge scoring: check if string contains core function declarations or tests
        const studentCode = answers[q.id] || "";
        if (studentCode.includes("function") && studentCode.includes("toLowerCase") && studentCode.includes("reverse")) {
          score += q.points; // Passed test cases
        } else {
          score += q.points / 2; // Partial credit
        }
      }
    });

    setFinalScore(score);
    setIsSubmitting(false);
    setIsDone(true);
  };

  if (!currentTenant) return null;

  if (isDone) {
    const totalPoints = questions.reduce((a, b) => a + b.points, 0);
    const passed = finalScore >= (totalPoints * 0.6);

    return (
      <div className="max-w-xl mx-auto py-12 text-center space-y-6 animate-scale-in">
        <CheckCircle className={`h-16 w-16 mx-auto ${passed ? 'text-emerald-400' : 'text-yellow-500'}`} />
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Assessment Submitted Successfully</h2>
          <p className="text-slate-400 text-xs">
            Evaluation complete. Your scores have been registered in the student portfolio portal.
          </p>
        </div>

        <div className="p-6 bg-slate-900/30 border border-slate-900 rounded-2xl max-w-sm mx-auto space-y-3">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Assessment Title</span>
            <span className="text-slate-200 font-semibold">{testTitle}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 border-t border-slate-900 pt-3">
            <span>Points Scored</span>
            <span className="text-white font-bold">{finalScore} / {totalPoints}</span>
          </div>
          <div className="flex justify-between text-xs text-slate-400 border-t border-slate-900 pt-3">
            <span>Passing Status</span>
            <span className={`font-extrabold uppercase tracking-wide text-[10px] ${passed ? 'text-emerald-400' : 'text-red-400'}`}>
              {passed ? 'Passed (Certified)' : 'Unsuccessful'}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push(`/t/${currentTenant.slug}/assessments`)}
          className="inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-semibold text-white transition-colors"
        >
          Return to Assessments
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Test Dashboard Header */}
      <div className="flex justify-between items-center bg-slate-900/30 border border-slate-900 p-4 rounded-xl shrink-0">
        <div>
          <h2 className="font-bold text-sm text-white">{testTitle}</h2>
          <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
            Question {currentIdx + 1} of {questions.length}
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-sm font-bold text-white bg-slate-950 border border-slate-850 px-3.5 py-1.5 rounded-lg">
          <Clock className="h-4 w-4 text-indigo-400" />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Main Question Panel */}
      <div className="bg-slate-900/20 border border-slate-900 p-6 rounded-2xl min-h-[300px] flex flex-col justify-between space-y-8">
        
        <div className="space-y-4">
          <div className="flex items-start gap-2.5">
            <HelpCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <h3 className="font-semibold text-slate-100 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {currentQuestion.text}
            </h3>
          </div>

          {/* Option elements matching MCQ type */}
          {currentQuestion.type === 'MCQ' && currentQuestion.options && (
            <div className="space-y-3.5 pt-4 pl-7">
              {currentQuestion.options.map((opt, idx) => {
                const optStr = idx.toString();
                const isSelected = answers[currentQuestion.id] === optStr;
                return (
                  <div
                    key={idx}
                    onClick={() => handleOptionSelect(currentQuestion.id, optStr)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs ${
                      isSelected
                        ? "bg-slate-900/60 border-indigo-500/30 text-white font-semibold"
                        : "bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800 hover:text-slate-300"
                    }`}
                  >
                    <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isSelected 
                        ? "bg-indigo-600 border-indigo-500 text-white" 
                        : "border-slate-700 text-slate-500"
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span>{opt}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Code Editor block matching CODING type */}
          {currentQuestion.type === 'CODING' && (
            <div className="space-y-3 pt-4 pl-7">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                JavaScript Source Code Editor
              </label>
              <textarea
                value={answers[currentQuestion.id] || "function isPalindrome(str) {\n  // Write solution here...\n}"}
                onChange={(e) => handleCodeChange(currentQuestion.id, e.target.value)}
                rows={10}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none leading-relaxed"
              />
            </div>
          )}
        </div>

        {/* Action controllers */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-900/60 shrink-0">
          <button
            onClick={() => setCurrentIdx(prev => prev - 1)}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          {currentIdx === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg text-white transition-colors border border-indigo-500/30 disabled:opacity-50"
              style={{ backgroundColor: currentTenant.secondaryColor }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Submit Assessment <FileCheck className="h-4 w-4" />
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx(prev => prev + 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
