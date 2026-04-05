import { DealFormValues } from '@/app/lib/types/deal.types';
import { useState } from 'react';

export function useDealForm(onSubmit: (data: DealFormValues) => void) {
  const initialForm: DealFormValues = {
    title: '',
    dealType: '',
    status: 'DRAFT',

    userOwnerId: null,
    orgOwnerId: null,

    counterparty: {
      name: '',
      email: '',
      type: '',
      contactPhone: null,
    },

    parentDealId: null,

    currency: 'INR',
    agreedValue: '',
    cycleAmount: '',

    isRecurring: false,
    recurrenceInterval: null,

    startDate: '',
    endDate: null,

    notes: null,
  };

  const [form, setForm] = useState<DealFormValues>(initialForm);
  const [error, setError] = useState('');

  const handleChange = <K extends keyof DealFormValues>(
    field: K,
    value: DealFormValues[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCounterpartyChange = <
    K extends keyof DealFormValues['counterparty'],
  >(
    field: K,
    value: DealFormValues['counterparty'][K]
  ) => {
    setForm((prev) => ({
      ...prev,
      counterparty: {
        ...prev.counterparty,
        [field]: value,
      },
    }));
  };

  const handleRecurringToggle = (value: boolean) => {
    setForm((prev) => ({
      ...prev,
      isRecurring: value,
      recurrenceInterval: value ? prev.recurrenceInterval || 'monthly' : null,
      cycleAmount: value ? prev.cycleAmount : '',
    }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    setError('');

    onSubmit({
      ...form,
      agreedValue: form.agreedValue.trim(),
      cycleAmount: form.isRecurring ? form.cycleAmount.trim() : '',
    });

    setForm(initialForm);
  };

  return {
    form,
    error,
    handleChange,
    handleCounterpartyChange,
    handleRecurringToggle,
    handleSubmit,
  };
}
