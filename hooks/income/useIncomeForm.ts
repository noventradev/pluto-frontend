import { IncomeFormValues } from '@/app/lib/types/income.types';
import { validateIncome } from '@/app/lib/validators/income.validators';
import { useState } from 'react';

export function useIncomeForm(onSubmit: (data: IncomeFormValues) => void) {
  const initialForm: IncomeFormValues = {
    source: {
      sourceOfIncome: '',
      name: '',
      type: '',
    },
    isRecurring: false,

    entry: {
      date: new Date().toISOString().split('T')[0],
      actualAmount: '',
      note: '',
    },

    stream: undefined,
  };

  const [form, setForm] = useState<IncomeFormValues>(initialForm);
  const [error, setError] = useState('');

  const handleSourceChange = <K extends keyof IncomeFormValues['source']>(
    field: K,
    value: IncomeFormValues['source'][K]
  ) => {
    setForm((prev) => ({
      ...prev,
      source: {
        ...prev.source,
        [field]: value,
      },
    }));
  };

  const handleEntryChange = <K extends keyof IncomeFormValues['entry']>(
    field: K,
    value: IncomeFormValues['entry'][K]
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
    K extends keyof NonNullable<IncomeFormValues['stream']>,
  >(
    field: K,
    value: NonNullable<IncomeFormValues['stream']>[K]
  ) => {
    setForm((prev) => {
      const currentStream = prev.stream ?? {
        startDate: '',
        endDate: '',
        frequency: 'monthly',
        baseAmount: '',
        currency: 'USD',
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
            startDate: '',
            endDate: '',
            frequency: 'monthly',
            baseAmount: '',
            currency: 'USD',
          }
        : undefined,
      entry: value
        ? {
            ...prev.entry,
            actualAmount: prev.stream?.baseAmount || '',
          }
        : prev.entry,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateIncome(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');

    // Pre-process numeric types if needed before passing to onSubmit
    const payload: IncomeFormValues = {
      ...form,
      entry: {
        ...form.entry,
        actualAmount: Number(form.entry.actualAmount),
      },
      stream: form.isRecurring && form.stream ? {
        ...form.stream,
        baseAmount: Number(form.stream.baseAmount),
      } : undefined,
    };

    onSubmit(payload);

    // reset form after submit
    setForm(initialForm);
  };

  return {
    form,
    error,
    handleSourceChange,
    handleEntryChange,
    handleStreamChange,
    handleRecurringToggle,
    handleSubmit,
  };
}
