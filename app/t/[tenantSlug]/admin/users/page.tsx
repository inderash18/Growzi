"use client";

import { useState } from "react";
import { 
  Users, 
  Search, 
  Plus, 
  Mail, 
  Trash2, 
  Check, 
  X, 
  UserCheck, 
  ShieldAlert,
  Loader2,
  Settings2
} from "lucide-react";
import { useTenantStore } from "@/store/useTenantStore";

type Member = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'FACULTY' | 'STUDENT';
  isActive: boolean;
};

const initialMembers: Member[] = [
  { id: "m-1", name: "Dr. Rajesh Kumar", email: "admin@apex.edu", role: "ADMIN", isActive: true },
  { id: "m-2", name: "Prof. Sarah Miller", email: "faculty@apex.edu", role: "FACULTY", isActive: true },
  { id: "m-3", name: "Alex Carter", email: "student@apex.edu", role: "STUDENT", isActive: true },
];

export default function AdminUsers() {
  const { currentTenant } = useTenantStore();

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Invite states
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<'ADMIN' | 'FACULTY' | 'STUDENT'>('STUDENT');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newMember: Member = {
        id: "m-" + Date.now(),
        name: inviteName,
        email: inviteEmail,
        role: inviteRole,
        isActive: true
      };

      setMembers([...members, newMember]);
      setInviteModalOpen(false);
      setInviteName("");
      setInviteEmail("");
      setInviteRole("STUDENT");
      setIsSubmitting(false);
    }, 1000);
  };

  const handleToggleStatus = (id: string) => {
    setMembers(members.map(m => {
      if (m.id === id) {
        return { ...m, isActive: !m.isActive };
      }
      return m;
    }));
  };

  const handleRemove = (id: string) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-slate-900 pb-5 shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Users className="h-6 w-6 text-indigo-500" style={{ color: currentTenant?.secondaryColor }} />
            Users & Members
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student directories, modify faculty permissions, and invite new members to the workspace.
          </p>
        </div>

        <button
          onClick={() => setInviteModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white transition-all shadow-lg shrink-0 border border-indigo-500/30"
          style={{ 
            backgroundColor: currentTenant?.secondaryColor,
            boxShadow: `0 4px 14px ${currentTenant?.secondaryColor}25`
          }}
        >
          <Plus className="h-4 w-4" /> Invite Member
        </button>
      </div>

      {/* Control bar */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          placeholder="Search members by name or email address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-slate-900/40 border border-slate-850 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs text-slate-200 placeholder-slate-600 transition-colors"
        />
      </div>

      {/* Users table */}
      <div className="bg-slate-900/20 border border-slate-900 rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950/40 border-b border-slate-900 text-slate-500 font-bold uppercase tracking-wider">
                <th className="p-4 pl-6">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Active Role</th>
                <th className="p-4">Active Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-900/10 transition-colors">
                  <td className="p-4 pl-6 font-semibold text-slate-200">{m.name}</td>
                  <td className="p-4 text-slate-400 font-mono">{m.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider ${
                      m.role === 'ADMIN' ? 'bg-indigo-950 border border-indigo-900 text-indigo-400' :
                      m.role === 'FACULTY' ? 'bg-blue-950 border border-blue-900 text-blue-400' :
                      'bg-slate-950 border border-slate-850 text-slate-400'
                    }`}>
                      {m.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleStatus(m.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[9px] font-semibold ${
                        m.isActive
                          ? "bg-emerald-950/20 border-emerald-900/30 text-emerald-400"
                          : "bg-red-950/20 border-red-900/30 text-red-400"
                      }`}
                    >
                      {m.isActive ? "Active" : "Deactivated"}
                    </button>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button
                      onClick={() => handleRemove(m.id)}
                      disabled={m.role === "ADMIN"}
                      className="h-8 w-8 rounded-lg bg-slate-950 border border-slate-850 hover:border-red-900/50 hover:bg-red-950/30 text-slate-500 hover:text-red-400 flex items-center justify-center ml-auto transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Member modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-850 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <div className="h-14 px-6 border-b border-slate-850 flex items-center justify-between">
              <h3 className="font-bold text-white text-sm">Send Member Invitation</h3>
              <button 
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleInvite} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Member Name
                </label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-350 placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="you@school.edu"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-350 placeholder-slate-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Workspace Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 focus:outline-none"
                >
                  <option value="STUDENT">Student Candidate</option>
                  <option value="FACULTY">Department Faculty</option>
                  <option value="ADMIN">Institution Admin</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-950 border border-slate-850 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  style={{ backgroundColor: currentTenant?.secondaryColor }}
                >
                  {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Mail className="h-3.5 w-3.5" />}
                  Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
