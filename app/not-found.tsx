"use client";

import Link from "next/link";
import { Terminal, MoveLeft, Home, FileWarning } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans antialiased">
      {/* Decorative background grids and glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f2e_1px,transparent_1px),linear-gradient(to_bottom,#1f1f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15]" />
      
      {/* Glow overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-rose-500/5 blur-[80px] pointer-events-none select-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10 animate-fade-in">
        {/* Glow icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg relative group">
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 opacity-20 blur group-hover:opacity-45 transition duration-1000" />
          <FileWarning className="h-7 w-7 text-rose-500 relative z-10" />
        </div>

        <div className="space-y-2 select-none">
          <span className="text-[10px] font-bold tracking-widest text-indigo-400 uppercase">
            Error Code 404
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="text-zinc-400 text-xs max-w-sm mx-auto leading-relaxed">
            The route you requested does not exist or has been relocated to another workspace package directory.
          </p>
        </div>

        {/* Code Terminal View */}
        <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 text-left font-mono text-[10px] text-zinc-400 space-y-2 shadow-inner select-text">
          <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-2 mb-2 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="text-[9px] text-zinc-650 ml-2">bash --session</span>
          </div>
          <p className="text-zinc-600">$ curl -I https://growzi.com/requested-route</p>
          <p className="text-rose-455 font-semibold">HTTP/1.1 404 Not Found</p>
          <p className="text-zinc-500">Content-Type: text/html; charset=utf-8</p>
          <p className="text-zinc-550">Error: Path is not defined in AppRouter manifest registry.</p>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center select-none pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.history.back()}
            className="font-semibold"
          >
            <MoveLeft className="h-4 w-4" /> Go Back
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
