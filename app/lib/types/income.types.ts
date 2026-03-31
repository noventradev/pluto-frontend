export type IncomeSource =
  | 'youtube'
  | 'twitch'
  | 'sponsor'
  | 'tournament'
  | 'salary'
  | 'other';

export type IncomeType = 'one-time' | 'recurring';

export type IncomeFrequency =
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'quarterly'
  | 'annually';

export type IncomeStatus = 'pending' | 'received';

export type Currency = 'INR' | 'USD' | 'EUR';

export type IncomeFormValues = {
  // source
  source: {
    sourceOfIncome: IncomeSource | string;
    name: string;
    type: IncomeType | string;
  };

  // toggle
  isRecurring: boolean;

  // stream (ONLY if recurring)
  stream?: {
    startDate: string;
    endDate: string;
    frequency: IncomeFrequency | string;
    baseAmount: number | string;
    currency: Currency | string;
  };

  // entry (always required)
  entry: {
    date: string;
    actualAmount: number | string;
    note: string;
  };
};