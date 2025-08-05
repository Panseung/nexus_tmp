import React from 'react';
import { useColumnStore } from '../../../app/store';
import { useTranslation } from '../../lib/i18n';
import styles from './ColumnSelector.module.scss';

const ColumnSelector: React.FC = () => {
  const { columns, toggleColumn, resetColumns } = useColumnStore();
  const { t } = useTranslation();

  const columnOptions = [
    { key: 'name' as const, label: t('users.name') },
    { key: 'email' as const, label: t('users.email') },
    { key: 'handle' as const, label: t('users.handle') },
    { key: 'level' as const, label: t('users.accessLevel') },
    { key: 'role' as const, label: t('users.role') },
    { key: 'lastLogin' as const, label: t('users.lastLogin') },
    { key: 'status' as const, label: t('users.status') },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>{t('users.columnSettings')}</h3>
        <button
          className={styles.resetButton}
          onClick={resetColumns}
          title={t('users.resetColumns')}
        >
          {t('users.reset')}
        </button>
      </div>
      <div className={styles.options}>
        {columnOptions.map(({ key, label }) => (
          <label key={key} className={styles.option}>
            <input
              type="checkbox"
              checked={columns[key]}
              onChange={() => toggleColumn(key)}
            />
            <span className={styles.label}>{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColumnSelector;
