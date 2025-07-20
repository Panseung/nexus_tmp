import React from 'react';
import { useThemeStore } from '../../../app/store';
import styles from './ThemeToggle.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <span className={styles.icon}>🌙</span>
      ) : (
        <span className={styles.icon}>☀️</span>
      )}
    </button>
  );
};

export default ThemeToggle;
