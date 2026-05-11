'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';

import { IncomeForm } from '@/components/income/income-form';
import { IncomeFormValues } from '@/app/lib/types/income.types';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useAddIncome } from '@/hooks/income/useAddIncome';

export default function AddIncomePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

 const mutation = useAddIncome(() => {
    router.push('/dashboard/income');
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
        onSubmit={(data) => mutation.mutate(data)}
        isSubmitting={mutation.isPending}
      />
    </Container>
  );
}
