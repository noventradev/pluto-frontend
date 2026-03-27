import { formatDate } from '../../app/lib/constants';
import { Expense, ExpenseStatus } from '../../app/lib/types/expense.types';
import { Column } from '../../app/lib/types/table.types';

export const expenseColumns: Column<Expense>[] = [
  {
    key: 'categoryName',
    label: 'Category',
  },
  {
    key: 'categoryType',
    label: 'Type',
    render: (value) => (
      <span className="bg-muted/30 rounded-full px-2 py-0.5 text-xs font-medium capitalize">
        {(value as string).toLowerCase()}
      </span>
    ),
  },
  {
    key: 'isRecurring',
    label: 'Recurring',
    render: (value) =>
      value ? (
        <span className="text-xs font-medium text-blue-500">Recurring</span>
      ) : (
        <span className="text-muted-foreground text-xs">One-time</span>
      ),
  },
  {
    id: 'entry-amount', // ← id prevents key clash
    key: 'entry',
    label: 'Amount',
    render: (_, row) => `${row.entry.currency} ${row.entry.amount}`,
  },
  {
    id: 'entry-status',
    key: 'entry',
    label: 'Status',
    render: (_, row) => {
      const styles: Record<ExpenseStatus, string> = {
        PAID: 'bg-green-100 text-green-700',
        PENDING: 'bg-yellow-100 text-yellow-700',
        CANCELLED: 'bg-red-100 text-red-700',
      };
      return (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[row.entry.status]}`}
        >
          {row.entry.status}
        </span>
      );
    },
  },
  {
    id: 'entry-paidat',
    key: 'entry',
    label: 'Paid At',
    render: (_, row) => (row.entry.paidAt ? formatDate(row.entry.paidAt) : '—'),
  },
  {
    key: 'stream',
    label: 'Frequency',
    render: (_, row) =>
      row.stream ? (
        <span className="text-xs">
          Every {row.stream.interval} {row.stream.frequency.toLowerCase()}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: 'createdAt',
    label: 'Created',
    render: (value) => formatDate(value as string),
  },
];
