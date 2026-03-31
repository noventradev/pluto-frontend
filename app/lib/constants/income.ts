export const INCOME_SOURCES = [
  'youtube',
  'twitch',
  'sponsor',
  'tournament',
  'salary',
  'other',
] as const;

export const INCOME_TYPES = [
  'one-time',
  'recurring',
] as const;

export const INCOME_FREQUENCIES = [
  'daily',
  'weekly',
  'monthly',
  'quarterly',
  'annually',
] as const;

export const INCOME_STATUS = [
  'pending',
  'received',
] as const;

export const CURRENCIES = ['INR', 'USD', 'EUR'] as const;
