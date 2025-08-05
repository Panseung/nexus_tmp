import React from 'react';
import { useLanguageStore } from '../../../app/store';
import styles from './LanguageToggle.module.scss';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      className={styles.languageToggle}
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'ko' ? 'English' : '한국어'}`}
      title={`Switch to ${language === 'ko' ? 'English' : '한국어'}`}
    >
      <span className={styles.languageText}>
        {language === 'ko' ? 'EN' : '한'}
      </span>
    </button>
  );
};

export default LanguageToggle;
