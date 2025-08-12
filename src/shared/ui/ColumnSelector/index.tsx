import React from 'react';
import styles from './ColumnSelector.module.scss';

export type ColumnOption<TKey extends string> = {
  key: TKey;
  label: string;
};

interface ColumnSelectorProps<TKey extends string> {
  options: ColumnOption<TKey>[];
  value: Record<TKey, boolean>;
  onChange: (next: Record<TKey, boolean>) => void;
  title?: string;
}

function ColumnSelector<TKey extends string>({
  options,
  value,
  onChange,
  title,
}: ColumnSelectorProps<TKey>) {
  const toggle = (k: TKey) => {
    const next: Record<TKey, boolean> = { ...value };
    next[k] = !value[k];
    onChange(next);
  };

  const allOn = options.every((o) => value[o.key]);
  const setAll = (on: boolean) => {
    const next = options.reduce<Record<TKey, boolean>>(
      (acc, cur) => {
        acc[cur.key] = on;
        return acc;
      },
      {} as Record<TKey, boolean>
    );
    onChange(next);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>{title || 'Columns'}</span>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.link}
            onClick={() => setAll(true)}
            disabled={allOn}
          >
            All
          </button>
          <span className={styles.sep}>·</span>
          <button
            type="button"
            className={styles.link}
            onClick={() => setAll(false)}
            disabled={!allOn}
          >
            None
          </button>
        </div>
      </div>
      <ul className={styles.list}>
        {options.map(({ key, label }) => (
          <li key={key} className={styles.item}>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={!!value[key]}
                onChange={() => toggle(key)}
              />
              <span>{label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ColumnSelector;
