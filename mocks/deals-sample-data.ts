import { Deal } from '@/app/lib/types/deal.types';

export const mockDeals: Deal[] = [
  {
    id: 'deal-2',
    title: 'IPL Campaign - Jio',
    dealType: 'retainer',
    status: 'ACTIVE',

    ownerId: 'org-2',
    ownerType: 'org',

    counterparty: {
      name: 'Jio',
      email: 'partnerships@jio.com',
      type: 'brand', // Jio is paying — they're the brand, not an org on Pluto
      contactPhone: null,
    },

    parentDealId: null,

    currency: 'INR',
    agreedValue: 2000000, // ₹20,00,000 total — 12 months
    cycleAmount: 166667, // ₹1,66,667/month (166667 × 12 ≈ 20,00,000)
    paidValue: 333334, // 2 months paid
    outstandingValue: 1666666, // agreedValue - paidValue

    splits: [
      {
        dealId: 'deal-2-split-A', // child deal for org-1
        participantId: 'org-1',
        amount: 800000, // org-1 gets ₹8,00,000 of the ₹20L
        label: 'Org 1 cut',
      },
      {
        dealId: 'deal-2-split-B', // child deal for org-2 internal
        participantId: 'org-2',
        amount: 900000, // org-2 retains ₹9,00,000
        label: 'Org 2 retained',
      },
    ],

    totalCommitted: 1700000, // 800k + 900k
    margin: 300000, // 2000000 - 1700000
    marginPct: 15, // (300000 / 2000000) * 100

    isRecurring: true,
    recurrenceInterval: 'monthly',
    nextPaymentDate: '2026-05-01',

    payments: [
      {
        id: 'pay-2-1',
        amount: 166667,
        currency: 'INR',
        dueDate: '2026-03-01',
        paidAt: '2026-03-01T10:22:00Z',
        status: 'PAID',
        reference: 'UTR2026030100441',
      },
      {
        id: 'pay-2-2',
        amount: 166667,
        currency: 'INR',
        dueDate: '2026-04-01',
        paidAt: '2026-04-02T09:10:00Z', // paid one day late
        status: 'PAID',
        reference: 'UTR2026040200812',
      },
      {
        id: 'pay-2-3',
        amount: 166667, // this month — rate changed, still pending
        currency: 'INR',
        dueDate: '2026-05-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-4',
        amount: 183334, // new rate after amendment kicks in
        currency: 'INR',
        dueDate: '2026-06-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-5',
        amount: 183334,
        currency: 'INR',
        dueDate: '2026-07-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-6',
        amount: 183334,
        currency: 'INR',
        dueDate: '2026-08-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-7',
        amount: 183334,
        currency: 'INR',
        dueDate: '2026-09-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-8',
        amount: 183334,
        currency: 'INR',
        dueDate: '2026-10-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-9',
        amount: 183334,
        currency: 'INR',
        dueDate: '2026-11-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-10',
        amount: 183334,
        currency: 'INR',
        dueDate: '2026-12-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-11',
        amount: 183334,
        currency: 'INR',
        dueDate: '2027-01-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
      {
        id: 'pay-2-12',
        amount: 183334,
        currency: 'INR',
        dueDate: '2027-02-01',
        paidAt: null,
        status: 'PENDING',
        reference: null,
      },
    ],

    amendments: [
      {
        id: 'amd-2-1',
        reason: 'VALUE_CHANGE',
        effectiveFrom: '2026-06-01', // new rate from June
        previousAgreedValue: 2000000,
        newAgreedValue: 2166668, // 333334 paid + 166667 (May, old) + 7 × 183334 (Jun–Feb)
        previousCycleAmount: 166667,
        newCycleAmount: 183334, // ~10% raise
        changePct: 10,
        note: 'Mid-season rate revision +10%',
        recordedAt: '2026-04-28T11:00:00Z',
      },
      {
        id: 'amd-2-2',
        reason: 'EXTENSION',
        effectiveFrom: '2027-02-01', // original end was Feb, pushed to Apr
        previousAgreedValue: 2166668,
        newAgreedValue: 2533336, // + 2 more months at 183334
        previousCycleAmount: 183334,
        newCycleAmount: 183334, // same rate, just extended
        changePct: 0,
        note: 'Contract extended by 2 months due to campaign performance',
        recordedAt: '2027-01-15T09:30:00Z',
      },
    ],

    startDate: '2026-03-01',
    endDate: '2027-04-01', // updated after extension amendment
    createdAt: '2026-02-20T08:00:00Z',
    updatedAt: '2027-01-15T09:30:00Z', // last updated when extension was logged

    invoiceId: null,
    contractUrl: null,
    notes: 'IPL season campaign — rate revised in April, extended in January',
  },
];
