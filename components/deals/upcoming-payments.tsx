'use client';

import { formatDealCardDate } from '@/app/lib/constants/deals';
import { Deal } from '@/app/lib/types/deal.types';

type Props = {
  deals: Deal[];
};

export const UpcomingPayments = ({ deals }: Props) => {
  const upcoming = deals
    .filter((d) => d.nextPaymentDate)
    .sort(
      (a, b) =>
        new Date(a.nextPaymentDate!).getTime() -
        new Date(b.nextPaymentDate!).getTime()
    )
    .slice(0, 5);

  return (
    <div className="bg-background border-border rounded-2xl border p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Payments</h2>
      </div>

      <div className="space-y-3">
        {upcoming.length === 0 && (
          <p className="text-muted-foreground text-sm">No upcoming payments</p>
        )}

        {upcoming.map((deal) => (
          <div
            key={deal.id}
            className="bg-surface/30 hover:bg-surface/60 border-border flex items-center justify-between rounded-xl border p-4 transition"
          >
            <div className="space-y-1">
              <p className="font-medium">{deal.title}</p>
              <p className="text-muted-foreground text-xs">
                {Object.entries(deal.counterparty)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(' • ')}
              </p>
            </div>

            <div className="text-right">
              <p className="text-muted-foreground text-xs">Due</p>
              <p className="text-sm font-semibold">
                {formatDealCardDate(deal.nextPaymentDate!)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
