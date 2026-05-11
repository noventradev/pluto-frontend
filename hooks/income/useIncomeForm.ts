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

    stream: {
      startDate: '',
      endDate: '',
      frequency: 'MONTHLY',
      baseAmount: '',
      currency: 'USD',
    },
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

  const handleStreamChange = <K extends keyof IncomeFormValues['stream']>(
    field: K,
    value: IncomeFormValues['stream'][K]
  ) => {
    setForm((prev) => ({
      ...prev,
      stream: {
        ...prev.stream,
        [field]: value,
      },
    }));
  };

  const handleRecurringToggle = (value: boolean) => {
    setForm((prev) => ({
      ...prev,
      isRecurring: value,
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
      source: {
        ...form.source,
        type: form.isRecurring ? 'RECURRING' : 'ONE_TIME',
      },
      entry: {
        ...form.entry,
        actualAmount: Number(form.entry.actualAmount),
      },
      stream: form.isRecurring ? {
        ...form.stream,
        baseAmount: form.stream.baseAmount ? Number(form.stream.baseAmount) : null,
      } : {
        currency: form.stream.currency,
        startDate: form.isRecurring ? form.stream.startDate : form.entry.date,
        endDate: null,
        frequency: null,
        baseAmount: null,
      },
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
