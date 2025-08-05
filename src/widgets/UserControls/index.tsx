import React, { useState } from 'react';
import { useTranslation } from '../../shared/lib/i18n';
import ColumnSelector from '../../shared/ui/ColumnSelector';
import styles from './UserControls.module.scss';

interface UserControlsProps {
  search: string;
  onSearchChange: (search: string) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const UserControls: React.FC<UserControlsProps> = ({
  search,
  onSearchChange,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) => {
  const { t } = useTranslation();
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={t('users.searchPlaceholder')}
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
          <button
            className={styles.columnButton}
            onClick={() => setShowColumnSelector(!showColumnSelector)}
            title={t('users.columnSettings')}
          >
            ⚙️
          </button>
        </div>
        {showColumnSelector && (
          <div className={styles.columnSelectorWrapper}>
            <ColumnSelector />
          </div>
        )}
      </div>

      <div className={styles.paginationSection}>
        <div className={styles.pageInfo}>
          <span>
            {totalItems > 0 ? `${startItem}-${endItem}` : '0'} / {totalItems}{' '}
            {t('users.totalUsers')}
          </span>
        </div>

        <div className={styles.pageSizeContainer}>
          <label htmlFor="pageSize">{t('users.usersPerPage')}</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className={styles.pageSizeSelect}
          >
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className={styles.pagination}>
          <button
            className={`${styles.pageButton} ${styles.prevButton}`}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ←
          </button>

          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`${styles.pageButton} ${
                page === currentPage ? styles.active : ''
              } ${page === '...' ? styles.ellipsis : ''}`}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
            >
              {page}
            </button>
          ))}

          <button
            className={`${styles.pageButton} ${styles.nextButton}`}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserControls;
