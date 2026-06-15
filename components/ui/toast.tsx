"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none select-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "p-4 rounded-xl border flex items-start gap-3 shadow-2xl backdrop-blur-md animate-scale-in pointer-events-auto",
              t.type === "success" && "bg-zinc-950/90 border-emerald-900/50 text-zinc-100",
              t.type === "error" && "bg-zinc-950/90 border-rose-950/50 text-zinc-100",
              t.type === "info" && "bg-zinc-950/90 border-zinc-800 text-zinc-100"
            )}
          >
            {t.type === "success" && (
              <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            )}
            {t.type === "error" && (
              <AlertCircle className="h-4 w-4 text-rose-455 shrink-0 mt-0.5" />
            )}
            {t.type === "info" && (
              <AlertCircle className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
            )}

            <div className="flex-1 text-xs font-medium leading-relaxed">
              {t.message}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="text-zinc-500 hover:text-zinc-350 transition-colors cursor-pointer shrink-0 mt-0.5"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
