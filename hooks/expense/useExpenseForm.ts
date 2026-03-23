import { ExpenseFormValues } from '@/app/lib/types/expense.types';
import { validateExpense } from '@/app/lib/validators/expense.validators';
import { useState } from 'react';

export function useExpenseForm(onSubmit: (data: ExpenseFormValues) => void) {
  const initialForm: ExpenseFormValues = {
    categoryName: '',
    categoryType: '',
    isRecurring: false,

    entry: {
      amount: '',
      currency: 'INR',
      status: 'PENDING',
      paidAt: '',
    },

    stream: undefined,
  };

  const [form, setForm] = useState<ExpenseFormValues>(initialForm);
  const [error, setError] = useState('');

  const handleChange = <K extends keyof ExpenseFormValues>(
    field: K,
    value: ExpenseFormValues[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEntryChange = <K extends keyof ExpenseFormValues['entry']>(
    field: K,
    value: ExpenseFormValues['entry'][K]
  ) => {
    setForm((prev) => ({
      ...prev,
      entry: {
        ...prev.entry,
        [field]: value,
      },
    }));
  };

  const handleStreamChange = <
    K extends keyof NonNullable<ExpenseFormValues['stream']>,
  >(
    field: K,
    value: NonNullable<ExpenseFormValues['stream']>[K]
  ) => {
    setForm((prev) => {
      const currentStream = prev.stream ?? {
        name: '',
        frequency: 'MONTHLY',
        interval: 1,
        startDate: '',
        baseAmount: '',
        currency: prev.entry.currency,
      };

      return {
        ...prev,
        stream: {
          ...currentStream,
          [field]: value,
        },
      };
    });
  };
  const handleRecurringToggle = (value: boolean) => {
    setForm((prev) => ({
      ...prev,
      isRecurring: value,
      stream: value
        ? prev.stream || {
            name: '',
            frequency: 'MONTHLY',
            interval: 1,
            startDate: '',
            baseAmount: '',
            currency: prev.entry.currency,
          }
        : undefined,
      entry: value
        ? {
            ...prev.entry,
            amount: prev.stream?.baseAmount || '',
            status: 'PENDING',
          }
        : prev.entry,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateExpense(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    onSubmit({
      ...form,
    });

    // reset form after submit
    setForm(initialForm);
  };

  return {
    form,
    error,
    handleChange,
    handleEntryChange,
    handleStreamChange,
    handleRecurringToggle,
    handleSubmit,
  };
}
