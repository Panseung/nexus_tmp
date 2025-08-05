import React from 'react';
import { useUsers } from '../../features/user/hooks/useUsers';
import { User } from '../../entities/user/types/user.types';
import { useTranslation } from '../../shared/lib/i18n';
import UserTable from '../../widgets/UserTable';
import UserControls from '../../widgets/UserControls';
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
    // TODO: 모달 또는 드로어로 편집 폼 표시
    console.log('Edit user:', user);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t('users.title')}</h1>
        <p className={styles.description}>{t('users.description')}</p>
      </div>

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
      />

      <UserTable
        users={users}
        loading={loading}
        onDeleteUser={handleDeleteUser}
        onEditUser={handleEditUser}
      />
    </div>
  );
};

export default Users;
