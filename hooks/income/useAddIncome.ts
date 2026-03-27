import { addIncome } from '@/service/income.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddIncome = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });

      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });
};
