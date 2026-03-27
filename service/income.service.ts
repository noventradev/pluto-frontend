import { IncomeFormValues } from '@/app/lib/types/income.types';

export const addIncome = async (newIncome: IncomeFormValues) => {
  const userId = localStorage.getItem('userId');

  if (!userId) throw new Error('No User');

  const res = await fetch('/api/income', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'user-id': userId,
    },
    body: JSON.stringify(newIncome),
  });

  if (!res.ok) {
    throw new Error('Failed to add Income');
  }

  return res.json();
};
