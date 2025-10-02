import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (apiKey: string) => Promise<boolean>;
  logout: () => void;
  getApiKey: () => string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const ADMIN_KEY_STORAGE = 'admin_api_key';

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedKey = localStorage.getItem(ADMIN_KEY_STORAGE);
    if (storedKey) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (apiKey: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/cms/status', {
        headers: {
          'x-api-key': apiKey,
        },
      });

      if (response.ok) {
        localStorage.setItem(ADMIN_KEY_STORAGE, apiKey);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY_STORAGE);
    setIsAuthenticated(false);
  };

  const getApiKey = (): string | null => {
    return localStorage.getItem(ADMIN_KEY_STORAGE);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, getApiKey }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
