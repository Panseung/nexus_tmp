import { useCallback, useEffect, useState } from 'react';
import { fetchCommunities } from '../../../shared/api/community.api';
import {
  Community,
  CommunityListResponse,
  CommunityQueryParams,
} from '../../../entities/community/types/community.types';

export const useCommunities = () => {
  const [items, setItems] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: CommunityQueryParams = {
        take: pageSize,
        page: currentPage,
        search: search || undefined,
      };
      const res: CommunityListResponse = await fetchCommunities(params as any);
      setItems(res.items || []);
      setTotalItems(res.totalItems || 0);
      setTotalPages(res.totalPages || 0);
    } catch (e) {
      setError('커뮤니티 목록을 불러오지 못했습니다.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    items,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    search,
    setSearch,
    setPage: setCurrentPage,
    setPageSize,
    refresh: load,
  };
};
