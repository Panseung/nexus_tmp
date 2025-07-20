import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.scss';

// 사이드바 메뉴 상수
export const SIDEBAR_MENUS = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: '🏠',
  },
  {
    id: 'users',
    label: 'Users',
    path: '/users',
    icon: '👥',
  },
  {
    id: 'events',
    label: 'Events',
    path: '/events',
    icon: '📅',
  },
  {
    id: 'communities',
    label: 'Communities',
    path: '/communities',
    icon: '🌐',
  },
  {
    id: 'logs',
    label: 'Logs',
    path: '/logs',
    icon: '📋',
  },
] as const;

// 환경 옵션
const ENVIRONMENT_OPTIONS = [
  { value: 'dev', label: 'Development', icon: '🔧' },
  { value: 'prod', label: 'Production', icon: '🚀' },
] as const;

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onMenuClick?: () => void;
}

const Sidebar = ({ isOpen, onToggle, onMenuClick }: SidebarProps) => {
  const location = useLocation();
  const [isEnvironmentOpen, setIsEnvironmentOpen] = useState(false);
  const [selectedEnvironment, setSelectedEnvironment] = useState<
    'dev' | 'prod'
  >('dev');

  const handleMenuClick = () => {
    // 모바일에서 메뉴 클릭 시 사이드바 자동으로 닫기
    if (window.innerWidth <= 768 && onMenuClick) {
      onMenuClick();
    }
  };

  const handleEnvironmentToggle = () => {
    setIsEnvironmentOpen(!isEnvironmentOpen);
  };

  const handleEnvironmentSelect = (env: 'dev' | 'prod') => {
    setSelectedEnvironment(env);
    setIsEnvironmentOpen(false);
    // TODO: 환경 변경 로직 구현
    console.log('Environment changed to:', env);
  };

  const currentEnvironment = ENVIRONMENT_OPTIONS.find(
    (option) => option.value === selectedEnvironment
  );

  return (
    <>
      {/* 오버레이 */}
      {isOpen && <div className={styles.overlay} onClick={onToggle} />}

      {/* 사이드바 */}
      <div
        className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Nexus</h2>
          <button
            className={styles.toggleButton}
            onClick={onToggle}
            aria-label={isOpen ? '사이드바 닫기' : '사이드바 열기'}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* 환경 선택 섹션 */}
        <div className={styles.environmentSection}>
          <button
            className={styles.environmentToggle}
            onClick={handleEnvironmentToggle}
            aria-label="환경 선택"
          >
            <span className={styles.environmentIcon}>
              {currentEnvironment?.icon}
            </span>
            <span className={styles.environmentLabel}>
              {currentEnvironment?.label}
            </span>
          </button>

          {isEnvironmentOpen && (
            <div className={styles.environmentDropdown}>
              {ENVIRONMENT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  className={`${styles.environmentOption} ${
                    selectedEnvironment === option.value ? styles.selected : ''
                  }`}
                  onClick={() =>
                    handleEnvironmentSelect(option.value as 'dev' | 'prod')
                  }
                >
                  <span className={styles.optionIcon}>{option.icon}</span>
                  <span className={styles.optionLabel}>{option.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className={styles.navigation}>
          <ul className={styles.menuList}>
            {SIDEBAR_MENUS.map((menu) => (
              <li key={menu.id} className={styles.menuItem}>
                <Link
                  to={menu.path}
                  className={`${styles.menuLink} ${
                    location.pathname === menu.path ? styles.active : ''
                  }`}
                  onClick={handleMenuClick}
                >
                  <span className={styles.icon}>{menu.icon}</span>
                  <span className={styles.label}>{menu.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
