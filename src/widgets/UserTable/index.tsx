import React from 'react';
import { User } from '../../entities/user/types/user.types';
import UserRoleChip from '../../entities/user/ui/UserRoleChip';
import UserAccessLevelChip from '../../entities/user/ui/UserAccessLevelChip';
import styles from './UserTable.module.scss';

interface UserTableProps {
  users: User[];
  loading: boolean;
  onDeleteUser: (userId: string) => void;
  onEditUser: (user: User) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onDeleteUser,
  onEditUser,
}) => {
  const handleDeleteClick = (user: User) => {
    if (window.confirm(`${user.name} 사용자를 삭제하시겠습니까?`)) {
      onDeleteUser(user.id);
    }
  };

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
        <p>사용자 목록을 불러오는 중...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.empty}>
        <p>등록된 사용자가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>이름</th>
            <th>이메일</th>
            <th>핸들</th>
            <th>역할</th>
            <th>접근 레벨</th>
            <th>상태</th>
            <th>가입일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={styles.row}>
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
              <td className={styles.statusCell}>
                <span
                  className={`${styles.status} ${user.isActive ? styles.active : styles.inactive}`}
                >
                  {user.isActive ? '활성' : '비활성'}
                </span>
              </td>
              <td className={styles.dateCell}>{formatDate(user.createdAt)}</td>
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
                    onClick={() => handleDeleteClick(user)}
                    title="삭제"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
