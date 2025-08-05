import React from 'react';
import { User } from '../../entities/user/types/user.types';
import UserRoleChip from '../../entities/user/ui/UserRoleChip';
import UserAccessLevelChip from '../../entities/user/ui/UserAccessLevelChip';
import { useTranslation } from '../../shared/lib/i18n';
import styles from './UserTable.module.scss';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onDeleteUser: (userId: string) => void;
  onEditUser: (user: User) => void;
}

// 테이블 헤더 컴포넌트 (메모이제이션)
const TableHeader = React.memo(() => {
  const { t } = useTranslation();

  return (
    <thead>
      <tr>
        <th>{t('users.name')}</th>
        <th>{t('users.email')}</th>
        <th>{t('users.handle')}</th>
        <th>{t('users.role')}</th>
        <th>{t('users.accessLevel')}</th>
        <th>{t('users.joinDate')}</th>
        <th>{t('users.status')}</th>
        <th>{t('users.actions')}</th>
      </tr>
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';

// 테이블 행 컴포넌트 (메모이제이션)
const TableRow = React.memo<{
  user: User;
  onDeleteUser: (userId: string) => void;
  onEditUser: (user: User) => void;
  formatDate: (dateString: string) => string;
  t: (key: string) => string;
}>(({ user, onDeleteUser, onEditUser, formatDate, t }) => {
  const handleDeleteClick = () => {
    if (window.confirm(t('users.deleteConfirm').replace('{name}', user.name))) {
      onDeleteUser(user.id);
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.nameCell}>
        <div className={styles.nameContainer}>
          <span className={styles.name}>{user.name}</span>
        </div>
      </td>
      <td className={styles.emailCell}>
        <a href={`mailto:${user.email}`} className={styles.email}>
          {user.email}
        </a>
      </td>
      <td className={styles.handleCell}>
        <span className={styles.handle}>@{user.handle}</span>
      </td>
      <td className={styles.roleCell}>
        <UserRoleChip role={user.role} />
      </td>
      <td className={styles.accessCell}>
        <UserAccessLevelChip accessLevel={user.accessLevel} />
      </td>
      <td className={styles.dateCell}>{formatDate(user.createdAt)}</td>
      <td className={styles.statusCell}>
        <span
          className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}
        >
          {user.isActive ? t('users.active') : t('users.inactive')}
        </span>
      </td>
      <td className={styles.actionsCell}>
        <div className={styles.actions}>
          <button
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={() => onEditUser(user)}
            title="수정"
          >
            ✏️
          </button>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={handleDeleteClick}
            title="삭제"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
});

TableRow.displayName = 'TableRow';

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onDeleteUser,
  onEditUser,
}) => {
  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>{t('common.loading')}</p>
      </div>
    );
  }

  if (users.length === 0) {
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
          <TableHeader />
          <tbody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                onDeleteUser={onDeleteUser}
                onEditUser={onEditUser}
                formatDate={formatDate}
                t={t}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
