import { IncomeFormValues } from '../types/income.types';

export function validateIncome(form: IncomeFormValues): string | null {
  // SOURCE
  if (!form.source?.sourceOfIncome) return 'Source of income is required';
  if (!form.source?.name) return 'Name of income project/source is required';
  if (!form.source?.type) return 'Type of income is required';

  // ENTRY (always required)
  if (!form.entry?.date) return 'Income date is required';
  if (!form.entry?.actualAmount) return 'Actual amount is required';
  if (Number(form.entry.actualAmount) <= 0) return 'Actual amount must be greater than 0';

  // STREAM (only if recurring)
  if (form.isRecurring) {
    if (!form.stream) return 'Recurring stream details are required';

    if (!form.stream.startDate) return 'Stream start date is required';
    if (!form.stream.frequency) return 'Stream frequency is required';
    if (!form.stream.baseAmount) return 'Stream base amount is required';
    if (Number(form.stream.baseAmount) <= 0) return 'Stream base amount must be greater than 0';
    if (!form.stream.currency) return 'Stream currency is required';
    
    if (form.stream.endDate && new Date(form.stream.endDate) < new Date(form.stream.startDate)) {
      return 'End date must be after start date';
    }
  }

  return null;
}
