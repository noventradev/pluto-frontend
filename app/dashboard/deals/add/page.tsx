'use client';

import { DealForm } from '@/components/deals/deal-form';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useDealsMutation } from '@/hooks/deals/useDealsMutation';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

const AddDeal = () => {
  const mutation = useDealsMutation();
  const router = useRouter();
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

        <h1 className="text-2xl font-bold">Add New Deal</h1>
      </div>
      <DealForm onSubmit={mutation.mutate} isSubmitting={mutation.isPending} />
    </Container>
  );
};

export default AddDeal;
