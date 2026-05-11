export type IncomeSource =
  | 'YOUTUBE'
  | 'TWITCH'
  | 'SPONSOR'
  | 'TOURNAMENT'
  | 'SALARY'
  | 'OTHER';

export type IncomeType = 'ONE_TIME' | 'RECURRING' | 'CONTRACT';

export type IncomeFrequency =
  | 'DAILY'
  | 'WEEKLY'
  | 'MONTHLY'
  | 'YEARLY'
  | 'ONE_TIME';

export type IncomeStatus = 'PENDING' | 'RECEIVED';

export type Currency = 'INR' | 'USD' | 'GBP';

export type Income = {
  id: string;
  createdAt: string;

  // source
  source: {
    sourceOfIncome: IncomeSource;
    name: string;
    type: IncomeType;
  };

  // recurring
  isRecurring: boolean;
  stream: {
    id?: string | null;
    frequency?: IncomeFrequency | null;
    interval?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    baseAmount?: string | null;
    currency: Currency;
  };

  // entry
  entry: {
    id: string;
    actualAmount: string;
    currency: Currency;
    date: string;
    note?: string;
    status: IncomeStatus;
  };
};

export type IncomeFormValues = {
  // source
  source: {
    sourceOfIncome: IncomeSource | string;
    name: string;
    type: IncomeType | string;
  };

  // toggle
  isRecurring: boolean;

  // stream (REQUIRED)
  stream: {
    startDate?: string | null;
    endDate?: string | null;
    frequency?: IncomeFrequency | string | null;
    baseAmount?: number | string | null;
    currency: Currency | string;
  };

  // entry (always required)
  entry: {
    date: string;
    actualAmount: number | string;
    note: string;
  };
};