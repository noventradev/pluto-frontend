'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { IncomeForm } from '../income-form';
import { IncomeFormValues } from '@/app/lib/types/income.types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';


export default function AddIncomePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addIncomeMutation = useMutation({
    mutationFn: async (newIncome: IncomeFormValues) => {
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

      if (!res.ok) throw new Error('Failed to add Income');

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['income'] });
      router.push('/dashboard/income'); // ✅ go back after success
    },
  });

  return (
    <Container>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="ghost"
          // size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
        </Button>

        <h1 className="text-2xl font-bold">Add Income</h1>
      </div>

      {/* Form */}
      <IncomeForm
        onSubmit={(data) => addIncomeMutation.mutate(data)}
        isSubmitting={addIncomeMutation.isPending}
      />
    </Container>
  );
}