import { useState, useEffect, useCallback } from 'react';
import {
  fetchUsers,
  deleteUser,
  updateUser,
} from '../../../shared/api/user.api';
import {
  User,
  UserQueryParams,
  UpdateUserRequest,
} from '../../../entities/user/types/user.types';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  refreshUsers: () => void;
  handleDeleteUser: (userId: string) => Promise<void>;
  handleUpdateUser: (
    userId: string,
    updates: UpdateUserRequest
  ) => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState('');

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params: UserQueryParams = {
        take: pageSize,
        page: currentPage,
        search: search || undefined,
      };

      const response = await fetchUsers(params);
      setUsers(response.items);
      setTotalItems(response.totalItems);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError('사용자 목록을 불러오는데 실패했습니다.');
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, search]);

  const refreshUsers = useCallback(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDeleteUser = useCallback(
    async (userId: string) => {
      try {
        await deleteUser(userId);
        await loadUsers(); // 목록 새로고침
      } catch (err) {
        setError('사용자 삭제에 실패했습니다.');
        console.error('Failed to delete user:', err);
        throw err;
      }
    },
    [loadUsers]
  );

  const handleUpdateUser = useCallback(
    async (userId: string, updates: UpdateUserRequest) => {
      try {
        await updateUser(userId, updates);
        await loadUsers(); // 목록 새로고침
      } catch (err) {
        setError('사용자 정보 수정에 실패했습니다.');
        console.error('Failed to update user:', err);
        throw err;
      }
    },
    [loadUsers]
  );

  const setPage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const setPageSizeHandler = useCallback((size: number) => {
    setPageSize(size);
    setCurrentPage(1); // 페이지 크기 변경 시 첫 페이지로 이동
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    totalItems,
    totalPages,
    currentPage,
    pageSize,
    search,
    setSearch,
    setPage,
    setPageSize: setPageSizeHandler,
    refreshUsers,
    handleDeleteUser,
    handleUpdateUser,
  };
};
