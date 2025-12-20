import { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'admin' | 'organization' | 'supervisor' | 'collector' | 'client' | 'auditor';

export interface AuthUser {
  id: string;
  email: string;
  organizationSubdomain: string;
  organizationName: string;
  role: UserRole;
  name: string;
  isDemo?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, subdomain: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  setDemoUser: (orgName: string, role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    // Restore user from localStorage on mount
    const stored = localStorage.getItem('procollector_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string, subdomain: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // For now, validate basic inputs and create demo user
      if (!email || !password || !subdomain) {
        console.error('Missing required fields');
        setIsLoading(false);
        return false;
      }

      // Demo: Accept any credentials for now (MUST implement real backend auth)
      // In production: Call backend API to validate credentials
      const newUser: AuthUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        organizationSubdomain: subdomain,
        organizationName: subdomain.charAt(0).toUpperCase() + subdomain.slice(1),
        role: 'organization', // TODO: Determine role from backend
        name: email.split('@')[0],
      };

      // Store user in localStorage
      localStorage.setItem('procollector_user', JSON.stringify(newUser));
      localStorage.setItem('procollector_auth_token', 'demo-token-' + Date.now());
      
      setUser(newUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const setDemoUser = (orgName: string, role: UserRole) => {
    const demoUser: AuthUser = {
      id: `demo-${Date.now()}`,
      email: `demo@${orgName.toLowerCase().replace(/\s+/g, '')}.com`,
      organizationSubdomain: orgName.toLowerCase().replace(/\s+/g, ''),
      organizationName: orgName,
      role,
      name: `${orgName} Demo User`,
      isDemo: true
    };

    localStorage.setItem('procollector_user', JSON.stringify(demoUser));
    localStorage.setItem('procollector_auth_token', 'demo-token-' + Date.now());
    
    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem('procollector_user');
    localStorage.removeItem('procollector_auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, isLoading, setDemoUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
