import { Deal } from '@/app/lib/types/deal.types';

type Props = {
  deals: Deal[];
};

export const DealStats = ({ deals }: Props) => {
  const activeDeals = deals.filter((d) => d.status === 'ACTIVE');
  const totalEarnings = deals.reduce((acc, d) => acc + Number(d.paidValue), 0);
  const recurringDeals = deals.filter((d) => d.isRecurring);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div className="border-border rounded-xl border p-4">
        <p className="text-muted-foreground text-sm">Active Deals</p>
        <p className="text-2xl font-semibold">{activeDeals.length}</p>
      </div>

      <div className="border-border rounded-xl border p-4">
        <p className="text-muted-foreground text-sm">Total Earnings</p>
        <p className="text-2xl font-semibold">₹{totalEarnings}</p>
      </div>

      <div className="border-border rounded-xl border p-4">
        <p className="text-muted-foreground text-sm">Recurring Deals</p>
        <p className="text-2xl font-semibold">{recurringDeals.length}</p>
      </div>
    </div>
  );
};
