import { FetchExpenseParams, fetchExpenses } from '@/service/expense.service';
import { useQuery } from '@tanstack/react-query';

export function useExpenses(params: FetchExpenseParams) {
  return useQuery({
    queryKey: ['expenses', params],
    queryFn: () => fetchExpenses(params),
    placeholderData: (prev) => prev,
  });
}
