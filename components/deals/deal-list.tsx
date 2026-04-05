// components/deals/active-deals-list.tsx
'use client';

import { Deal } from '@/app/lib/types/deal.types';
import { DealCard } from '@/components/deals/deals-card';
import { Briefcase, CalendarClock } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  deals: Deal[];
};

export const ActiveDealsList = ({ deals }: Props) => {
  const router = useRouter();
  const activeDeals = deals.filter((d) => d.status === 'ACTIVE');

  const hasDeals = deals.length > 0;
  const hasActiveDeals = activeDeals.length > 0;

  return (
    <div className="bg-background border-border rounded-2xl border p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Active deals</h2>
        <span className="text-muted-foreground text-sm">
          {activeDeals.length} active
        </span>
      </div>

      {!hasDeals && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Briefcase className="text-muted-foreground mb-3" size={28} />
          <p className="text-sm font-medium">No deals yet</p>
          <p className="text-muted-foreground text-xs">
            Start by creating your first deal
          </p>
        </div>
      )}

      {hasDeals && !hasActiveDeals && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <CalendarClock className="text-muted-foreground mb-3" size={28} />
          <p className="text-sm font-medium">No active deals</p>
          <p className="text-muted-foreground text-xs">
            All your deals are inactive or completed
          </p>
        </div>
      )}

      {hasActiveDeals && (
        <div className="grid gap-3">
          {activeDeals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              onClick={(id) => router.push(`/deals/${id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
