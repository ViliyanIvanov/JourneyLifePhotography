// ============================================================================
// JourneyLifePhotography API - Barrel Export
// ============================================================================

// Types
export type {
  // Common
  ApiError,
  ApiSuccess,
  PagedResponse,
  PaginationParams,
  // Health
  HealthResponse,
  // Auth
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest,
  VerifyTokenResponse,
  // Albums
  AlbumDto,
  AlbumWithMediaDto,
  AdminAlbumDto,
  CreateAlbumRequest,
  UpdateAlbumRequest,
  UnlockAlbumRequest,
  CreateAccessLinkRequest,
  AccessLinkResponse,
  // Media
  MediaAssetDto,
  SecureMediaAssetDto,
  UpdateMediaRequest,
  // Blog
  BlogPostSummaryDto,
  BlogPostDto,
  AdminBlogPostDto,
  CreateBlogPostRequest,
  UpdateBlogPostRequest,
  // Contact
  ContactRequest,
  ContactSubmissionDto,
  UpdateContactSubmissionRequest,
  ContactSubmissionsParams,
} from './types';

// Client
export { apiClient, ApiClientError, ErrorCodes } from './client';

// Auth utilities
export {
  getToken,
  getAuthState,
  setAuth,
  clearAuth,
  isAuthenticated,
  getAuthHeader,
  getTokenTimeRemaining,
  isTokenExpiringSoon,
  type AuthState,
} from './auth';

// Auth context
export { AuthProvider, useAuth, withAuth } from './auth-context';

// Query keys for cache management
export { queryKeys } from './hooks';

// React Query Hooks
export {
  // Health
  useHealthCheck,
  // Public Albums
  useAlbums,
  useAlbum,
  useUnlockAlbum,
  // Public Blog
  useBlogPosts,
  useBlogPost,
  // Contact
  useContactSubmit,
  // Auth
  useLogin,
  useLogout,
  useVerifyToken,
  useChangePassword,
  // Admin Albums
  useAdminAlbums,
  useAdminAlbum,
  useCreateAlbum,
  useUpdateAlbum,
  useDeleteAlbum,
  useUploadAlbumMedia,
  useUpdateAlbumMedia,
  useDeleteAlbumMedia,
  useReorderAlbumMedia,
  useCreateAccessLink,
  useDeleteAccessLink,
  // Admin Blog
  useAdminBlogPosts,
  useAdminBlogPost,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
  useUploadBlogMedia,
  useUpdateBlogMedia,
  useDeleteBlogMedia,
  // Admin Contact
  useAdminContactSubmissions,
  useAdminContactSubmission,
  useUpdateContactSubmission,
  useDeleteContactSubmission,
} from './hooks';
