import { ExpenseFormValues } from '@/app/lib/types/expense.types';

export function validateExpense(form: ExpenseFormValues): string | null {
  // CATEGORY
  if (!form.categoryName) return 'Category name is required';
  if (!form.categoryType) return 'Category type is required';

  // ENTRY (always required)
  if (!form.entry?.amount) return 'Amount is required';
  if (Number(form.entry.amount) <= 0) return 'Amount must be greater than 0';

  if (!form.entry?.currency) return 'Currency is required';
  if (!form.entry?.status) return 'Status is required';
  if (!form.entry?.paidAt) return 'Paid date is required';

  // STREAM (only if recurring)
  if (form.isRecurring) {
    if (!form.stream) return 'Recurring details are required';

    if (!form.stream.name) return 'Stream name is required';
    if (!form.stream.frequency) return 'Frequency is required';

    if (!form.stream.interval || form.stream.interval <= 0)
      return 'Interval must be greater than 0';

    if (!form.stream.startDate) return 'Start date is required';

    if (!form.stream.baseAmount) return 'Base amount is required';

    if (Number(form.stream.baseAmount) <= 0)
      return 'Base amount must be greater than 0';

    if (!form.stream.currency) return 'Stream currency is required';
  }

  return null;
}
