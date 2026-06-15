import { create } from 'zustand';

export type UserInfo = {
  id: string;
  email: string;
  name?: string | null;
  avatarUrl?: string | null;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY' | 'STUDENT';
};

interface AuthState {
  user: UserInfo | null;
  session: any | null;
  isLoading: boolean;
  setUser: (user: UserInfo | null) => void;
  setSession: (session: any) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null, session: null, isLoading: false }),
}));
