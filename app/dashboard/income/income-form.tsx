'use client';

import {
  Calendar,
  DollarSign,
  FileText,
  Layers,
  Repeat,
  StickyNote,
  Tag,
  Wallet,
} from 'lucide-react';
import React, { useState } from 'react';

import { IncomeFormValues } from '@/app/lib/types/income.types';
import { incomeSchema } from '@/app/lib/validators/income.schema';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';

import {
  CURRENCIES,
  INCOME_FREQUENCIES,
  INCOME_SOURCES,
  INCOME_STATUS,
  INCOME_TYPES,
} from '@/app/lib/constants/income';

type Props = {
  onSubmit: (data: IncomeFormValues) => void;
  isSubmitting?: boolean;
};

export const IncomeForm = ({ onSubmit, isSubmitting = false }: Props) => {
  const [form, setForm] = useState<IncomeFormValues>({
    name: '',
    source: '',
    type: '',
    startDate: '',
    endDate: '',
    frequency: '',
    baseAmount: 0,
    currency: 'INR',
    estimatedAmount: 0,
    actualAmount: 0,
    status: 'pending',
    note: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    key: keyof IncomeFormValues,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = incomeSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Name */}
        <FormInput
          label="Name"
          placeholder="Income Name"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          icon={<FileText size={16} />}
          error={errors.name}
        />

        {/* Source */}
        <FormSelect
          label="Source"
          value={form.source}
          onChange={(val) => handleChange('source', val)}
          options={INCOME_SOURCES}
          placeholder="Select Source"
          icon={<Layers size={16} />}
          error={errors.source}
        />

        {/* Type */}
        <FormSelect
          label="Type"
          value={form.type}
          onChange={(val) => handleChange('type', val)}
          options={INCOME_TYPES}
          placeholder="Select Type"
          icon={<Tag size={16} />}
          error={errors.type}
        />

        {/* Frequency */}
        <FormSelect
          label="Frequency"
          value={form.frequency}
          onChange={(val) => handleChange('frequency', val)}
          options={INCOME_FREQUENCIES}
          placeholder="Select Frequency"
          icon={<Repeat size={16} />}
          error={errors.frequency}
        />

        {/* Start Date */}
        <FormInput
          label="Start Date"
          type="date"
          value={form.startDate}
          onChange={(e) => handleChange('startDate', e.target.value)}
          icon={<Calendar size={16} />}
          error={errors.startDate}
        />

        {/* End Date */}
        <FormInput
          label="End Date"
          type="date"
          value={form.endDate || ''}
          onChange={(e) => handleChange('endDate', e.target.value)}
          icon={<Calendar size={16} />}
          error={errors.endDate}
        />

        {/* Base Amount */}
        <FormInput
          label="Base Amount"
          type="number"
          placeholder="Enter amount"
          value={form.baseAmount ? String(form.baseAmount) : ''}
          onChange={(e) => handleChange('baseAmount', Number(e.target.value))}
          icon={<DollarSign size={16} />}
          error={errors.baseAmount}
        />

        {/* Currency */}
        <FormSelect
          label="Currency"
          value={form.currency}
          onChange={(val) => handleChange('currency', val)}
          options={CURRENCIES}
          icon={<Wallet size={16} />}
          error={errors.currency}
        />

        {/* Estimated Amount */}
        <FormInput
          label="Estimated Amount"
          type="number"
          value={form.estimatedAmount ? String(form.estimatedAmount) : ''}
          onChange={(e) =>
            handleChange('estimatedAmount', Number(e.target.value))
          }
          icon={<DollarSign size={16} />}
          error={errors.estimatedAmount}
        />

        {/* Actual Amount */}
        <FormInput
          label="Actual Amount"
          type="number"
          value={form.actualAmount ? String(form.actualAmount) : ''}
          onChange={(e) => handleChange('actualAmount', Number(e.target.value))}
          icon={<DollarSign size={16} />}
          error={errors.actualAmount}
        />

        {/* Status */}
        <FormSelect
          label="Status"
          value={form.status}
          onChange={(val) => handleChange('status', val)}
          options={INCOME_STATUS}
          icon={<Tag size={16} />}
          error={errors.status}
        />

        {/* Note */}
        <div className="md:col-span-2">
          <FormInput
            label="Note"
            placeholder="Optional note..."
            value={form.note || ''}
            onChange={(e) => handleChange('note', e.target.value)}
            icon={<StickyNote size={16} />}
            error={errors.note}
          />
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Income'}
      </Button>
    </form>
  );
};
