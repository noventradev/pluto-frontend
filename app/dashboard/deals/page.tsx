'use client';

import { ActiveDealsList } from '@/components/deals/deal-list';
import { DealStats } from '@/components/deals/deal-stats';
import { UpcomingPayments } from '@/components/deals/upcoming-payments';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { mockDeals } from '@/mocks/deals-sample-data';
import { useRouter } from 'next/navigation';
import React from 'react';

const DealPage = () => {
  const router = useRouter();
  const deals = mockDeals;
  return (
    <Container>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Deals & Contracts</h1>
          <p className="text-muted-foreground text-sm">
            Track and manage all your
            contracts/deals/sponsorships/collaborations
          </p>
        </div>
        <Button onClick={() => router.push('deals/add')}>Add New Deal</Button>
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
