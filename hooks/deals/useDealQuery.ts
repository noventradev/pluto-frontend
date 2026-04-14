import { dealApi } from '@/service/deals.service';
import { useQuery } from '@tanstack/react-query';

export function useDealQuery() {
  const query = useQuery({
    queryKey: ['deals'],
    queryFn: dealApi.getAll,
    select: (res) => res.data.data.data,
  });

  return query;
}

export function useDealByIdQuery(id: string) {
  return useQuery({
    queryKey: ['deal', id],
    queryFn: () => dealApi.getById(id),
    // enabled: !!id,
    select: (res) => res.data.data.data,
  });
}
