import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ColumnConfig {
  name: boolean;
  email: boolean;
  handle: boolean;
  level: boolean;
  role: boolean;
  lastLogin: boolean;
  status: boolean;
}

interface ColumnState {
  columns: ColumnConfig;
  toggleColumn: (column: keyof ColumnConfig) => void;
  resetColumns: () => void;
}

const defaultColumns: ColumnConfig = {
  name: true,
  email: true,
  handle: true,
  level: true,
  role: true,
  lastLogin: true,
  status: true,
};

export const useColumnStore = create<ColumnState>()(
  persist(
    (set) => ({
      columns: defaultColumns,
      toggleColumn: (column) =>
        set((state) => ({
          columns: {
            ...state.columns,
            [column]: !state.columns[column],
          },
        })),
      resetColumns: () => set({ columns: defaultColumns }),
    }),
    {
      name: 'column-config',
    }
  )
);
