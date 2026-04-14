import { CreateDealDTO, DealFormValues } from '@/app/lib/types/deal.types';
import { createDealSchema } from '@/app/lib/validators/deal.validators';
import { useState } from 'react';

export function useDealForm(onSubmit: (data: CreateDealDTO) => void) {
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

    nextPaymentDate: null,

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

    const parsedData = createDealSchema().safeParse({
      ...form,
      agreedValue: Number(form.agreedValue),
      cycleAmount: form.cycleAmount ? Number(form.cycleAmount) : null,
      startDate: new Date(form.startDate),
      endDate: form.endDate ? new Date(form.endDate) : null,
      nextPaymentDate: form.nextPaymentDate ? new Date(form.nextPaymentDate) : null,
    });

    if (!parsedData.success) {
      setError(parsedData.error.issues[0]?.message || 'Invalid form data');
      return;
    }

    onSubmit(parsedData.data);

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
