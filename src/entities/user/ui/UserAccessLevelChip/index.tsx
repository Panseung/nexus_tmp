import React from 'react';
import { UserAccessLevel } from '../../types/user.types';
import styles from './UserAccessLevelChip.module.scss';

interface UserAccessLevelChipProps {
  accessLevel: UserAccessLevel;
}

const UserAccessLevelChip: React.FC<UserAccessLevelChipProps> = ({
  accessLevel,
}) => {
  const getAccessLevelInfo = (level: UserAccessLevel) => {
    switch (level) {
      case UserAccessLevel.OWNER:
        return {
          label: '소유자',
          className: styles.owner,
        };
      case UserAccessLevel.MANAGER:
        return {
          label: '관리자',
          className: styles.manager,
        };
      case UserAccessLevel.NON_MANAGER:
        return {
          label: '일반',
          className: styles.nonManager,
        };
      default:
        return {
          label: '알 수 없음',
          className: styles.unknown,
        };
    }
  };

  const { label, className } = getAccessLevelInfo(accessLevel);

  return <span className={`${styles.chip} ${className}`}>{label}</span>;
};

export default UserAccessLevelChip;
