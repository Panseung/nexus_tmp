import React from 'react';
import { UserRole } from '../../types/user.types';
import styles from './UserRoleChip.module.scss';

interface UserRoleChipProps {
  role: UserRole;
}

const UserRoleChip: React.FC<UserRoleChipProps> = ({ role }) => {
  const getRoleInfo = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return {
          label: '관리자',
          className: styles.admin,
        };
      case UserRole.MODERATOR:
        return {
          label: '모더레이터',
          className: styles.moderator,
        };
      case UserRole.USER:
        return {
          label: '사용자',
          className: styles.user,
        };
      default:
        return {
          label: '알 수 없음',
          className: styles.unknown,
        };
    }
  };

  const { label, className } = getRoleInfo(role);

  return <span className={`${styles.chip} ${className}`}>{label}</span>;
};

export default UserRoleChip;
