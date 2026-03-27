'use client';

import { ExpenseFormValues } from '@/app/lib/types/expense.types';
import { ExpenseFormFields } from '@/components/expense/expense-form-fields';
import { Button } from '@/components/ui/button';
import { useExpenseForm } from '@/hooks/expense/useExpenseForm';

type Props = {
  onSubmit: (data: ExpenseFormValues) => void;
  isSubmitting?: boolean;
};

export function ExpenseForm({ onSubmit, isSubmitting = false }: Props) {
  const {
    form,
    error,
    handleChange,
    handleSubmit,
    handleEntryChange,
    handleStreamChange,
    handleRecurringToggle,
  } = useExpenseForm(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="bg-background flex flex-col gap-4">
      {/* FORM FIELDS */}
      <div className="">
        <ExpenseFormFields
          form={form}
          onChange={handleChange}
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
        {isSubmitting ? 'Adding Expense...' : 'Add Expense'}
      </Button>
    </form>
  );
}
