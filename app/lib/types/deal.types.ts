// ── Enums ────────────────────────────────────────────────────────────────────

export type DealStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'CLOSED' | 'CANCELLED';

export type DealType = 'sponsorship' | 'affiliate' | 'licensing' | 'retainer';

export type OwnerType = 'org' | 'individual';

export type CounterpartyType = 'brand' | 'org' | 'individual';

export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export type RecurrenceInterval = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export type AmendmentReason =
  | 'VALUE_CHANGE' // rate hike / renegotiation
  | 'SCOPE_CHANGE' // more or less deliverables
  | 'EXTENSION' // end date pushed
  | 'EARLY_TERMINATION'
  | 'OTHER';

// ── Sub-types ─────────────────────────────────────────────────────────────────

export type Counterparty = {
  name: string;
  email: string;
  type: CounterpartyType;
  contactPhone: string | null;
};

export type Payment = {
  id: string;
  amount: number;
  currency: Currency;
  dueDate: string; // ISO date string
  paidAt: string | null; // null = not yet paid
  status: PaymentStatus;
  reference: string | null; // UTR / txn ID
};

export type Amendment = {
  id: string;
  reason: AmendmentReason;
  effectiveFrom: string; // ISO date — when new terms kick in
  previousAgreedValue: number;
  newAgreedValue: number;
  previousCycleAmount: number | null; // null if deal was one-time
  newCycleAmount: number | null; // null if deal is one-time
  changePct: number; // ((new - prev) / prev) * 100
  note: string | null;
  recordedAt: string; // ISO timestamp — when logged
};

export type Split = {
  dealId: string; // child deal id
  participantId: string; // usr- or org- id
  amount: number;
  label: string | null; // e.g. 'Creator 1 cut'
};

// ── Form values (strings for inputs, nulls for optional) ─────────────────────

export type DealFormValues = {
  // identity
  title: string;
  dealType: DealType | '';
  status: DealStatus;

  // parties
  userOwnerId?: string | null;
  orgOwnerId?: string | null;

  counterparty: {
    name: string;
    email: string;
    type: CounterpartyType | '';
    contactPhone: string | null;
  };

  parentDealId: string | null;

  // financials
  currency: Currency;
  agreedValue: string; // string for input, parse on submit
  cycleAmount: string; // for recurring deal payments

  // schedule
  isRecurring: boolean;
  recurrenceInterval: RecurrenceInterval | null; // null when not recurring

  startDate: string;
  endDate: string | null; // null = open-ended deal

  // notes
  notes: string | null;
};

// ── Full deal (what lives in DB / returned from API) ──────────────────────────

export type Deal = {
  // identity
  id: string;
  title: string;
  dealType: DealType;
  status: DealStatus;

  // ownership
  ownerId: string;
  ownerType: OwnerType;

  // parties
  counterparty: Counterparty; // full object, not string
  parentDealId: string | null;

  // financials — current terms (always reflects latest amendment)
  currency: Currency;
  agreedValue: number;
  cycleAmount: number | null; // per-cycle amount for recurring; null for one-time
  paidValue: number; // sum of payments where status === 'PAID'
  outstandingValue: number; // agreedValue - paidValue (computed)

  // fan-out
  splits: Split[]; // empty array = leaf deal, no children
  totalCommitted: number; // sum of splits[].amount (computed)
  margin: number; // agreedValue - totalCommitted (computed)
  marginPct: number; // (margin / agreedValue) * 100 (computed)

  // schedule
  isRecurring: boolean;
  recurrenceInterval: RecurrenceInterval | null;
  nextPaymentDate: string | null;

  // ledger
  payments: Payment[];
  amendments: Amendment[];

  // dates
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;

  // near future
  invoiceId: string | null;
  contractUrl: string | null;
  notes: string | null;
};
