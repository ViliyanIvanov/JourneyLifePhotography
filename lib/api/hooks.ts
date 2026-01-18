// ============================================================================
// React Query Hooks for API
// ============================================================================

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { apiClient, ApiClientError } from './client';
import type {
  PagedResponse,
  PaginationParams,
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
  ApiSuccess,
  HealthResponse,
} from './types';

// ============================================================================
// Query Keys
// ============================================================================

export const queryKeys = {
  // Health
  health: ['health'] as const,

  // Public Albums
  albums: {
    all: ['albums'] as const,
    detail: (id: string) => ['albums', id] as const,
    unlocked: (id: string) => ['albums', id, 'unlocked'] as const,
  },

  // Public Blog
  blog: {
    posts: (params?: PaginationParams) => ['blog', 'posts', params] as const,
    post: (slug: string) => ['blog', 'posts', slug] as const,
  },

  // Admin Albums
  adminAlbums: {
    all: (params?: PaginationParams) => ['admin', 'albums', params] as const,
    detail: (id: string) => ['admin', 'albums', id] as const,
  },

  // Admin Blog
  adminBlog: {
    all: (params?: PaginationParams) => ['admin', 'blog', params] as const,
    detail: (id: string) => ['admin', 'blog', id] as const,
  },

  // Admin Contact
  adminContact: {
    all: (params?: ContactSubmissionsParams) =>
      ['admin', 'contact', params] as const,
    detail: (id: string) => ['admin', 'contact', id] as const,
  },

  // Auth
  auth: {
    verify: ['auth', 'verify'] as const,
  },
} as const;

// ============================================================================
// Health Hooks
// ============================================================================

export function useHealthCheck(
  options?: Omit<UseQueryOptions<HealthResponse, ApiClientError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.health,
    queryFn: () => apiClient.health.check(),
    ...options,
  });
}

// ============================================================================
// Public Album Hooks
// ============================================================================

export function useAlbums(
  options?: Omit<UseQueryOptions<AlbumDto[], ApiClientError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.albums.all,
    queryFn: () => apiClient.albums.getAll(),
    ...options,
  });
}

export function useAlbum(
  albumId: string,
  options?: Omit<UseQueryOptions<AlbumDto, ApiClientError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.albums.detail(albumId),
    queryFn: () => apiClient.albums.getById(albumId),
    enabled: !!albumId,
    ...options,
  });
}

export function useUnlockAlbum(
  options?: UseMutationOptions<
    AlbumWithMediaDto,
    ApiClientError,
    { albumId: string; request: UnlockAlbumRequest }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, request }) => apiClient.albums.unlock(albumId, request),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.albums.unlocked(variables.albumId), data);
    },
    ...options,
  });
}

// ============================================================================
// Public Blog Hooks
// ============================================================================

export function useBlogPosts(
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PagedResponse<BlogPostSummaryDto>, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.blog.posts(params),
    queryFn: () => apiClient.blog.getPosts(params),
    ...options,
  });
}

export function useBlogPost(
  slug: string,
  options?: Omit<UseQueryOptions<BlogPostDto, ApiClientError>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: queryKeys.blog.post(slug),
    queryFn: () => apiClient.blog.getBySlug(slug),
    enabled: !!slug,
    ...options,
  });
}

// ============================================================================
// Contact Hooks
// ============================================================================

export function useContactSubmit(
  options?: UseMutationOptions<ApiSuccess, ApiClientError, ContactRequest>
) {
  return useMutation({
    mutationFn: (request) => apiClient.contact.submit(request),
    ...options,
  });
}

// ============================================================================
// Auth Hooks
// ============================================================================

export function useLogin(
  options?: UseMutationOptions<LoginResponse, ApiClientError, LoginRequest>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request) => apiClient.auth.login(request),
    onSuccess: () => {
      // Invalidate auth-related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.verify });
    },
    ...options,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return () => {
    apiClient.auth.logout();
    // Clear all cached data on logout
    queryClient.clear();
  };
}

export function useVerifyToken(
  options?: Omit<
    UseQueryOptions<VerifyTokenResponse, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.auth.verify,
    queryFn: () => apiClient.auth.verify(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
}

export function useChangePassword(
  options?: UseMutationOptions<ApiSuccess, ApiClientError, ChangePasswordRequest>
) {
  return useMutation({
    mutationFn: (request) => apiClient.auth.changePassword(request),
    ...options,
  });
}

// ============================================================================
// Admin Album Hooks
// ============================================================================

export function useAdminAlbums(
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PagedResponse<AdminAlbumDto>, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.adminAlbums.all(params),
    queryFn: () => apiClient.adminAlbums.getAll(params),
    ...options,
  });
}

export function useAdminAlbum(
  albumId: string,
  options?: Omit<
    UseQueryOptions<AdminAlbumDto, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.adminAlbums.detail(albumId),
    queryFn: () => apiClient.adminAlbums.getById(albumId),
    enabled: !!albumId,
    ...options,
  });
}

export function useCreateAlbum(
  options?: UseMutationOptions<AdminAlbumDto, ApiClientError, CreateAlbumRequest>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request) => apiClient.adminAlbums.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'albums'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all });
    },
    ...options,
  });
}

export function useUpdateAlbum(
  options?: UseMutationOptions<
    AdminAlbumDto,
    ApiClientError,
    { albumId: string; request: UpdateAlbumRequest }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, request }) =>
      apiClient.adminAlbums.update(albumId, request),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.adminAlbums.detail(variables.albumId), data);
      queryClient.invalidateQueries({ queryKey: ['admin', 'albums'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all });
    },
    ...options,
  });
}

export function useDeleteAlbum(
  options?: UseMutationOptions<void, ApiClientError, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (albumId) => apiClient.adminAlbums.delete(albumId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'albums'] });
      queryClient.invalidateQueries({ queryKey: queryKeys.albums.all });
    },
    ...options,
  });
}

export function useUploadAlbumMedia(
  options?: UseMutationOptions<
    MediaAssetDto[],
    ApiClientError,
    { albumId: string; files: File[] }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, files }) =>
      apiClient.adminAlbums.uploadMedia(albumId, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminAlbums.detail(variables.albumId),
      });
    },
    ...options,
  });
}

export function useUpdateAlbumMedia(
  options?: UseMutationOptions<
    MediaAssetDto,
    ApiClientError,
    { albumId: string; mediaId: string; request: UpdateMediaRequest }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, mediaId, request }) =>
      apiClient.adminAlbums.updateMedia(albumId, mediaId, request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminAlbums.detail(variables.albumId),
      });
    },
    ...options,
  });
}

export function useDeleteAlbumMedia(
  options?: UseMutationOptions<
    void,
    ApiClientError,
    { albumId: string; mediaId: string }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, mediaId }) =>
      apiClient.adminAlbums.deleteMedia(albumId, mediaId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminAlbums.detail(variables.albumId),
      });
    },
    ...options,
  });
}

export function useReorderAlbumMedia(
  options?: UseMutationOptions<
    ApiSuccess,
    ApiClientError,
    { albumId: string; mediaIds: string[] }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ albumId, mediaIds }) =>
      apiClient.adminAlbums.reorderMedia(albumId, mediaIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminAlbums.detail(variables.albumId),
      });
    },
    ...options,
  });
}

export function useCreateAccessLink(
  options?: UseMutationOptions<
    AccessLinkResponse,
    ApiClientError,
    { albumId: string; request: CreateAccessLinkRequest }
  >
) {
  return useMutation({
    mutationFn: ({ albumId, request }) =>
      apiClient.adminAlbums.createAccessLink(albumId, request),
    ...options,
  });
}

export function useDeleteAccessLink(
  options?: UseMutationOptions<
    void,
    ApiClientError,
    { albumId: string; tokenId: string }
  >
) {
  return useMutation({
    mutationFn: ({ albumId, tokenId }) =>
      apiClient.adminAlbums.deleteAccessLink(albumId, tokenId),
    ...options,
  });
}

// ============================================================================
// Admin Blog Hooks
// ============================================================================

export function useAdminBlogPosts(
  params?: PaginationParams,
  options?: Omit<
    UseQueryOptions<PagedResponse<AdminBlogPostDto>, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.adminBlog.all(params),
    queryFn: () => apiClient.adminBlog.getAll(params),
    ...options,
  });
}

export function useAdminBlogPost(
  postId: string,
  options?: Omit<
    UseQueryOptions<AdminBlogPostDto, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.adminBlog.detail(postId),
    queryFn: () => apiClient.adminBlog.getById(postId),
    enabled: !!postId,
    ...options,
  });
}

export function useCreateBlogPost(
  options?: UseMutationOptions<AdminBlogPostDto, ApiClientError, CreateBlogPostRequest>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request) => apiClient.adminBlog.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    ...options,
  });
}

export function useUpdateBlogPost(
  options?: UseMutationOptions<
    AdminBlogPostDto,
    ApiClientError,
    { postId: string; request: UpdateBlogPostRequest }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, request }) =>
      apiClient.adminBlog.update(postId, request),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.adminBlog.detail(variables.postId), data);
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    ...options,
  });
}

export function useDeleteBlogPost(
  options?: UseMutationOptions<void, ApiClientError, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => apiClient.adminBlog.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blog'] });
      queryClient.invalidateQueries({ queryKey: ['blog'] });
    },
    ...options,
  });
}

export function useUploadBlogMedia(
  options?: UseMutationOptions<
    MediaAssetDto[],
    ApiClientError,
    { postId: string; files: File[] }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, files }) =>
      apiClient.adminBlog.uploadMedia(postId, files),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminBlog.detail(variables.postId),
      });
    },
    ...options,
  });
}

export function useUpdateBlogMedia(
  options?: UseMutationOptions<
    MediaAssetDto,
    ApiClientError,
    { postId: string; mediaId: string; request: UpdateMediaRequest }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, mediaId, request }) =>
      apiClient.adminBlog.updateMedia(postId, mediaId, request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminBlog.detail(variables.postId),
      });
    },
    ...options,
  });
}

export function useDeleteBlogMedia(
  options?: UseMutationOptions<
    void,
    ApiClientError,
    { postId: string; mediaId: string }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, mediaId }) =>
      apiClient.adminBlog.deleteMedia(postId, mediaId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.adminBlog.detail(variables.postId),
      });
    },
    ...options,
  });
}

// ============================================================================
// Admin Contact Hooks
// ============================================================================

export function useAdminContactSubmissions(
  params?: ContactSubmissionsParams,
  options?: Omit<
    UseQueryOptions<PagedResponse<ContactSubmissionDto>, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.adminContact.all(params),
    queryFn: () => apiClient.adminContact.getAll(params),
    ...options,
  });
}

export function useAdminContactSubmission(
  id: string,
  options?: Omit<
    UseQueryOptions<ContactSubmissionDto, ApiClientError>,
    'queryKey' | 'queryFn'
  >
) {
  return useQuery({
    queryKey: queryKeys.adminContact.detail(id),
    queryFn: () => apiClient.adminContact.getById(id),
    enabled: !!id,
    ...options,
  });
}

export function useUpdateContactSubmission(
  options?: UseMutationOptions<
    ContactSubmissionDto,
    ApiClientError,
    { id: string; request: UpdateContactSubmissionRequest }
  >
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, request }) => apiClient.adminContact.update(id, request),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(queryKeys.adminContact.detail(variables.id), data);
      queryClient.invalidateQueries({ queryKey: ['admin', 'contact'] });
    },
    ...options,
  });
}

export function useDeleteContactSubmission(
  options?: UseMutationOptions<void, ApiClientError, string>
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => apiClient.adminContact.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'contact'] });
    },
    ...options,
  });
}
