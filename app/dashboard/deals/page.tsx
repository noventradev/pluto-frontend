'use client';

import { ActiveDealsList } from '@/components/deals/deal-list';
import { DealStats } from '@/components/deals/deal-stats';
import { UpcomingPayments } from '@/components/deals/upcoming-payments';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Loader } from '@/components/ui/loader';
import { useDealQuery } from '@/hooks/deals/useDealQuery';
import { useRouter } from 'next/navigation';

const DealPage = () => {
  const router = useRouter();
  const { data: deals = [], isLoading } = useDealQuery();

  if (isLoading) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deals & Contracts</h1>
          <p className="text-muted-foreground text-sm">
            Track and manage all your contracts, deals, sponsorships, and collaborations
          </p>
        </div>
        <Button onClick={() => router.push('deals/add')}>
          Add New Deal
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <DealStats deals={deals} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ActiveDealsList deals={deals} />
          <UpcomingPayments deals={deals} />
        </div>
      </div>
    </Container>
  );
};

export default DealPage;
