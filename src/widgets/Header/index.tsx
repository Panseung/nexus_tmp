import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarStore } from '../../app/store';
import ThemeToggle from '../../shared/ui/ThemeToggle';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const location = useLocation();
  const { toggle: toggleSidebar } = useSidebarStore();

  // 현재 페이지명을 가져오는 함수
  const getCurrentPageName = () => {
    const path = location.pathname;
    switch (path) {
      case '/':
        return 'Home';
      case '/users':
        return 'Users';
      case '/events':
        return 'Events';
      case '/communities':
        return 'Communities';
      case '/logs':
        return 'Logs';
      default:
        return 'Home';
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <button
            className={styles.sidebarToggle}
            onClick={toggleSidebar}
            aria-label="사이드바 토글"
          >
            ☰
          </button>
          <Link to="/" className={styles.logo}>
            Nexus
          </Link>
        </div>
        <div className={styles.centerSection}>
          <h1 className={styles.pageTitle}>{getCurrentPageName()}</h1>
        </div>
        <div className={styles.rightSection}>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
