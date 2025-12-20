import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Allow demo access for demo routes
  const isDemoRoute = location.pathname.startsWith('/demo-');
  const isDemoUser = user?.isDemo === true;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-brand-dustGold">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-brand-green border-t-brand-dark"></div>
          <p className="mt-4 text-brand-dark font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated && !isDemoUser) {
    return <Navigate to="/login" replace />;
  }

  // For demo routes, ensure user is a demo user
  if (isDemoRoute && !isDemoUser) {
    return <Navigate to="/login" replace />;
  }

  // For regular routes, ensure user is authenticated (not demo)
  if (!isDemoRoute && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role-based access control
  if (requiredRole && user) {
    // Demo users can access any demo route regardless of role for testing
    if (isDemoUser && isDemoRoute) {
      return <>{children}</>;
    }
    
    // Regular users must have the correct role
    if (user.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
