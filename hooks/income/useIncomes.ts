import { FetchIncomeParams, fetchIncomes } from '@/service/income.service';
import { useQuery } from '@tanstack/react-query';

export function useIncomes(params: FetchIncomeParams) {
  return useQuery({
    queryKey: ['incomes', params],
    queryFn: () => fetchIncomes(params),
    placeholderData: (prev) => prev,
  });
}
