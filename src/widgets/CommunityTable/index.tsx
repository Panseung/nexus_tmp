import React from 'react';
import { Community } from '../../entities/community/types/community.types';
import { useTranslation } from '../../shared/lib/i18n';
import styles from '../UserTable/UserTable.module.scss';

interface CommunityTableProps {
  items: Community[];
  loading: boolean;
  columnVisibility?: Record<
    | 'name'
    | 'subdomain'
    | 'visibility'
    | 'members'
    | 'owner'
    | 'createdAt'
    | 'status',
    boolean
  >;
}

const TableHeader: React.FC<{
  v: Required<CommunityTableProps>['columnVisibility'];
}> = React.memo(({ v }) => {
  const { t } = useTranslation();
  return (
    <thead>
      <tr>
        {v.name && <th>{t('communities.name')}</th>}
        {v.subdomain && <th>{t('communities.subdomain')}</th>}
        {v.visibility && <th>{t('communities.visibility')}</th>}
        {v.members && <th>{t('communities.members')}</th>}
        {v.owner && <th>{t('communities.owner')}</th>}
        {v.createdAt && <th>{t('communities.createdAt')}</th>}
        {v.status && <th>{t('communities.status')}</th>}
      </tr>
    </thead>
  );
});
TableHeader.displayName = 'CommunityTableHeader';

const TableRow = React.memo<{
  c: Community;
  v: Required<CommunityTableProps>['columnVisibility'];
}>(({ c, v }) => {
  const formatDate = (d?: string) =>
    d ? new Date(d).toLocaleDateString('ko-KR') : '';
  return (
    <tr className={styles.row}>
      {v.name && (
        <td className={styles.nameCell}>
          <div className={styles.nameContainer}>
            <span className={styles.name}>{c.name || ''}</span>
          </div>
        </td>
      )}
      {v.subdomain && (
        <td className={styles.handleCell}>{c.subdomain || ''}</td>
      )}
      {v.visibility && (
        <td className={styles.roleCell}>{c.visibility || ''}</td>
      )}
      {v.members && (
        <td className={styles.accessCell}>{c.membersCount ?? ''}</td>
      )}
      {v.owner && <td className={styles.emailCell}>{c.ownerEmail || ''}</td>}
      {v.createdAt && (
        <td className={styles.dateCell}>{formatDate(c.createdAt)}</td>
      )}
      {v.status && <td className={styles.statusCell}>{c.status || ''}</td>}
    </tr>
  );
});
TableRow.displayName = 'CommunityTableRow';

const CommunityTable: React.FC<CommunityTableProps> = ({
  items,
  loading,
  columnVisibility,
}) => {
  const { t } = useTranslation();
  const v: Required<CommunityTableProps>['columnVisibility'] = {
    name: true,
    subdomain: true,
    visibility: true,
    members: true,
    owner: true,
    createdAt: true,
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
        <p>{t('users.noUsers')}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <TableHeader v={v} />
          <tbody>
            {items.map((c) => (
              <TableRow key={c.id} c={c} v={v} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommunityTable;
