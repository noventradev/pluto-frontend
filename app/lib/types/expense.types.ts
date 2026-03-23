export type Expense = {
  id: string;
  category: string;
  date: string;
  createdAt: string;
  amount: number;
};

export type ExpenseStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export type Frequency = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export type CategoryType =
  | 'EQUIPMENT'
  | 'FOOD'
  | 'SALARY'
  | 'TRAVEL'
  | 'MARKETING'
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
