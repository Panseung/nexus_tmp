import { useCallback, useEffect, useState } from 'react';
import { fetchEvents } from '../../../shared/api/event.api';
import {
  EventEntity,
  EventListResponse,
  EventQueryParams,
} from '../../../entities/event/types/event.types';

export const useEvents = () => {
  const [items, setItems] = useState<EventEntity[]>([]);
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
      const params: EventQueryParams = {
        take: pageSize,
        page: currentPage,
        search: search || undefined,
      };
      const res: EventListResponse = await fetchEvents(params as any);
      setItems(res.items || []);
      setTotalItems(res.totalItems || 0);
      setTotalPages(res.totalPages || 0);
    } catch (e) {
      setError('이벤트 목록을 불러오지 못했습니다.');
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
