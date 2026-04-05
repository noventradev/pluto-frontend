import { dealApi } from '@/service/deals.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useDealsMutation(onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealApi.create,

    // FOR LOGGING THE RESPONSE
    onMutate: (variables) => console.log(variables),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deals'] });
      onSuccess?.();
    },
  });
}
