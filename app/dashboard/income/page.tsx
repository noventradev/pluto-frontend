'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { useRouter } from 'next/navigation';

export default function IncomePage() {
  const router = useRouter();

  return (
    <Container>
      <div className="mt-2 mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">All Income</h1>

        <Button onClick={() => router.push('/dashboard/income/add')}>
          Add Income
        </Button>
      </div>
    </Container>
  );
}
