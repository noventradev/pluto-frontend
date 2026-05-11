import { IncomeFormValues } from '@/app/lib/types/income.types';
import apiClient, { api } from './api/client';

export interface FetchIncomeParams {
  page: number;
  pageSize: number;
  sortBy: string;
  order: 'asc' | 'desc';
  search: string;
  from: string | null;
  to: string | null;
}

export async function fetchIncomes(params: FetchIncomeParams) {
  // const query: any = {
  //   page: String(params.page),
  //   pageSize: String(params.pageSize),
  //   sortBy: params.sortBy,
  //   order: params.order,
  //   search: params.search,
  // };

  // if (params.from && params.to) {
  //   query.from = params.from;
  //   query.to = params.to;
  // }

  const res = await fetch('http://localhost:5000/api/incomes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId') || '',
    },
  });

  const data = await res.json();

  if (!data.success) throw new Error(data.message || 'Failed to fetch');
  const rawData = data.data.data || [];
  const flattenedIncomes: any[] = [];

  rawData.forEach((source: any) => {
    if (source.streams && source.streams.length > 0) {
      source.streams.forEach((stream: any) => {
        if (stream.entries && stream.entries.length > 0) {
          stream.entries.forEach((entry: any) => {
            flattenedIncomes.push({
              id: `${source.id}-${stream.id}-${entry.id}`,
              createdAt: source.createdAt,
              source: {
                sourceOfIncome: source.sourceOfIncome || 'OTHER',
                name: source.name,
                type: source.type,
              },
              isRecurring: stream.isRecurring,
              stream: {
                id: stream.id,
                frequency: stream.frequency,
                interval: 1,
                startDate: stream.startDate,
                endDate: stream.endDate,
                baseAmount: stream.baseAmount?.toString() || null,
                currency: stream.currency,
              },
              entry: {
                id: entry.id,
                actualAmount: entry.actualAmount?.toString() || entry.estimatedAmount?.toString() || '0',
                currency: stream.currency,
                date: entry.date,
                note: entry.note || '',
                status: entry.status === 'COMPLETED' ? 'RECEIVED' : (entry.status || 'PENDING'),
              },
            });
          });
        } else {
          // If a stream has no entries (should rarely happen), still map it
          flattenedIncomes.push({
            id: `${source.id}-${stream.id}-noentry`,
            createdAt: source.createdAt,
            source: {
              sourceOfIncome: source.sourceOfIncome || 'OTHER',
              name: source.name,
              type: source.type,
            },
            isRecurring: stream.isRecurring,
            stream: {
              id: stream.id,
              frequency: stream.frequency,
              interval: 1,
              startDate: stream.startDate,
              endDate: stream.endDate,
              baseAmount: stream.baseAmount?.toString() || null,
              currency: stream.currency,
            },
            entry: {
              id: 'noentry',
              actualAmount: stream.baseAmount?.toString() || '0',
              currency: stream.currency,
              date: stream.startDate,
              note: '',
              status: 'PENDING',
            },
          });
        }
      });
    }
  });

  return {
    success: true,
    data: flattenedIncomes,
    totalPages: 1,
  };
}

export const addIncome = async (newIncome: IncomeFormValues) => {
  console.log(newIncome);
  // const response = await api.post<any>('http://localhost:5000/api/incomes', newIncome);
  const response = await fetch('http://localhost:5000/api/incomes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': localStorage.getItem('userId') || '',
    },
    body: JSON.stringify(newIncome),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error('Failed to add Income');
  }

  return response;
};
