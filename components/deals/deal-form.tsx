'use client';

import { DealFormValues } from '@/app/lib/types/deal.types';
import { DealFormFields } from '@/components/deals/deal-form-fields';
import { Button } from '@/components/ui/button';
import { useDealForm } from '@/hooks/deals/useDealsForm';

type Props = {
  onSubmit: (data: DealFormValues) => void;
  isSubmitting?: boolean;
};

export function DealForm({ onSubmit, isSubmitting = false }: Props) {
  const {
    form,
    error,
    handleChange,
    handleCounterpartyChange,
    handleRecurringToggle,
    handleSubmit,
  } = useDealForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="bg-background flex flex-col gap-4">
      {/* FORM FIELDS */}
      <DealFormFields
        form={form}
        onChange={handleChange}
        onCounterpartyChange={handleCounterpartyChange}
        onRecurringToggle={handleRecurringToggle}
      />

      {/* ERROR */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* SUBMIT */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Creating Deal...' : 'Create Deal'}
      </Button>
    </form>
  );
}
