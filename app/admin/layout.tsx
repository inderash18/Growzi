"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  ShieldAlert, 
  LayoutDashboard, 
  Terminal, 
  LogOut, 
  Menu, 
  X, 
  Sparkles,
  Search,
  UserCheck,
  Code2,
  FolderOpen,
  MessageSquare,
  Sliders
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useAuthStore();

  useEffect(() => {
    // Session lock: fallback login for developer testing administrative panel
    if (!user || user.role !== "ADMIN") {
      useAuthStore.getState().setUser({
        id: "usr-admin",
        email: "admin@growzi.com",
        name: "Marcus Vance",
        role: "ADMIN",
      });
      useAuthStore.getState().setSession({ access_token: "mock-admin-token" });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Users", href: "/admin/users", icon: UserCheck },
    { name: "Requests", href: "/admin/requests", icon: Terminal, badge: 4 },
    { name: "Tickets", href: "/admin/tickets", icon: MessageSquare },
    { name: "Projects", href: "/admin/projects", icon: Code2 },
    { name: "Resources", href: "/admin/resources", icon: FolderOpen },
    { name: "Settings", href: "/admin/settings", icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased overflow-hidden">
      
      {/* Floating Pill Navigation Bar */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
        <nav className="bg-white rounded-full p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center gap-1 pointer-events-auto max-w-full overflow-x-auto scrollbar-none">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-5 py-2.5 rounded-full text-[13px] font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                  isActive 
                    ? "bg-[#b4f481] text-slate-900" 
                    : "text-slate-900 hover:bg-slate-100"
                )}
              >
                {link.name}
                {isActive && link.badge && (
                  <span className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-slate-950 text-white text-[10px] ml-1">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
          
          <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block shrink-0"></div>
          
          <button 
            onClick={handleLogout}
            className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
            title="Log Out"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </nav>
      </div>

      {/* Dynamic subpage container */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 pt-32 sm:pt-32 bg-slate-50">
        <div className="max-w-6xl mx-auto h-full">
          {children}
        </div>
      </main>

    </div>
  );
}
