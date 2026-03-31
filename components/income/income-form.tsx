'use client';

import { IncomeFormValues } from '@/app/lib/types/income.types';
import { IncomeFormFields } from '@/components/income/income-form-fields';
import { Button } from '@/components/ui/button';
import { useIncomeForm } from '@/hooks/income/useIncomeForm';

type Props = {
  onSubmit: (data: IncomeFormValues) => void;
  isSubmitting?: boolean;
};

export function IncomeForm({ onSubmit, isSubmitting = false }: Props) {
  const {
    form,
    error,
    handleSourceChange,
    handleSubmit,
    handleEntryChange,
    handleStreamChange,
    handleRecurringToggle,
  } = useIncomeForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="bg-background flex flex-col gap-4">
      {/* FORM FIELDS */}
      <div className="">
        <IncomeFormFields
          form={form}
          onSourceChange={handleSourceChange}
          onEntryChange={handleEntryChange}
          onStreamChange={handleStreamChange}
          onRecurringToggle={handleRecurringToggle}
        />
      </div>
      
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Adding Income...' : 'Add Income'}
      </Button>
    </form>
  );
}
