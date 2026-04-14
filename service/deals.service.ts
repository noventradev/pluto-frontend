import { CreateDealDTO } from '@/app/lib/types/deal.types';
import apiClient from './api/client';
import { CreateDealSplitDTO } from '@/app/lib/types/deal-split.types';

export const dealApi = {
  create: (data: CreateDealDTO) =>
    apiClient.post('http://localhost:5000/api/deals', data),
  getAll: () => apiClient.get('http://localhost:5000/api/deals'),
  getById: (id: string) =>
    apiClient.get(`http://localhost:5000/api/deals/${id}`),
};

export const dealSplitApi = {
  create: (id: string, data: CreateDealSplitDTO) =>
    apiClient.post(`http://localhost:5000/api/deals/${id}/splits`, data),
};
