// ── Enums ────────────────────────────────────────────────────────────────────

import z from "zod";
import { createDealSchema } from "../validators/deal.validators";

export const DEAL_STATUS = ['DRAFT', 'ACTIVE', 'PAUSED', 'CLOSED', 'CANCELLED'] as const;
export type DealStatus = typeof DEAL_STATUS[number];

export const DEAL_TYPE = ['sponsorship', 'affiliate', 'licensing', 'retainer'] as const;
export type DealType = typeof DEAL_TYPE[number];

export const OWNER_TYPE = ['org', 'individual'] as const;
export type OwnerType = typeof OWNER_TYPE[number];

export const COUNTERPARTY_TYPE = ['brand', 'org', 'individual'] as const;
export type CounterpartyType = typeof COUNTERPARTY_TYPE[number];

export const CURRENCY = ['INR', 'USD', 'EUR', 'GBP'] as const;
export type Currency = typeof CURRENCY[number];

export const RECURRENCE_INTERVAL = ['weekly', 'monthly', 'quarterly', 'yearly'] as const;
export type RecurrenceInterval = typeof RECURRENCE_INTERVAL[number];

export const PAYMENT_STATUS = ['PENDING', 'PAID', 'OVERDUE', 'CANCELLED'] as const;
export type PaymentStatus = typeof PAYMENT_STATUS[number];

export const AMENDMENT_REASON = [
  'VALUE_CHANGE', // rate hike / renegotiation
  'SCOPE_CHANGE', // more or less deliverables
  'EXTENSION', // end date pushed
  'EARLY_TERMINATION',
  'OTHER',
] as const;
export type AmendmentReason = typeof AMENDMENT_REASON[number];

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
  nextPaymentDate: string | null;

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
  counterPartyName: string;
  counterPartyEmail: string;
  counterPartyType: CounterpartyType;
  counterPartyContactPhone?: string;

  parentDealId: string | null;

  currency: Currency;
  agreedValue: number;
  cycleAmount: number | null;
  paidValue: number;

  totalCommitted: number; // sum of splits[].amount (computed)
  margin: number; // agreedValue - totalCommitted (computed)
  marginPct: number; // (margin / agreedValue) * 100 (computed)

  // schedule
  isRecurring: boolean;
  recurrenceInterval: RecurrenceInterval | null;
  nextPaymentDate: Date | null;

  // ledger

  // dates
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;

  // near future
  invoiceId: string | null;
  contractUrl: string | null;
  notes: string | null;

  splits: Split[]; // empty array = leaf deal, no children
  amendments: Amendment[];
  payments: Payment[];
};


// DTO

export type CreateDealDTO = z.infer<typeof createDealSchema>;