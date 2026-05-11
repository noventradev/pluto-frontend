export const INCOME_SOURCES = [
  'YOUTUBE',
  'TWITCH',
  'SPONSOR',
  'TOURNAMENT',
  'SALARY',
  'OTHER',
] as const;

export const INCOME_TYPES = [
  'ONE_TIME',
  'RECURRING',
  'CONTRACT',
] as const;

export const INCOME_FREQUENCIES = [
  'DAILY',
  'WEEKLY',
  'MONTHLY',
  'YEARLY',
  'ONE_TIME',
] as const;

export const INCOME_STATUS = [
  'PENDING',
  'RECEIVED',
] as const;

export const CURRENCIES = ['INR', 'USD', 'GBP'] as const;
