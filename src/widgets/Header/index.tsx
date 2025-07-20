import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebarStore } from '../../app/store';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const location = useLocation();
  const { toggle: toggleSidebar } = useSidebarStore();

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
        <ul className={styles.navList}>
          <li>
            <Link
              to="/"
              className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`${styles.navLink} ${location.pathname === '/users' ? styles.active : ''}`}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className={`${styles.navLink} ${location.pathname === '/events' ? styles.active : ''}`}
            >
              Events
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
