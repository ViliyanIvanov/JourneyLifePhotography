'use client';

// ============================================================================
// Authentication Context Provider
// ============================================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuthState,
  clearAuth,
  isTokenExpiringSoon,
  type AuthState,
} from './auth';
import { apiClient, ApiClientError } from './client';
import type { LoginRequest, LoginResponse } from './types';

interface AuthContextValue extends AuthState {
  login: (request: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    expiresAt: null,
    username: null,
    isAuthenticated: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    const state = getAuthState();
    setAuthState(state);
    setIsLoading(false);
  }, []);

  // Check token validity periodically
  useEffect(() => {
    if (!authState.isAuthenticated) return;

    const checkToken = async () => {
      // If token is expiring soon, verify it's still valid
      if (isTokenExpiringSoon(10)) {
        try {
          await apiClient.auth.verify();
        } catch (error) {
          if (error instanceof ApiClientError && error.statusCode === 401) {
            // Token invalid/expired, log out
            handleLogout();
          }
        }
      }
    };

    // Check every 5 minutes
    const interval = setInterval(checkToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authState.isAuthenticated]);

  const handleLogin = useCallback(async (request: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    try {
      const response = await apiClient.auth.login(request);
      setAuthState({
        token: response.token,
        expiresAt: response.expiresAt,
        username: response.username,
        isAuthenticated: true,
      });
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    clearAuth();
    setAuthState({
      token: null,
      expiresAt: null,
      username: null,
      isAuthenticated: false,
    });
    router.push('/admin/login');
  }, [router]);

  const value: AuthContextValue = {
    ...authState,
    login: handleLogin,
    logout: handleLogout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * HOC to protect routes that require authentication
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push('/admin/login');
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
