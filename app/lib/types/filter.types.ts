export type ExpenseFilters = {
  dateFilter: 'latest' | 'currentMonth' | 'last90' | 'custom';
  search: string;
  sortBy: string;
  order: 'asc' | 'desc';
  fromDate: string | null;
  toDate: string | null;
  page: number;
  pageSize: number;
};

export const defaultExpenseFilters: ExpenseFilters = {
  dateFilter: 'latest',
  search: '',
  sortBy: 'createdAt',
  order: 'desc',
  fromDate: null,
  toDate: null,
  page: 1,
  pageSize: 10,
};
