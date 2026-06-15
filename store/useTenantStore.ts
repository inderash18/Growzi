import { create } from 'zustand';

export type TenantInfo = {
  id: string;
  name: string;
  slug: string;
  type: string;
  logoUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
  createdAt?: string | Date | null;
};

export type MembershipInfo = {
  id: string;
  role: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'SUPER_ADMIN';
  tenant: TenantInfo;
};

interface TenantState {
  currentTenant: TenantInfo | null;
  activeRole: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'SUPER_ADMIN' | null;
  memberships: MembershipInfo[];
  setCurrentTenant: (tenant: TenantInfo | null) => void;
  setActiveRole: (role: 'STUDENT' | 'FACULTY' | 'ADMIN' | 'SUPER_ADMIN' | null) => void;
  setMemberships: (memberships: MembershipInfo[]) => void;
}

export const useTenantStore = create<TenantState>((set) => ({
  currentTenant: null,
  activeRole: null,
  memberships: [],
  setCurrentTenant: (tenant) => set({ currentTenant: tenant }),
  setActiveRole: (role) => set({ activeRole: role }),
  setMemberships: (memberships) => set({ memberships }),
}));
