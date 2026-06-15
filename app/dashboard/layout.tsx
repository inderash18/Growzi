"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  GraduationCap, 
  LayoutDashboard, 
  FileText, 
  Globe, 
  Terminal, 
  Users, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Search,
  Bell,
  Settings,
  Bookmark,
  Download
} from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

export default function StudentDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const { user, logout } = useAuthStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Keyboard shortcut listener to toggle sidebar (Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    // Session lock: fallback login for developer testing
    if (!user) {
      useAuthStore.getState().setUser({
        id: "usr-student",
        email: "student@growzi.com",
        name: "Alex Carter",
        role: "STUDENT",
      });
      useAuthStore.getState().setSession({ access_token: "mock-token" });
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navGroups = [
    {
      group: "Core Hub",
      links: [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Service Requests", href: "/dashboard/requests", icon: Terminal },
      ]
    },
    {
      group: "Creator Tools",
      links: [
        { name: "Resume Builder", href: "/dashboard/resume", icon: FileText },
        { name: "Portfolio Builder", href: "/dashboard/portfolio", icon: Globe },
      ]
    },
    {
      group: "Library Desk",
      links: [
        { name: "Saved Blueprints", href: "/dashboard/saved-projects", icon: Bookmark },
        { name: "Downloads Library", href: "/dashboard/downloads", icon: Download },
      ]
    },
    {
      group: "Workspace Desk",
      links: [
        { name: "Support Tickets", href: "/dashboard/tickets", icon: Users },
        { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased overflow-hidden">
      
      {/* Sidebar - Desktop */}
      <aside 
        className={cn(
          "hidden md:flex flex-col border-r border-slate-200 bg-white shrink-0 transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-60"
        )}
      >
        {/* Header */}
        <div className="h-14 px-4 border-b border-slate-200 flex items-center justify-between overflow-hidden">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-extrabold text-xs tracking-tight text-slate-900 transition-opacity duration-300">
                Growzi Portal
              </span>
            )}
          </Link>
          {!sidebarCollapsed && (
            <button 
              onClick={() => setSidebarCollapsed(true)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Collapse Sidebar (Ctrl+B)"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
 
        {/* Collapsed Toggle Button when icons-only */}
        {sidebarCollapsed && (
          <div className="p-2 border-b border-slate-200 flex justify-center">
            <button 
              onClick={() => setSidebarCollapsed(false)}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
              title="Expand Sidebar (Ctrl+B)"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
 
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto overflow-x-hidden">
          {navGroups.map((grp) => (
            <div key={grp.group} className="space-y-1">
              {!sidebarCollapsed && (
                <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase px-2 mb-1.5 select-none">
                  {grp.group}
                </p>
              )}
              {grp.links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    title={sidebarCollapsed ? link.name : undefined}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold transition-all group relative cursor-pointer",
                      isActive 
                        ? "bg-blue-50/70 text-blue-600 font-bold" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                  >
                    <Icon className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                    )} />
                    {!sidebarCollapsed && <span>{link.name}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
 
        {/* User Card */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <div className={cn(
            "flex items-center justify-between p-1.5 rounded-xl bg-slate-50 border border-slate-100",
            sidebarCollapsed ? "justify-center" : ""
          )}>
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center border border-slate-300 shrink-0 text-slate-700 text-[10px] font-bold uppercase select-none">
                {user?.name ? user.name.substring(0,2) : "US"}
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden">
                  <span className="block text-[10px] font-bold text-slate-800 truncate leading-none">{user?.name || user?.email}</span>
                  <span className="block text-[8px] font-bold text-blue-600 uppercase tracking-wider mt-0.5 select-none">{user?.role}</span>
                </div>
              )}
            </div>
            {!sidebarCollapsed && (
              <button 
                onClick={handleLogout}
                className="text-slate-450 hover:text-slate-800 p-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>
 
      {/* Main Panel */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50">
        {/* Header bar */}
        <header className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-6 z-40 shrink-0 select-none">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            {/* Search Box Shortcut */}
            <div className="hidden sm:flex items-center gap-2 max-w-xs w-full relative">
              <Search className="h-3.5 w-3.5 text-slate-400 absolute left-2.5" />
              <input
                type="text"
                placeholder="Search resources & projects..."
                disabled
                className="w-full pl-8 pr-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-400 cursor-not-allowed placeholder-slate-450 focus:outline-none"
              />
              <span className="absolute right-2 text-[8px] px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-400 font-mono">
                ⌘K
              </span>
            </div>
 
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
              <span>Workspace</span>
              <ChevronRight className="h-3 w-3 text-slate-300" />
              <span className="text-slate-700 font-bold capitalize">
                {pathname.split("/").pop() === "dashboard" ? "Overview" : pathname.split("/").pop()?.replace("-", " ")}
              </span>
            </div>
          </div>
 
          <div className="flex items-center gap-3 shrink-0">
            {/* Notification bell */}
            <button className="p-1.5 rounded-xl border border-slate-200 bg-white text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer">
              <Bell className="h-3.5 w-3.5" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
            </button>
 
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-sm shadow-blue-500/10 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" /> Get Projects
            </Link>
          </div>
        </header>
 
        {/* Dynamic subpage container */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-50">
          <div className="max-w-6xl mx-auto h-full animate-fade-in">
            {children}
          </div>
        </main>
      </div>
 
      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex md:hidden">
          <div className="w-60 bg-white flex flex-col h-full border-r border-slate-200 relative">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-800 p-1 rounded-md cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
 
            <div className="h-14 px-6 border-b border-slate-200 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-xs text-slate-900">Growzi Workspace</span>
            </div>
 
            <nav className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
              {navGroups.map((grp) => (
                <div key={grp.group} className="space-y-1">
                  <p className="text-[9px] font-bold tracking-wider text-slate-400 uppercase px-2 mb-1.5 select-none">{grp.group}</p>
                  {grp.links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-2.5 py-2.5 rounded-lg text-xs font-bold transition-all",
                          isActive 
                            ? "bg-blue-50 text-blue-600" 
                            : "text-slate-500 hover:text-slate-950 hover:bg-slate-50"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
 
            <div className="p-4 border-t border-slate-200">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
