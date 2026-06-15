"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, LogOut, ArrowRight, ShieldCheck, HelpCircle, Plus } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTenantStore } from "@/store/useTenantStore";

export default function SelectWorkspacePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { memberships, setCurrentTenant, setActiveRole } = useTenantStore();

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const handleSelectWorkspace = (membership: typeof memberships[0]) => {
    setCurrentTenant(membership.tenant);
    setActiveRole(membership.role);
    router.push(`/t/${membership.tenant.slug}`);
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center py-12 px-6 relative font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Growzi</span>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Welcome back, {user.name || user.email}
          </h1>
          <p className="text-slate-400 text-sm">
            Select an institutional workspace to access your resources and progress
          </p>
        </div>

        <div className="space-y-4">
          {/* Super Admin Option */}
          {user.role === "SUPER_ADMIN" && (
            <Link
              href="/admin/tenants"
              className="flex items-center justify-between p-6 bg-indigo-950/20 border border-indigo-500/30 hover:border-indigo-400/50 hover:bg-indigo-950/40 rounded-2xl transition-all shadow-lg shadow-indigo-950/10 group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Global System Console
                  </h3>
                  <p className="text-xs text-indigo-300/80 mt-0.5">
                    Platform Administration, Subscriptions, Tenant Management
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}

          {/* User Tenant Workspaces */}
          {memberships.length > 0 ? (
            memberships.map((membership) => (
              <div
                key={membership.id}
                onClick={() => handleSelectWorkspace(membership)}
                className="flex items-center justify-between p-6 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/30 hover:bg-slate-900/70 rounded-2xl transition-all shadow-lg group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {membership.tenant.logoUrl ? (
                    <img
                      src={membership.tenant.logoUrl}
                      alt={membership.tenant.name}
                      className="h-12 w-12 rounded-xl object-cover border border-slate-850"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 font-bold">
                      {membership.tenant.name.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {membership.tenant.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                        {membership.tenant.type.replace("_", " ")}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-slate-700" />
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-850 px-2 py-0.5 rounded-full border border-slate-800">
                        Role: {membership.role}
                      </span>
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))
          ) : (
            user.role !== "SUPER_ADMIN" && (
              <div className="p-10 bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl text-center">
                <HelpCircle className="h-10 w-10 text-slate-600 mx-auto mb-4" />
                <h3 className="font-semibold text-white mb-1">No Active Workspace</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                  You aren&apos;t currently a member of any organization workspace. Ask your administrator for an invite.
                </p>
              </div>
            )
          )}

          {/* Option to create a new workspace */}
          <Link
            href="/signup"
            className="flex items-center justify-between p-4 bg-slate-900/20 border border-dashed border-slate-800 hover:border-slate-700 hover:bg-slate-900/40 rounded-xl transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-slate-300">
                <Plus className="h-4 w-4" />
              </div>
              <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                Create or join a new workspace
              </span>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
