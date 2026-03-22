import { createExpense } from '@/service/expense.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useExpenseMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExpense,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      onSuccess?.();
    },
  });
}
