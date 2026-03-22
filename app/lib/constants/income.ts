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

export type IncomeSource = (typeof INCOME_SOURCES)[number];
export type IncomeType = (typeof INCOME_TYPES)[number];
export type IncomeFrequency = (typeof INCOME_FREQUENCIES)[number];
export type IncomeStatus = (typeof INCOME_STATUS)[number];
export type Currency = (typeof CURRENCIES)[number];