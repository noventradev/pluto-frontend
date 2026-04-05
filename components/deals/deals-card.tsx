// components/deals/deal-card.tsx
'use client';

import { Deal } from '@/app/lib/types/deal.types';
import {
  computeDealMetrics,
  formatINR,
  formatDealDate,
} from '@/app/lib/utitls/deal.utils';
import { cn } from '@/app/lib/utils';

const DEAL_TYPE_STYLES: Record<string, string> = {
  sponsorship:
    'bg-blue-50   text-blue-700  dark:bg-blue-950  dark:text-blue-300',
  affiliate:
    'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300',
  licensing:
    'bg-amber-50  text-amber-700  dark:bg-amber-950  dark:text-amber-300',
  retainer:
    'bg-teal-50   text-teal-700   dark:bg-teal-950   dark:text-teal-300',
};

type Props = {
  deal: Deal;
  onClick?: (id: string) => void;
};

export const DealCard = ({ deal, onClick }: Props) => {
  const m = computeDealMetrics(deal);

  const nextPayment = deal.payments.find(
    (p) => p.status === 'PENDING' || p.status === 'OVERDUE'
  );

  return (
    <div
      onClick={() => onClick?.(deal.id)}
      className={cn(
        'group bg-background border-border hover:border-border-secondary',
        'cursor-pointer rounded-xl border p-4 transition-all hover:shadow-sm'
      )}
    >
      {/* ── Row 1: title + badges + next payment ── */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1.5">
          {/* title + type badge + amended badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm leading-tight font-medium">
              {deal.title}
            </span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-[11px] font-medium',
                DEAL_TYPE_STYLES[deal.dealType] ??
                  'bg-muted text-muted-foreground'
              )}
            >
              {deal.dealType}
            </span>
            {deal.amendments.length > 0 && (
              <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                revised {deal.amendments.length}×
              </span>
            )}
          </div>

          {/* counterparty · dates · days remaining / overdue */}
          <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs">
            <span>{deal.counterparty.name}</span>
            <span className="opacity-40">·</span>
            <span>{formatDealDate(deal.startDate)}</span>
            {deal.endDate && (
              <>
                <span className="opacity-40">→</span>
                <span>{formatDealDate(deal.endDate)}</span>
              </>
            )}
            {m.daysRemaining !== null && (
              <>
                <span className="opacity-40">·</span>
                {m.isOverdue ? (
                  <span className="text-destructive font-medium">overdue</span>
                ) : m.daysRemaining <= 14 ? (
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {m.daysRemaining}d left
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {m.daysRemaining}d left
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        {/* next payment pill */}
        {nextPayment && (
          <div
            className={cn(
              'border-border shrink-0 rounded-lg border px-3 py-2 text-right',
              nextPayment.status === 'OVERDUE'
                ? 'border-destructive/30 bg-red-50 dark:bg-red-950'
                : 'bg-background'
            )}
          >
            <p className="text-muted-foreground mb-0.5 text-[10px] tracking-wide uppercase">
              next
            </p>
            <p className="text-sm font-medium">
              {formatINR(nextPayment.amount)}
            </p>
            <p
              className={cn(
                'text-[11px]',
                nextPayment.status === 'OVERDUE'
                  ? 'text-destructive'
                  : 'text-muted-foreground'
              )}
            >
              {formatDealDate(nextPayment.dueDate)}
              {nextPayment.status === 'OVERDUE' && ' · overdue'}
            </p>
          </div>
        )}
      </div>

      {/* ── Row 2: progress bar ── */}
      <div className="mb-3">
        <div className="text-muted-foreground mb-1.5 flex justify-between text-xs">
          <span>{formatINR(deal.paidValue)} paid</span>
          <span>
            {formatINR(deal.outstandingValue)} outstanding · {m.progressPct}%
          </span>
        </div>
        <div className="bg-border/40 h-1 w-full overflow-hidden rounded-full">
          <div
            className={cn(
              'h-full rounded-full transition-all',
              m.isOverdue ? 'bg-destructive' : 'bg-emerald-500'
            )}
            style={{ width: `${m.progressPct}%` }}
          />
        </div>
      </div>

      {/* ── Row 3: splits + payment counts ── */}
      <div className="border-border text-muted-foreground flex items-center justify-between border-t pt-2.5 text-[11px]">
        <div className="flex flex-wrap items-center gap-2">
          {deal.splits.length > 0 && (
            <>
              <span>
                {deal.splits.length} split{deal.splits.length > 1 ? 's' : ''}
                {' · '}
                {formatINR(deal.totalCommitted)} committed
                {' · '}
                {deal.marginPct}% margin
              </span>
              <span className="opacity-40">·</span>
            </>
          )}
          {m.overdueCount > 0 && (
            <span className="text-destructive font-medium">
              {m.overdueCount} overdue
            </span>
          )}
          {m.overdueCount === 0 && (
            <span>
              {m.paidCount} paid · {m.pendingCount} pending
            </span>
          )}
        </div>
        <span className="opacity-0 transition-opacity group-hover:opacity-100">
          View →
        </span>
      </div>
    </div>
  );
};
