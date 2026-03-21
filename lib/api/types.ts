// ============================================================================
// Iva Dimitrov Photography API - TypeScript Types
// ============================================================================

// ============================================================================
// Common Types
// ============================================================================

export interface ApiError {
  code: string;
  message: string;
  errors?: Record<string, string[]>;
  traceId?: string;
}

export interface ApiSuccess {
  message: string;
}

export interface PagedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// ============================================================================
// Auth Types
// ============================================================================

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
  username: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  username: string;
}

// ============================================================================
// Media Types
// ============================================================================

export interface MediaAssetDto {
  id: string;
  fileName: string;
  mimeType: string;
  originalUrl?: string;
  webUrl: string;
  thumbUrl: string;
  fileSize: number;
  width: number;
  height: number;
  altText?: string;
  sortOrder: number;
  createdAt: string;
}

export interface SecureMediaAssetDto {
  id: string;
  fileName: string;
  mimeType: string;
  webUrl: string;
  thumbUrl: string;
  width: number;
  height: number;
  altText?: string;
  sortOrder: number;
  urlExpiresAt: string;
}

export interface UpdateMediaRequest {
  altText?: string;
  sortOrder?: number;
}

// ============================================================================
// Album Types
// ============================================================================

export interface AlbumDto {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  isPrivate: boolean;
  coverImage?: MediaAssetDto;
  sortOrder: number;
  createdAt: string;
}

export interface AlbumWithMediaDto extends AlbumDto {
  media: MediaAssetDto[];
}

export interface AdminAlbumDto {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  isPrivate: boolean;
  hasPassword: boolean;
  coverImageId?: string;
  coverImage?: MediaAssetDto;
  sortOrder: number;
  isPublished: boolean;
  clientName?: string;
  clientEmail?: string;
  createdAt: string;
  updatedAt?: string;
  mediaCount: number;
}

export interface CreateAlbumRequest {
  title: string;
  description?: string;
  slug?: string;
  isPrivate: boolean;
  password?: string;
  sortOrder: number;
  isPublished: boolean;
  clientName?: string;
  clientEmail?: string;
}

export interface UpdateAlbumRequest {
  title?: string;
  description?: string;
  slug?: string;
  isPrivate?: boolean;
  password?: string;
  clearPassword?: boolean;
  coverImageId?: string;
  sortOrder?: number;
  isPublished?: boolean;
  clientName?: string;
  clientEmail?: string;
}

export interface UnlockAlbumRequest {
  password?: string;
  token?: string;
}

export interface CreateAccessLinkRequest {
  email?: string;
  expiresInDays?: number;
}

export interface AccessLinkResponse {
  link: string;
  token: string;
  expiresAt: string;
  emailSent: boolean;
}

// ============================================================================
// Blog Types
// ============================================================================

export interface BlogPostSummaryDto {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: MediaAssetDto;
  publishedAt?: string;
  tags?: string;
}

export interface BlogPostDto {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: MediaAssetDto;
  isPublished: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  createdAt: string;
  updatedAt?: string;
  media: MediaAssetDto[];
}

export interface AdminBlogPostDto {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImageId?: string;
  featuredImage?: MediaAssetDto;
  isPublished: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
  createdAt: string;
  updatedAt?: string;
  mediaCount: number;
}

export interface CreateBlogPostRequest {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  featuredImageId?: string;
  isPublished: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
}

export interface UpdateBlogPostRequest {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImageId?: string;
  clearFeaturedImage?: boolean;
  isPublished?: boolean;
  publishedAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  tags?: string;
}

// ============================================================================
// Contact Types
// ============================================================================

export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType?: string;
  preferredDate?: string;
}

export interface ContactSubmissionDto {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  inquiryType?: string;
  preferredDate?: string;
  emailSent: boolean;
  isRead: boolean;
  adminNotes?: string;
  createdAt: string;
}

export interface UpdateContactSubmissionRequest {
  isRead?: boolean;
  adminNotes?: string;
}

export interface ContactSubmissionsParams extends PaginationParams {
  unreadOnly?: boolean;
}

// ============================================================================
// Health Types
// ============================================================================

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}
