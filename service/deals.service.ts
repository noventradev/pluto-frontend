import { DealFormValues } from '@/app/lib/types/deal.types';
import apiClient from './api/client';

export const dealApi = {
  create: (data: DealFormValues) => apiClient.post('/api/deal', data),
};
