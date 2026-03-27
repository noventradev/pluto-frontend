'use client';
import { ExpenseForm } from '@/components/expense/expense-form';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useExpenseMutation } from '@/hooks/expense/useExpenseMutation';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const mutation = useExpenseMutation(() => {
    router.push('/dashboard/expense');
  });
  return (
    <Container>
      <div className="mb-6 flex items-center gap-3">
        <Button
          variant="ghost"
          // size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft size={18} />
        </Button>

        <h1 className="text-2xl font-bold">Add Expense</h1>
      </div>
      <ExpenseForm
        onSubmit={mutation.mutate}
        isSubmitting={mutation.isPending}
      />
    </Container>
  );
};

export default Page;
