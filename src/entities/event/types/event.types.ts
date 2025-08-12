export interface EventEntity {
  id: string;
  progress?: string; // 진행 상태 (백오피스 참조)
  title?: string;
  handle?: string; // slug/handle
  visibility?: string; // PUBLIC | PRIVATE 등
  participationsCount?: number;
  hostedBy?: string; // 호스트 요약 (이메일/이름)
  communityName?: string;
  startAt?: string;
  status?: string;
}

export interface EventListResponse {
  items: EventEntity[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface EventQueryParams {
  take: number;
  page: number;
  search?: string;
}
