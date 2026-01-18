// ============================================================================
// JourneyLifePhotography API Client
// ============================================================================

import { env } from '../env';
import { getAuthHeader, setAuth, clearAuth } from './auth';
import type {
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

// ============================================================================
// API Error Class
// ============================================================================

export class ApiClientError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;
  public readonly traceId?: string;

  constructor(apiError: ApiError, statusCode: number) {
    super(apiError.message);
    this.name = 'ApiClientError';
    this.code = apiError.code;
    this.statusCode = statusCode;
    this.errors = apiError.errors;
    this.traceId = apiError.traceId;
  }

  /**
   * Check if this is a specific error code
   */
  is(code: string): boolean {
    return this.code === code;
  }

  /**
   * Get field-specific validation errors
   */
  getFieldErrors(field: string): string[] {
    return this.errors?.[field] ?? [];
  }

  /**
   * Get all field validation errors as a flat array
   */
  getAllFieldErrors(): { field: string; messages: string[] }[] {
    if (!this.errors) return [];
    return Object.entries(this.errors).map(([field, messages]) => ({
      field,
      messages,
    }));
  }
}

// Common error codes
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  SERVER_ERROR: 'SERVER_ERROR',
} as const;

// ============================================================================
// HTTP Client
// ============================================================================

type RequestOptions = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

class HttpClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
  }

  /**
   * Build URL with query parameters
   */
  private buildUrl(endpoint: string, params?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  }

  /**
   * Core request method
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit & RequestOptions = {},
    params?: Record<string, unknown>,
    requiresAuth: boolean = false
  ): Promise<T> {
    const url = this.buildUrl(endpoint, params);

    const headers: Record<string, string> = {
      ...options.headers,
    };

    // Add Content-Type for JSON requests (not for FormData)
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    // Add auth header if required
    if (requiresAuth) {
      const authHeader = getAuthHeader();
      if (!authHeader) {
        throw new ApiClientError(
          { code: ErrorCodes.UNAUTHORIZED, message: 'Authentication required' },
          401
        );
      }
      headers['Authorization'] = authHeader;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      // Try to parse JSON response
      let data: unknown;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json();
      }

      // Handle error responses
      if (!response.ok) {
        const apiError: ApiError = data as ApiError ?? {
          code: 'UNKNOWN_ERROR',
          message: response.statusText || 'An unknown error occurred',
        };
        throw new ApiClientError(apiError, response.status);
      }

      return data as T;
    } catch (error) {
      // Re-throw ApiClientError as-is
      if (error instanceof ApiClientError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof Error) {
        throw new ApiClientError(
          {
            code: 'NETWORK_ERROR',
            message: error.message || 'Network error occurred',
          },
          0
        );
      }

      throw error;
    }
  }

  // ============================================================================
  // Public Methods
  // ============================================================================

  async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options }, params);
  }

  async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }

  // ============================================================================
  // Authenticated Methods
  // ============================================================================

  async authGet<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options }, params, true);
  }

  async authPost<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'POST',
        body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
        ...options,
      },
      undefined,
      true
    );
  }

  async authPut<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      {
        method: 'PUT',
        body: data instanceof FormData ? data : data ? JSON.stringify(data) : undefined,
        ...options,
      },
      undefined,
      true
    );
  }

  async authDelete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options }, undefined, true);
  }

  /**
   * Upload files with multipart/form-data
   */
  async uploadFiles<T>(
    endpoint: string,
    files: File[],
    options?: RequestOptions
  ): Promise<T> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    return this.authPost<T>(endpoint, formData, options);
  }
}

// Create singleton instance
const http = new HttpClient();

// ============================================================================
// API Client with Domain-Specific Methods
// ============================================================================

export const apiClient = {
  // ==========================================================================
  // Health
  // ==========================================================================

  health: {
    check: () => http.get<HealthResponse>('/health'),
  },

  // ==========================================================================
  // Public - Albums
  // ==========================================================================

  albums: {
    /** Get all public albums */
    getAll: () => http.get<AlbumDto[]>('/public/albums'),

    /** Get a single album by ID */
    getById: (albumId: string) => http.get<AlbumDto>(`/public/albums/${albumId}`),

    /** Unlock a private album with password or token */
    unlock: (albumId: string, request: UnlockAlbumRequest) =>
      http.post<AlbumWithMediaDto>(`/public/albums/${albumId}/unlock`, request),
  },

  // ==========================================================================
  // Public - Blog
  // ==========================================================================

  blog: {
    /** Get paginated list of blog posts */
    getPosts: (params?: PaginationParams) =>
      http.get<PagedResponse<BlogPostSummaryDto>>(
        '/public/blog/posts',
        params as Record<string, unknown>
      ),

    /** Get a single blog post by slug */
    getBySlug: (slug: string) => http.get<BlogPostDto>(`/public/blog/posts/${slug}`),
  },

  // ==========================================================================
  // Public - Contact
  // ==========================================================================

  contact: {
    /** Submit a contact form */
    submit: (request: ContactRequest) =>
      http.post<ApiSuccess>('/public/contact', request),
  },

  // ==========================================================================
  // Admin - Auth
  // ==========================================================================

  auth: {
    /** Login with credentials */
    login: async (request: LoginRequest): Promise<LoginResponse> => {
      const response = await http.post<LoginResponse>('/admin/auth/login', request);
      setAuth(response);
      return response;
    },

    /** Logout (clears local auth state) */
    logout: () => {
      clearAuth();
    },

    /** Verify current token is valid */
    verify: () => http.authGet<VerifyTokenResponse>('/admin/auth/verify'),

    /** Change password */
    changePassword: (request: ChangePasswordRequest) =>
      http.authPost<ApiSuccess>('/admin/auth/change-password', request),
  },

  // ==========================================================================
  // Admin - Albums
  // ==========================================================================

  adminAlbums: {
    /** Get paginated list of albums */
    getAll: (params?: PaginationParams) =>
      http.authGet<PagedResponse<AdminAlbumDto>>(
        '/admin/albums',
        params as Record<string, unknown>
      ),

    /** Get a single album by ID */
    getById: (albumId: string) =>
      http.authGet<AdminAlbumDto>(`/admin/albums/${albumId}`),

    /** Create a new album */
    create: (request: CreateAlbumRequest) =>
      http.authPost<AdminAlbumDto>('/admin/albums', request),

    /** Update an album */
    update: (albumId: string, request: UpdateAlbumRequest) =>
      http.authPut<AdminAlbumDto>(`/admin/albums/${albumId}`, request),

    /** Delete an album */
    delete: (albumId: string) =>
      http.authDelete<void>(`/admin/albums/${albumId}`),

    /** Upload media to album */
    uploadMedia: (albumId: string, files: File[]) =>
      http.uploadFiles<MediaAssetDto[]>(`/admin/albums/${albumId}/media`, files),

    /** Update media metadata */
    updateMedia: (albumId: string, mediaId: string, request: UpdateMediaRequest) =>
      http.authPut<MediaAssetDto>(
        `/admin/albums/${albumId}/media/${mediaId}`,
        request
      ),

    /** Delete media from album */
    deleteMedia: (albumId: string, mediaId: string) =>
      http.authDelete<void>(`/admin/albums/${albumId}/media/${mediaId}`),

    /** Reorder media in album */
    reorderMedia: (albumId: string, mediaIds: string[]) =>
      http.authPost<ApiSuccess>(`/admin/albums/${albumId}/media/reorder`, mediaIds),

    /** Create an access link for private album */
    createAccessLink: (albumId: string, request: CreateAccessLinkRequest) =>
      http.authPost<AccessLinkResponse>(
        `/admin/albums/${albumId}/access-links`,
        request
      ),

    /** Delete an access link */
    deleteAccessLink: (albumId: string, tokenId: string) =>
      http.authDelete<void>(`/admin/albums/${albumId}/access-links/${tokenId}`),
  },

  // ==========================================================================
  // Admin - Blog
  // ==========================================================================

  adminBlog: {
    /** Get paginated list of blog posts */
    getAll: (params?: PaginationParams) =>
      http.authGet<PagedResponse<AdminBlogPostDto>>(
        '/admin/blog/posts',
        params as Record<string, unknown>
      ),

    /** Get a single blog post by ID */
    getById: (postId: string) =>
      http.authGet<AdminBlogPostDto>(`/admin/blog/posts/${postId}`),

    /** Create a new blog post */
    create: (request: CreateBlogPostRequest) =>
      http.authPost<AdminBlogPostDto>('/admin/blog/posts', request),

    /** Update a blog post */
    update: (postId: string, request: UpdateBlogPostRequest) =>
      http.authPut<AdminBlogPostDto>(`/admin/blog/posts/${postId}`, request),

    /** Delete a blog post */
    delete: (postId: string) =>
      http.authDelete<void>(`/admin/blog/posts/${postId}`),

    /** Upload media to blog post */
    uploadMedia: (postId: string, files: File[]) =>
      http.uploadFiles<MediaAssetDto[]>(`/admin/blog/posts/${postId}/media`, files),

    /** Update media metadata */
    updateMedia: (postId: string, mediaId: string, request: UpdateMediaRequest) =>
      http.authPut<MediaAssetDto>(
        `/admin/blog/posts/${postId}/media/${mediaId}`,
        request
      ),

    /** Delete media from blog post */
    deleteMedia: (postId: string, mediaId: string) =>
      http.authDelete<void>(`/admin/blog/posts/${postId}/media/${mediaId}`),
  },

  // ==========================================================================
  // Admin - Contact Submissions
  // ==========================================================================

  adminContact: {
    /** Get paginated list of contact submissions */
    getAll: (params?: ContactSubmissionsParams) =>
      http.authGet<PagedResponse<ContactSubmissionDto>>(
        '/admin/contact/submissions',
        params as Record<string, unknown>
      ),

    /** Get a single contact submission by ID */
    getById: (id: string) =>
      http.authGet<ContactSubmissionDto>(`/admin/contact/submissions/${id}`),

    /** Update a contact submission (mark as read, add notes) */
    update: (id: string, request: UpdateContactSubmissionRequest) =>
      http.authPut<ContactSubmissionDto>(
        `/admin/contact/submissions/${id}`,
        request
      ),

    /** Delete a contact submission */
    delete: (id: string) =>
      http.authDelete<void>(`/admin/contact/submissions/${id}`),
  },
};

// Export types
export type { ApiError };
