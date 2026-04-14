import { Deal } from '@/app/lib/types/deal.types';

export type DealMetrics = {
  paidCount: number;
  pendingCount: number;
  overdueCount: number;
  progressPct: number;
  daysRemaining: number | null;
  isOverdue: boolean;
};

export function computeDealMetrics(deal: Deal): DealMetrics {
  const paidCount = deal.payments.filter((p) => p.status === 'PAID').length;
  const pendingCount = deal.payments.filter(
    (p) => p.status === 'PENDING'
  ).length;
  const overdueCount = deal.payments.filter(
    (p) => p.status === 'OVERDUE'
  ).length;
  console.log(overdueCount);

  const progressPct =
    deal.agreedValue > 0
      ? Math.round((deal.paidValue / deal.agreedValue) * 100)
      : 0;

  const daysRemaining = deal.endDate
    ? Math.ceil((new Date(deal.endDate).getTime() - Date.now()) / 86_400_000)
    : null;

  const isOverdue = overdueCount > 0;

  return {
    paidCount,
    pendingCount,
    overdueCount,
    progressPct,
    daysRemaining,
    isOverdue,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDealDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
