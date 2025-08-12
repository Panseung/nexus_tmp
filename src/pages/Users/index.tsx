import React from 'react';
import { useUsers } from '../../features/user/hooks/useUsers';
import { User } from '../../entities/user/types/user.types';
import UserTable from '../../widgets/UserTable';
import UserControls from '../../widgets/UserControls';
import { useLocalStorage } from '../../shared/lib/useLocalStorage';
import { useTranslation } from '../../shared/lib/i18n';
import styles from './Users.module.scss';

const Users = () => {
  const { t } = useTranslation();
  const {
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
    setPageSize,
    handleDeleteUser,
  } = useUsers();

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
  };

  type ColKey =
    | 'name'
    | 'email'
    | 'handle'
    | 'role'
    | 'access'
    | 'joinDate'
    | 'status';
  const [columns, setColumns] = useLocalStorage<Record<ColKey, boolean>>(
    'columns:users',
    {
      name: true,
      email: true,
      handle: true,
      role: true,
      access: true,
      joinDate: true,
      status: true,
    }
  );

  const columnOptions = [
    { key: 'name', label: t('users.name') },
    { key: 'email', label: t('users.email') },
    { key: 'handle', label: t('users.handle') },
    { key: 'role', label: t('users.role') },
    { key: 'access', label: t('users.accessLevel') },
    { key: 'joinDate', label: t('users.joinDate') },
    { key: 'status', label: t('users.status') },
  ] as const;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && (
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        )}

        <UserControls
          search={search}
          onSearchChange={setSearch}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          labels={{
            searchPlaceholder: t('users.searchPlaceholder'),
            totalLabel: t('users.totalUsers'),
            perPageLabel: t('users.usersPerPage'),
          }}
          columnOptions={columnOptions as any}
          columnVisibility={columns}
          onChangeColumnVisibility={setColumns}
          columnSelectorTitle={t('common.edit')}
        />

        <UserTable
          users={users}
          loading={loading}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
          columnVisibility={columns}
        />
      </div>
    </div>
  );
};

export default Users;
