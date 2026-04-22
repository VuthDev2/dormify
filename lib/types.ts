export type UserRole = 'admin' | 'tenant' | 'chef';
export type UserPlan = 'normal' | 'pro' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan?: UserPlan;
  dorm?: string;
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}
