// ============================================================================
// Authentication Utilities - Token Management
// ============================================================================

import type { LoginResponse } from './types';

const TOKEN_KEY = 'jlp_auth_token';
const TOKEN_EXPIRY_KEY = 'jlp_auth_token_expiry';
const USERNAME_KEY = 'jlp_auth_username';

export interface AuthState {
  token: string | null;
  expiresAt: string | null;
  username: string | null;
  isAuthenticated: boolean;
}

/**
 * Check if we're running in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get the stored authentication token
 */
export function getToken(): string | null {
  if (!isBrowser()) return null;

  const token = localStorage.getItem(TOKEN_KEY);
  const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);

  // Check if token exists and is not expired
  if (token && expiresAt) {
    const expiryDate = new Date(expiresAt);
    if (expiryDate > new Date()) {
      return token;
    }
    // Token expired, clear it
    clearAuth();
  }

  return null;
}

/**
 * Get the current authentication state
 */
export function getAuthState(): AuthState {
  if (!isBrowser()) {
    return {
      token: null,
      expiresAt: null,
      username: null,
      isAuthenticated: false,
    };
  }

  const token = getToken();
  const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);
  const username = localStorage.getItem(USERNAME_KEY);

  return {
    token,
    expiresAt,
    username,
    isAuthenticated: !!token,
  };
}

/**
 * Store authentication data from login response
 */
export function setAuth(loginResponse: LoginResponse): void {
  if (!isBrowser()) return;

  localStorage.setItem(TOKEN_KEY, loginResponse.token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, loginResponse.expiresAt);
  localStorage.setItem(USERNAME_KEY, loginResponse.username);
}

/**
 * Clear all authentication data
 */
export function clearAuth(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

/**
 * Check if the user is authenticated (has a valid, non-expired token)
 */
export function isAuthenticated(): boolean {
  return !!getToken();
}

/**
 * Get the Authorization header value for API requests
 */
export function getAuthHeader(): string | null {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
}

/**
 * Get the time remaining until token expiry (in milliseconds)
 * Returns 0 if no token or already expired
 */
export function getTokenTimeRemaining(): number {
  if (!isBrowser()) return 0;

  const expiresAt = localStorage.getItem(TOKEN_EXPIRY_KEY);
  if (!expiresAt) return 0;

  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const remaining = expiryDate.getTime() - now.getTime();

  return remaining > 0 ? remaining : 0;
}

/**
 * Check if the token is about to expire (within specified minutes)
 */
export function isTokenExpiringSoon(withinMinutes: number = 5): boolean {
  const remaining = getTokenTimeRemaining();
  return remaining > 0 && remaining < withinMinutes * 60 * 1000;
}
