import React, { useEffect } from 'react';
import { useLanguageStore } from '../store';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { language } = useLanguageStore();

  useEffect(() => {
    // HTML 요소에 data-language 속성 설정
    document.documentElement.setAttribute('data-language', language);
    // HTML lang 속성도 설정
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return <>{children}</>;
};

export default LanguageProvider;
