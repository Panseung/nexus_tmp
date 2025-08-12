import React from 'react';
import EventTable from '../../widgets/EventTable';
import UserControls from '../../widgets/UserControls';
import { useEvents } from '../../features/event/hooks/useEvents';
import { useLocalStorage } from '../../shared/lib/useLocalStorage';
import { useTranslation } from '../../shared/lib/i18n';
import styles from '../Users/Users.module.scss';

const EventsPage: React.FC = () => {
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
  } = useEvents();

  type ColKey =
    | 'progress'
    | 'title'
    | 'handle'
    | 'visibility'
    | 'participations'
    | 'hostedBy'
    | 'community'
    | 'startDate'
    | 'status';
  const [columns, setColumns] = useLocalStorage<Record<ColKey, boolean>>(
    'columns:events',
    {
      progress: true,
      title: true,
      handle: true,
      visibility: true,
      participations: true,
      hostedBy: true,
      community: true,
      startDate: true,
      status: true,
    }
  );

  const columnOptions = [
    { key: 'progress', label: t('events.progress') },
    { key: 'title', label: t('events.title') },
    { key: 'handle', label: t('events.handle') },
    { key: 'visibility', label: t('events.visibility') },
    { key: 'participations', label: t('events.participations') },
    { key: 'hostedBy', label: t('events.hostedBy') },
    { key: 'community', label: t('events.community') },
    { key: 'startDate', label: t('events.startDate') },
    { key: 'status', label: t('events.status') },
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
            searchPlaceholder: t('events.searchPlaceholder'),
            totalLabel: t('events.totalEvents'),
            perPageLabel: t('events.eventsPerPage'),
          }}
          columnOptions={columnOptions as any}
          columnVisibility={columns}
          onChangeColumnVisibility={setColumns}
          columnSelectorTitle={t('common.edit')}
        />

        <EventTable
          items={items}
          loading={loading}
          columnVisibility={columns}
        />
      </div>
    </div>
  );
};

export default EventsPage;
