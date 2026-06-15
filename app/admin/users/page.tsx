"use client";

import { useState } from "react";
import { Users, Search, UserCheck, Shield, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

type UserItem = {
  id: string;
  name: string;
  email: string;
  college: string;
  department: string;
  role: 'STUDENT' | 'ADMIN';
  activeTickets: number;
  activeRequests: number;
};

const initialUsers: UserItem[] = [
  {
    id: "u1",
    name: "Alex Carter",
    email: "student@apex.edu",
    college: "Apex Engineering College",
    department: "Computer Science",
    role: "STUDENT",
    activeTickets: 1,
    activeRequests: 2
  },
  {
    id: "u2",
    name: "Liam Henderson",
    email: "liam@state.edu",
    college: "State Tech University",
    department: "Information Technology",
    role: "STUDENT",
    activeTickets: 1,
    activeRequests: 0
  },
  {
    id: "u3",
    name: "Marcus Vance",
    email: "admin@apex.edu",
    college: "Apex Engineering College",
    department: "Computer Science",
    role: "ADMIN",
    activeTickets: 0,
    activeRequests: 0
  }
];

export default function AdminUsersPage() {
  const { toast } = useToast();
  const [usersList, setUsersList] = useState<UserItem[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'STUDENT' | 'ADMIN'>('ALL');

  const handleRoleToggle = (id: string, currentRole: 'STUDENT' | 'ADMIN') => {
    const nextRole = currentRole === "STUDENT" ? "ADMIN" : "STUDENT";
    setUsersList(prev => prev.map(u => {
      if (u.id === id) return { ...u, role: nextRole };
      return u;
    }));
    toast(`User authorization updated to ${nextRole}`, "success");
  };

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-fade-in relative z-10 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-zinc-900 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
            <Users className="h-6 w-6 text-rose-500" />
            Users Authorization Console
          </h1>
          <p className="text-xs text-zinc-500 mt-1 font-normal">
            Manage user roles, edit workspace accounts access level, and verify active query logs.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-zinc-900/10 border border-zinc-900 p-4 rounded-2xl select-none">
        <div className="relative md:col-span-3">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-650 pointer-events-none">
            <Search className="h-3.5 w-3.5" />
          </span>
          <Input
            type="text"
            placeholder="Search users by name, email or college campus..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        <div>
          <Select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
          >
            <option value="ALL">All Roles</option>
            <option value="STUDENT">Student Only</option>
            <option value="ADMIN">Administrator Only</option>
          </Select>
        </div>
      </div>

      {/* Grid Table */}
      {filteredUsers.length > 0 ? (
        <Card className="overflow-hidden border-zinc-900">
          <div className="overflow-x-auto select-text">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-zinc-900/20 border-b border-zinc-900 text-zinc-500 font-bold uppercase tracking-wider select-none">
                  <th className="p-4 pl-6 font-semibold">User Details</th>
                  <th className="p-4 font-semibold">Campus & Department</th>
                  <th className="p-4 font-semibold">Auth Role</th>
                  <th className="p-4 font-semibold">Doubt Doubts</th>
                  <th className="p-4 font-semibold">Service Orders</th>
                  <th className="p-4 pr-6 font-semibold text-right">Access Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900/40 text-zinc-350">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-zinc-900/10 transition-colors">
                    <td className="p-4 pl-6">
                      <div>
                        <span className="block font-bold text-white leading-none">{u.name}</span>
                        <span className="block text-[10px] text-zinc-500 mt-1">{u.email}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <span className="block text-zinc-200">{u.college}</span>
                        <span className="block text-[10px] text-zinc-550 mt-0.5">{u.department}</span>
                      </div>
                    </td>
                    <td className="p-4 select-none">
                      <span className={`px-2 py-0.5 rounded border text-[8px] font-bold uppercase ${
                        u.role === 'ADMIN' ? 'bg-rose-950/20 border-rose-900/30 text-rose-455' : 'bg-zinc-950 border-zinc-850 text-zinc-500'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-zinc-300">{u.activeTickets} open</td>
                    <td className="p-4 font-semibold text-zinc-300">{u.activeRequests} orders</td>
                    <td className="p-4 pr-6 text-right select-none">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRoleToggle(u.id, u.role)}
                        className="font-semibold ml-auto"
                      >
                        <Shield className="h-3.5 w-3.5" /> 
                        {u.role === 'STUDENT' ? 'Promote Admin' : 'Demote Student'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="p-16 bg-zinc-900/10 border border-dashed border-zinc-900 rounded-2xl text-center select-none">
          <Users className="h-10 w-10 text-zinc-750 mx-auto mb-4" />
          <h3 className="font-semibold text-white mb-1">No Accounts Found</h3>
          <p className="text-xs text-zinc-550 max-w-sm mx-auto leading-relaxed">
            No active institutional users account matches your search parameters.
          </p>
        </div>
      )}

    </div>
  );
}
