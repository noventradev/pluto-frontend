import { formatDate } from '../../app/lib/constants';
import { Income, IncomeStatus } from '../../app/lib/types/income.types';
import { Column } from '../../app/lib/types/table.types';

export const incomeColumns: Column<Income>[] = [
  {
    key: 'source',
    id: 'source-name',
    label: 'Source',
    render: (_, row) => row.source.name,
  },
  {
    key: 'source',
    id: 'source-type',
    label: 'Type',
    render: (_, row) => (
      <span className="bg-muted/30 rounded-full px-2 py-0.5 text-xs font-medium capitalize">
        {(row.source.sourceOfIncome as string).toLowerCase()}
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
    id: 'entry-amount',
    key: 'entry',
    label: 'Amount',
    render: (_, row) => `${row.entry.currency} ${row.entry.actualAmount}`,
  },
  {
    id: 'entry-status',
    key: 'entry',
    label: 'Status',
    render: (_, row) => {
      const styles: Record<IncomeStatus, string> = {
        RECEIVED: 'bg-green-100 text-green-700',
        PENDING: 'bg-yellow-100 text-yellow-700',
      };
      return (
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${styles[row.entry.status]}`}
        >
          {row.entry.status}
        </span>
      );
    },
  },
  {
    id: 'entry-date',
    key: 'entry',
    label: 'Date',
    render: (_, row) => (row.entry.date ? formatDate(row.entry.date) : '—'),
  },
  {
    key: 'stream',
    label: 'Frequency',
    render: (_, row) =>
      row.isRecurring && row.stream?.frequency ? (
        <span className="text-xs">
          Every {row.stream.interval || 1} {row.stream.frequency.toLowerCase()}
        </span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
];
