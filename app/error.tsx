"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log exception context securely for developer diagnostics
    console.error("Unhandle layout exception boundary:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans antialiased">
      {/* Decorative grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15]" />
      
      {/* Radial red glow indicating severe exception state */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-rose-500/5 blur-[100px] pointer-events-none select-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10 animate-fade-in">
        {/* Exception indicator */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg relative group select-none">
          <div className="absolute -inset-0.5 rounded-2xl bg-rose-600 opacity-20 blur group-hover:opacity-40 transition duration-1000" />
          <AlertTriangle className="h-7 w-7 text-rose-500 relative z-10" />
        </div>

        <div className="space-y-2 select-none">
          <span className="text-[10px] font-bold tracking-widest text-rose-500 uppercase">
            System Exception
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Something went wrong
          </h1>
          <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed">
            A fatal run-time exception was captured by the workspace root error boundary layout handler.
          </p>
        </div>

        {/* Diagnostics console log window */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-left font-mono text-[10px] text-zinc-400 space-y-2 shadow-inner select-text">
          <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2 mb-2 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="text-[9px] text-zinc-650 ml-2">sys-diagnose.log</span>
          </div>
          <p className="text-rose-455 font-bold">CRITICAL_EXCEPTION: {error?.name || "RenderError"}</p>
          <p className="text-zinc-400 leading-relaxed break-all font-normal">
            Message: {error?.message || "Unexpected runtime thread collision while compiling page component trees."}
          </p>
          {error?.digest && (
            <p className="text-zinc-600 font-normal">Digest Hash: {error.digest}</p>
          )}
        </div>

        {/* Re-activation recovery actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center select-none pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => reset()}
            className="font-semibold"
          >
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/">
            <Button
              variant="indigo"
              size="sm"
              className="font-semibold w-full sm:w-auto"
            >
              <Home className="h-4 w-4" /> Back Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
