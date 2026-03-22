import { ExpenseFormValues } from '@/app/lib/types/expense.types';

export interface FetchExpenseParams {
  page: number;
  pageSize: number;
  sortBy: string;
  order: 'asc' | 'desc';
  search: string;
  from: string | null;
  to: string | null;
}

export async function fetchExpenses(params: FetchExpenseParams) {
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('No user');

  const query = new URLSearchParams({
    page: String(params.page),
    pageSize: String(params.pageSize),
    sortBy: params.sortBy,
    order: params.order,
    search: params.search,
  });

  if (params.from && params.to) {
    query.append('from', params.from);
    query.append('to', params.to);
  }

  const res = await fetch(`/api/expense?${query.toString()}`, {
    headers: { 'user-id': userId },
  });

  if (!res.ok) throw new Error('Failed to fetch');

  return res.json();
}

export const createExpense = async (data: ExpenseFormValues) => {
  console.log(data);
  const userId = localStorage.getItem('userId');
  if (!userId) throw new Error('No user');

  const res = await fetch('/api/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to create expense');

  return res.json();
};
