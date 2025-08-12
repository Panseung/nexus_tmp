import React from 'react';
import { EventEntity } from '../../entities/event/types/event.types';
import { useTranslation } from '../../shared/lib/i18n';
import styles from '../UserTable/UserTable.module.scss';

interface EventTableProps {
  items: EventEntity[];
  loading: boolean;
  columnVisibility?: Record<
    | 'progress'
    | 'title'
    | 'handle'
    | 'visibility'
    | 'participations'
    | 'hostedBy'
    | 'community'
    | 'startDate'
    | 'status',
    boolean
  >;
}

const Header: React.FC<{ v: Required<EventTableProps>['columnVisibility'] }> =
  React.memo(({ v }) => {
    const { t } = useTranslation();
    return (
      <thead>
        <tr>
          {v.progress && <th>{t('events.progress')}</th>}
          {v.title && <th>{t('events.title')}</th>}
          {v.handle && <th>{t('events.handle')}</th>}
          {v.visibility && <th>{t('events.visibility')}</th>}
          {v.participations && <th>{t('events.participations')}</th>}
          {v.hostedBy && <th>{t('events.hostedBy')}</th>}
          {v.community && <th>{t('events.community')}</th>}
          {v.startDate && <th>{t('events.startDate')}</th>}
          {v.status && <th>{t('events.status')}</th>}
        </tr>
      </thead>
    );
  });
Header.displayName = 'EventTableHeader';

const Row = React.memo<{
  e: EventEntity;
  v: Required<EventTableProps>['columnVisibility'];
}>(({ e, v }) => {
  const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString('ko-KR') : '';
  return (
    <tr className={styles.row}>
      {v.progress && <td className={styles.roleCell}>{e.progress || ''}</td>}
      {v.title && (
        <td className={styles.nameCell}>
          <div className={styles.nameContainer}>
            <span className={styles.name}>{e.title || ''}</span>
          </div>
        </td>
      )}
      {v.handle && <td className={styles.handleCell}>{e.handle || ''}</td>}
      {v.visibility && (
        <td className={styles.roleCell}>{e.visibility || ''}</td>
      )}
      {v.participations && (
        <td className={styles.accessCell}>{e.participationsCount ?? ''}</td>
      )}
      {v.hostedBy && <td className={styles.emailCell}>{e.hostedBy || ''}</td>}
      {v.community && (
        <td className={styles.nameCell}>{e.communityName || ''}</td>
      )}
      {v.startDate && <td className={styles.dateCell}>{fmt(e.startAt)}</td>}
      {v.status && <td className={styles.statusCell}>{e.status || ''}</td>}
    </tr>
  );
});
Row.displayName = 'EventTableRow';

const EventTable: React.FC<EventTableProps> = ({
  items,
  loading,
  columnVisibility,
}) => {
  const { t } = useTranslation();
  const v: Required<EventTableProps>['columnVisibility'] = {
    progress: true,
    title: true,
    handle: true,
    visibility: true,
    participations: true,
    hostedBy: true,
    community: true,
    startDate: true,
    status: true,
    ...(columnVisibility || {}),
  } as any;

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className={styles.empty}>
        <p>{t('events.noEvents') || t('common.noData')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <Header v={v} />
          <tbody>
            {items.map((e) => (
              <Row key={e.id} e={e} v={v} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTable;
