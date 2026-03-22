import { formatDate } from '@/app/lib/constants';
import { Expense } from '../types/expense.types';
import { Column } from '../types/table.types';

export const expenseColumns: Column<Expense>[] = [
  {
    key: 'category',
    label: 'Category',
  },
  {
    key: 'date',
    label: 'Expense Date',
    render: (value) => formatDate(value as string),
  },
  {
    key: 'createdAt',
    label: 'Created At',
    render: (value) => formatDate(value as string),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => `₹ ${value}`,
  },
];
