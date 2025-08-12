export interface Community {
  id: string;
  name?: string;
  subdomain?: string;
  visibility?: string; // PUBLIC | PRIVATE 등 (백오피스 참조)
  membersCount?: number;
  ownerEmail?: string;
  createdAt?: string;
  status?: string; // 활성/비활성 등 필요 시
}

export interface CommunityListResponse {
  items: Community[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface CommunityQueryParams {
  take: number;
  page: number;
  search?: string;
}
