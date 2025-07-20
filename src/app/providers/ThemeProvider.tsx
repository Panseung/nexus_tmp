import React, { useEffect } from 'react';
import { useThemeStore } from '../store';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const { theme } = useThemeStore();

  useEffect(() => {
    // HTML 요소에 data-theme 속성 설정
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
