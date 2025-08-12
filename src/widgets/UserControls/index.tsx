import React, { useState } from 'react';
import ColumnSelector, { ColumnOption } from '../../shared/ui/ColumnSelector';
import styles from './UserControls.module.scss';

interface LabelsProps {
  searchPlaceholder: string;
  totalLabel: string; // e.g., users, communities, events
  perPageLabel: string; // e.g., 페이지당:, Per page:
}

interface UserControlsProps<ColKey extends string = string> {
  search: string;
  onSearchChange: (search: string) => void;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  labels: LabelsProps;
  // optional column selector
  columnOptions?: ColumnOption<ColKey>[];
  columnVisibility?: Record<ColKey, boolean>;
  onChangeColumnVisibility?: (next: Record<ColKey, boolean>) => void;
  columnSelectorTitle?: string;
}

const UserControls = <ColKey extends string = string>({
  search,
  onSearchChange,
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  labels,
  columnOptions,
  columnVisibility,
  onChangeColumnVisibility,
  columnSelectorTitle,
}: UserControlsProps<ColKey>) => {
  const [showColumnSelector, setShowColumnSelector] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPageSizeChange(Number(e.target.value));
  };

  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const showSelector =
    !!columnOptions && !!columnVisibility && !!onChangeColumnVisibility;

  return (
    <div className={styles.container}>
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder={labels.searchPlaceholder}
            value={search}
            onChange={handleSearchChange}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>

      <div className={styles.paginationSection}>
        <div className={styles.pageInfo}>
          <span>
            {totalItems > 0 ? `${startItem}-${endItem}` : '0'} / {totalItems}{' '}
            {labels.totalLabel}
          </span>
        </div>

        <div className={styles.pageSizeContainer}>
          <label htmlFor="pageSize">{labels.perPageLabel}</label>
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

        {showSelector && (
          <div className={styles.paginationColumnControl}>
            <button
              className={styles.columnButton}
              onClick={() => setShowColumnSelector(!showColumnSelector)}
              title={columnSelectorTitle || 'Columns'}
              type="button"
            >
              ⚙️
            </button>
            {showColumnSelector && (
              <div className={styles.paginationColumnSelectorWrapper}>
                <ColumnSelector
                  options={columnOptions as ColumnOption<string>[]}
                  value={columnVisibility as Record<string, boolean>}
                  onChange={(next) =>
                    onChangeColumnVisibility!(next as Record<ColKey, boolean>)
                  }
                  title={columnSelectorTitle}
                />
              </div>
            )}
          </div>
        )}

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
              className={`${styles.pageButton} ${page === currentPage ? styles.active : ''} ${page === '...' ? styles.ellipsis : ''}`}
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
