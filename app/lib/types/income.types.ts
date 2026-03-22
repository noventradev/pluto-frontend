export type IncomeFormValues = {
  name: string;
  source: string;
  type: string;

  startDate: string;
  endDate?: string;
  frequency: string;

  baseAmount: number;
  currency: string;

  estimatedAmount?: number;
  actualAmount?: number;

  status: string;
  note?: string;
};