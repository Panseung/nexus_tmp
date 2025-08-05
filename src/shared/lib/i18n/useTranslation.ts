import { useLanguageStore } from '../../../app/store';
import { translations, Translations } from './translations';

export const useTranslation = () => {
  const { language } = useLanguageStore();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const getCurrentLanguage = () => language;

  const getTranslations = (): Translations => translations[language];

  return {
    t,
    language,
    getCurrentLanguage,
    getTranslations,
  };
};
