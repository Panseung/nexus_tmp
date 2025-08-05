export interface User {
  id: string;
  email: string;
  name: string;
  handle: string;
  role: UserRole;
  accessLevel: UserAccessLevel;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

export enum UserAccessLevel {
  OWNER = 'OWNER',
  MANAGER = 'MANAGER',
  NON_MANAGER = 'NON_MANAGER',
}

export interface UserListResponse {
  items: User[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface UserQueryParams {
  take: number;
  page: number;
  search?: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  handle: string;
  role: UserRole;
  accessLevel: UserAccessLevel;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  handle?: string;
  role?: UserRole;
  accessLevel?: UserAccessLevel;
  isActive?: boolean;
}
