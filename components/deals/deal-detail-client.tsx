'use client';

import { formatDate } from '@/app/lib/constants';
import { useDealByIdQuery } from '@/hooks/deals/useDealQuery';
import { Button } from '../ui/button';
import { Loader } from '../ui/loader';
import { useRouter } from 'next/navigation';

const DealDetailClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: deal, isLoading } = useDealByIdQuery(id);
  // console.log("deal", deal);
  if (isLoading) return <div className="flex justify-center py-10"><Loader /></div>;
  if (!deal) return <div className="text-center py-10">No Deal Found</div>;

  return (<div className="mx-auto max-w-6xl space-y-8 p-6">

    {/* HEADER */}
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold">{deal.title}</h1>
        <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {deal.status}
        </span>
      </div>

      <div className="flex gap-3">
        <Button variant="outlined">Edit</Button>
        <Button onClick={() => router.push(`/dashboard/deals/${id}/splits/new`)}>
          + Split
        </Button>
        <Button variant="secondary" onClick={() => router.push(`/dashboard/deals/${id}/amendments/new`)}>
          + Amendment
        </Button>
      </div>
    </div>

    {/* SUMMARY CARDS */}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card label="Agreed Value" value={`₹${deal.agreedValue}`} />
      <Card label="Paid Value" value={`₹${deal.paidValue}`} />
      <Card label="Cycle Amount" value={`₹${deal.cycleAmount}`} />
    </div>

    {/* DETAILS */}
    <Section title="Deal Details">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Info label="Type" value={deal.dealType} />
        <Info label="Recurring" value={deal.isRecurring ? 'Yes' : 'No'} />
        <Info label="Start Date" value={formatDate(deal.startDate)} />
        <Info label="End Date" value={formatDate(deal.endDate)} />
        <Info label="Next Payment" value={formatDate(deal.nextPaymentDate)} />
        <Info label="Currency" value={deal.currency} />
      </div>
    </Section>

    {/* COUNTERPARTY */}
    <Section title="Counterparty">
      <div className="space-y-1">
        <p className="font-medium">{deal.counterPartyName}</p>
        <p className="text-sm text-muted-foreground">{deal.counterPartyEmail}</p>
        <p className="text-sm">{deal.counterPartyType}</p>
      </div>
    </Section>

    {/* PAYMENTS */}
    <Section title="Payments">
      <div className="overflow-hidden rounded-lg border">
        {deal.payments?.map((p: { status: string, paidAt: string, dueDate: string, amount: number }, i: number) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center border-b px-4 py-3 text-sm last:border-none"
          >
            <span className="font-medium">#{i + 1}</span>
            <span>{p.status}</span>
            {/* <span>{formatDate(p.paidAt)}</span> */}
            <span>{formatDate(p.dueDate)}</span>
            <span className="font-semibold">₹{p.amount}</span>
          </div>
        ))}
      </div>
    </Section>

    {/* SPLITS */}
    <Section title="Splits">
      <div className="overflow-hidden rounded-lg border">
        {deal.splits?.map((split: any, i: number) => (
          <div
            key={i}
            className="grid grid-cols-5 items-center border-b px-4 py-3 text-sm last:border-none"
          >
            <span className="font-medium">#{i + 1}</span>
            <span>{split.label}</span>
            <span>₹{split.agreedValue}</span>
            <span>₹{split.cycleAmount}</span>
            <span className="text-xs text-muted-foreground">
              {split.participantId}
            </span>
          </div>
        ))}
      </div>
    </Section>

  </div>
  );
};

export default DealDetailClient;

/* REUSABLE COMPONENTS */

const Section = ({ title, children }: any) => (

  <div className="space-y-3 rounded-xl border p-4">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </div>
);

const Card = ({ label, value }: { label: string; value: string }) => (

  <div className="rounded-xl border p-4 shadow-sm">
    <p className="text-muted-foreground text-sm">{label}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

const Info = ({ label, value }: { label: string; value: string }) => (

  <div className="rounded-lg border p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
