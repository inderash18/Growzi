"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  Trophy, 
  FileText, 
  Globe, 
  Briefcase, 
  Settings2, 
  Users, 
  LineChart, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  ChevronRight, 
  UserCheck 
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";
import { useAuthStore } from "@/store/useAuthStore";

// Static mapping matching seed data for instant page-refresh resilience
const tenantPresets: Record<string, any> = {
  "apex-engineering": {
    id: "t1",
    name: "Apex Engineering College",
    slug: "apex-engineering",
    type: "COLLEGE",
    primaryColor: "#0f172a", // slate-900
    secondaryColor: "#3b82f6", // blue-500
    logoUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=128&h=128&fit=crop&q=80",
  },
  "devsunited": {
    id: "t2",
    name: "DevsUnited Community",
    slug: "devsunited",
    type: "STUDENT_COMMUNITY",
    primaryColor: "#09090b", // zinc-950
    secondaryColor: "#10b981", // emerald-500
    logoUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=128&h=128&fit=crop&q=80",
  }
};

export default function TenantLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const tenantSlug = params.tenantSlug as string;

  const { user, logout } = useAuthStore();
  const { currentTenant, activeRole, setCurrentTenant, setActiveRole } = useTenantStore();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    // 1. Handle auto login fallback for empty sessions to allow direct URL testing
    if (!user) {
      // Direct access bypass: default to alex carter for testing
      useAuthStore.getState().setUser({
        id: "usr-student",
        email: "student@apex.edu",
        name: "Alex Carter",
        role: "STUDENT",
      });
      useAuthStore.getState().setSession({ access_token: "mock-token" });
    }

    // 2. Resolve tenant details if store is empty or slug changed
    if (!currentTenant || currentTenant.slug !== tenantSlug) {
      const tenant = tenantPresets[tenantSlug] || {
        id: "t-fallback",
        name: tenantSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        slug: tenantSlug,
        type: "COLLEGE",
        primaryColor: "#0f172a",
        secondaryColor: "#6366f1",
      };

      setCurrentTenant(tenant);

      // Determine appropriate role based on mock user matching the domain
      if (user?.email === "admin@apex.edu") {
        setActiveRole("ADMIN");
      } else if (user?.email === "faculty@apex.edu") {
        setActiveRole("FACULTY");
      } else {
        setActiveRole("STUDENT");
      }
    }
  }, [tenantSlug, currentTenant, user, setCurrentTenant, setActiveRole]);

  if (!currentTenant) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-sans">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <GraduationCap className="h-10 w-10 text-indigo-500 animate-bounce" />
          <span className="text-sm font-semibold tracking-wider text-slate-400">Loading Workspace...</span>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navLinks = [
    { name: "Overview", href: `/t/${tenantSlug}`, icon: LayoutDashboard },
    { name: "Resource Hub", href: `/t/${tenantSlug}/resources`, icon: BookOpen },
    { name: "Project Hub", href: `/t/${tenantSlug}/projects`, icon: Code2 },
    { name: "Assessments", href: `/t/${tenantSlug}/assessments`, icon: Trophy },
    { name: "Placement Prep", href: `/t/${tenantSlug}/placement`, icon: Briefcase },
    { name: "Resume Builder", href: `/t/${tenantSlug}/resume`, icon: FileText },
    { name: "Portfolio", href: `/t/${tenantSlug}/portfolio`, icon: Globe },
  ];

  const adminLinks = [
    { name: "Analytics", href: `/t/${tenantSlug}/admin/analytics`, icon: LineChart },
    { name: "Users & Teams", href: `/t/${tenantSlug}/admin/users`, icon: Users },
    { name: "Branding", href: `/t/${tenantSlug}/admin/settings`, icon: Settings2 },
  ];

  const hasAdminAccess = activeRole === "ADMIN" || activeRole === "FACULTY" || user?.role === "SUPER_ADMIN";

  return (
    <div 
      className="min-h-screen bg-slate-950 text-slate-100 flex font-sans"
      style={{
        // Dynamically inject custom secondary branding color variable
        ["--tenant-accent" as any]: currentTenant.secondaryColor,
        ["--tenant-accent-light" as any]: `${currentTenant.secondaryColor}20`,
      }}
    >
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-900 bg-slate-900/20 backdrop-blur-md shrink-0">
        <div className="h-16 px-6 border-b border-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {currentTenant.logoUrl ? (
              <img 
                src={currentTenant.logoUrl} 
                alt={currentTenant.name} 
                className="h-8 w-8 rounded-lg object-cover border border-slate-800 shrink-0" 
              />
            ) : (
              <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {currentTenant.name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <span className="font-bold text-sm text-slate-100 truncate tracking-tight">{currentTenant.name}</span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-2">Workspace</p>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
                  isActive 
                    ? "bg-slate-900 text-white border-l-2" 
                    : "text-slate-400 hover:text-white hover:bg-slate-900/30"
                }`}
                style={{
                  borderLeftColor: isActive ? currentTenant.secondaryColor : "transparent"
                }}
              >
                <Icon className={`h-4.5 w-4.5 transition-colors ${
                  isActive ? "text-slate-100" : "text-slate-500 group-hover:text-slate-300"
                }`}
                style={{
                  color: isActive ? currentTenant.secondaryColor : undefined
                }} />
                {link.name}
              </Link>
            );
          })}

          {hasAdminAccess && (
            <div className="pt-8 space-y-1.5">
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3 mb-2">Management</p>
              {adminLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all group ${
                      isActive 
                        ? "bg-slate-900 text-white border-l-2" 
                        : "text-slate-400 hover:text-white hover:bg-slate-900/30"
                    }`}
                    style={{
                      borderLeftColor: isActive ? currentTenant.secondaryColor : "transparent"
                    }}
                  >
                    <Icon className={`h-4.5 w-4.5 transition-colors ${
                      isActive ? "text-slate-100" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                    style={{
                      color: isActive ? currentTenant.secondaryColor : undefined
                    }} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Sidebar Footer Profile */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/40">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/30 border border-slate-900/60">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 shrink-0 text-slate-300 text-xs font-bold">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "US"}
              </div>
              <div className="overflow-hidden">
                <span className="block text-xs font-bold text-slate-200 truncate">{user?.name || user?.email}</span>
                <span className="block text-[9px] font-semibold text-indigo-400 tracking-wider uppercase mt-0.5">{activeRole}</span>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <LogOut className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Navigation Bar */}
        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 z-40 relative">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-400">Workspace</span>
              <ChevronRight className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-bold text-slate-100 capitalize">
                {pathname.split("/").pop() === tenantSlug ? "Overview" : pathname.split("/").pop()?.replace("-", " ")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Workspace Switcher Shortcut */}
            <Link 
              href="/select-workspace"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/30 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-700 transition-all"
            >
              <UserCheck className="h-3.5 w-3.5" /> Switch Workspace
            </Link>

            {/* Notifications Panel */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative h-9 w-9 rounded-lg border border-slate-900 bg-slate-900/20 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 space-y-3 z-50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Notifications</h4>
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-850/60">
                      <span className="block text-xs font-bold text-slate-200">Prof. Sarah uploaded 'Computer Networks Study Guide'</span>
                      <span className="block text-[10px] text-slate-500 mt-1">Resource Hub • 2 hours ago</span>
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-850/60">
                      <span className="block text-xs font-bold text-slate-200">Core Web Technologies Quiz Graded</span>
                      <span className="block text-[10px] text-slate-500 mt-1">Score: 30/30 (Pass) • 1 day ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Child Content Section */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-950">
          {children}
        </main>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex md:hidden">
          <div className="w-64 bg-slate-900 flex flex-col h-full border-r border-slate-800 relative">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="h-16 px-6 border-b border-slate-800 flex items-center gap-2 overflow-hidden">
              {currentTenant.logoUrl ? (
                <img 
                  src={currentTenant.logoUrl} 
                  alt={currentTenant.name} 
                  className="h-8 w-8 rounded-lg object-cover shrink-0" 
                />
              ) : (
                <GraduationCap className="h-6 w-6 text-indigo-500 shrink-0" />
              )}
              <span className="font-bold text-sm text-slate-100 truncate">{currentTenant.name}</span>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isActive 
                        ? "bg-slate-800 text-white" 
                        : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    {link.name}
                  </Link>
                );
              })}

              {hasAdminAccess && (
                <div className="pt-6 space-y-1.5 border-t border-slate-800 mt-4">
                  <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase px-3">Management</p>
                  {adminLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                          isActive 
                            ? "bg-slate-800 text-white" 
                            : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                        }`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </nav>

            <div className="p-4 border-t border-slate-800">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 hover:bg-slate-700/60 rounded-xl text-xs font-semibold text-slate-300"
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
