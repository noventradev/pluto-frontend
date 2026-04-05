import {
  DealType,
  DealStatus,
  CounterpartyType,
  RecurrenceInterval,
} from '@/app/lib/types/deal.types';

export const DEAL_TYPE_OPTIONS: { label: string; value: DealType }[] = [
  { label: 'Sponsorship', value: 'sponsorship' },
  { label: 'Affiliate', value: 'affiliate' },
  { label: 'Licensing', value: 'licensing' },
  { label: 'Retainer', value: 'retainer' },
];

export const DEAL_STATUS_OPTIONS: { label: string; value: DealStatus }[] = [
  { label: 'Draft', value: 'DRAFT' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Paused', value: 'PAUSED' },
  { label: 'Closed', value: 'CLOSED' },
];

export const COUNTERPARTY_TYPE_OPTIONS: {
  label: string;
  value: CounterpartyType;
}[] = [
  { label: 'Brand', value: 'brand' },
  { label: 'Organization', value: 'org' },
  { label: 'Individual', value: 'individual' },
];

export const RECURRENCE_INTERVAL_OPTIONS: {
  label: string;
  value: RecurrenceInterval;
}[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
];

export const formatDealCardDate = (date: string | Date) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(date));
