import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSidebarStore, useAuthStore } from '../../app/store';
import { signOut } from '../../shared/api/auth.api';
import ThemeToggle from '../../shared/ui/ThemeToggle';
import LanguageToggle from '../../shared/ui/LanguageToggle';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toggle: toggleSidebar } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      logout();
      navigate('/signin');
    } catch (error) {
      console.error('로그아웃 실패:', error);
      // 에러가 발생해도 로컬 상태는 클리어
      logout();
      navigate('/signin');
    }
  };

  // 사용자 메뉴 외부 클릭 시 메뉴 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(`.${styles.userSection}`)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

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
          <LanguageToggle />
          <ThemeToggle />
          <div className={styles.userSection}>
            <button
              className={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className={styles.userName}>
                {user?.name || user?.email}
              </span>
              <span className={styles.userIcon}>👤</span>
            </button>
            {showUserMenu && (
              <div className={styles.userMenu}>
                <div className={styles.userInfo}>
                  <span className={styles.userEmail}>{user?.email}</span>
                </div>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
