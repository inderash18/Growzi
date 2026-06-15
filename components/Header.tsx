"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = [
    { name: "Projects", href: "/projects" },
    { name: "Resources", href: "/resources" },
    { name: "Resume Builder", href: "/dashboard/resume" },
    { name: "Portfolio Builder", href: "/dashboard/portfolio" },
    { name: "Website Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="relative border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 select-none">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center shadow-sm">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-extrabold tracking-tight text-slate-900">
            Growzi
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-500">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "hover:text-slate-900 transition-colors py-1 relative",
                  isActive ? "text-slate-900 font-bold" : ""
                )}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <Button size="sm" variant="primary" className="font-semibold">
                <Sparkles className="h-3.5 w-3.5" /> My Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link 
                href="/login" 
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Login
              </Link>
              <Link href="/signup">
                <Button size="sm" variant="primary" className="font-semibold px-4">Get Started</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-1 text-slate-500 hover:text-slate-900 transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white p-6 space-y-4 animate-scale-in">
          <nav className="flex flex-col gap-3.5 text-xs font-bold text-slate-500">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "hover:text-slate-900 transition-colors py-1",
                    isActive ? "text-slate-900 font-bold" : ""
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button size="sm" variant="primary" className="w-full font-semibold">
                  <Sparkles className="h-3.5 w-3.5" /> My Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link 
                  href="/login" 
                  onClick={() => setMobileOpen(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors text-center py-2"
                >
                  Login
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" variant="primary" className="w-full font-semibold">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
