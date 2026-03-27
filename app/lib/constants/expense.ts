export const EXPENSE_CATEGORIES = [
  'salary',
  'rent',
  'food',
  'entertainment',
  'other',
] as const;

export const EXPENSE_STATUS_OPTIONS = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Paid', value: 'PAID' },
  { label: 'Cancelled', value: 'CANCELLED' },
] as const;

export const EXPENSE_FREQUENCIES = [
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'annually',
] as const;

export const EXPENSE_CURRENCIES = [
  { label: 'USD ($)', value: 'USD' },
  { label: 'INR (₹)', value: 'INR' },
  { label: 'EUR (€)', value: 'EUR' },
] as const;
