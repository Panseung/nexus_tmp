import React from 'react';
import CommunityTable from '../../widgets/CommunityTable';
import UserControls from '../../widgets/UserControls';
import { useCommunities } from '../../features/community/hooks/useCommunities';
import { useLocalStorage } from '../../shared/lib/useLocalStorage';
import { useTranslation } from '../../shared/lib/i18n';
import styles from '../Users/Users.module.scss';

const CommunitiesPage: React.FC = () => {
  const { t } = useTranslation();
  const {
    items,
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
  } = useCommunities();

  type ColKey =
    | 'name'
    | 'subdomain'
    | 'visibility'
    | 'members'
    | 'owner'
    | 'createdAt'
    | 'status';
  const [columns, setColumns] = useLocalStorage<Record<ColKey, boolean>>(
    'columns:communities',
    {
      name: true,
      subdomain: true,
      visibility: true,
      members: true,
      owner: true,
      createdAt: true,
      status: true,
    }
  );

  const columnOptions = [
    { key: 'name', label: t('communities.name') },
    { key: 'subdomain', label: t('communities.subdomain') },
    { key: 'visibility', label: t('communities.visibility') },
    { key: 'members', label: t('communities.members') },
    { key: 'owner', label: t('communities.owner') },
    { key: 'createdAt', label: t('communities.createdAt') },
    { key: 'status', label: t('communities.status') },
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
            searchPlaceholder: t('communities.searchPlaceholder'),
            totalLabel: t('communities.totalCommunities'),
            perPageLabel: t('communities.communitiesPerPage'),
          }}
          columnOptions={columnOptions as any}
          columnVisibility={columns}
          onChangeColumnVisibility={setColumns}
          columnSelectorTitle={t('common.edit')}
        />

        <CommunityTable
          items={items}
          loading={loading}
          columnVisibility={columns}
        />
      </div>
    </div>
  );
};

export default CommunitiesPage;
