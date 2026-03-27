import { expenseApi } from '@/service/expense.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook for creating an expense
 * Returns a mutation object with the mutate function to create an expense
 * The mutate function takes an expense object as an argument and returns a promise that resolves to the created expense
 * The onSuccess callback is called after the mutation has been successfully completed
 * It invalidates the query for all expenses, and calls the onSuccess callback if provided
 */
export function useExpenseMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: expenseApi.create,

    // FOR LOGGING THE RESPONSE
    // onMutate: (variables) => console.log(variables),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      onSuccess?.();
    },
  });
}
