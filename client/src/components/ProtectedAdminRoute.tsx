import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactNode;
}

export default function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const { isAuthenticated } = useAdminAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
