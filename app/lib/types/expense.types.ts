export type Expense = {
  id: string;
  createdAt: string;

  // category
  categoryName: string;
  categoryType: CategoryType;

  // recurring
  isRecurring: boolean;
  stream?: {
    id: string;
    name: string;
    frequency: Frequency;
    interval: number;
    startDate: string;
    endDate?: string;
    baseAmount: string;
    currency: string;
  };

  // entry
  entry: {
    id: string;
    amount: string;
    currency: string;
    status: ExpenseStatus;
    paidAt: string;
  };
};

export type ExpenseStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type CategoryType =
  | 'EQUIPMENT'
  | 'FOOD'
  | 'SALARY'
  | 'TRAVEL'
  | 'MARKETING'
  | 'HEALTH'
  | 'SOFTWARE'
  | 'UTILITIES'
  | 'RENT'
  | 'OTHER';

export type ExpenseFormValues = {
  // category
  categoryName: string;
  categoryType: CategoryType | '';

  // toggle
  isRecurring: boolean;

  // stream (ONLY if recurring)
  stream?: {
    name: string;
    frequency: Frequency;
    interval: number;
    startDate: string;
    endDate: string;
    baseAmount: string;
    currency: string;
  };

  // entry (always required)
  entry: {
    amount: string;
    currency: string;
    status: ExpenseStatus;
    paidAt: string;
  };
};
