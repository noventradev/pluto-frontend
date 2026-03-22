import {
  CategoryType,
  ExpenseFormValues,
  ExpenseStatus,
  Frequency,
} from '@/app/lib/types/expense.types';
import { FormInput } from '@/components/ui/form-input';
import { cn } from '@/app/lib/utils';
import { motion } from 'motion/react';

type Props = {
  form: ExpenseFormValues;

  onChange: <K extends keyof ExpenseFormValues>(
    field: K,
    value: ExpenseFormValues[K]
  ) => void;

  onEntryChange: <K extends keyof ExpenseFormValues['entry']>(
    field: K,
    value: ExpenseFormValues['entry'][K]
  ) => void;

  onStreamChange: <K extends keyof NonNullable<ExpenseFormValues['stream']>>(
    field: K,
    value: NonNullable<ExpenseFormValues['stream']>[K]
  ) => void;
};
export function ExpenseFormFields({
  form,
  onChange,
  onStreamChange,
  onEntryChange,
}: Props) {
  return (
    <div className="flex flex-col gap-5">
      {/* CATEGORY */}
      <FormInput
        type="text"
        label="Category Name"
        value={form.categoryName}
        onChange={(e) => onChange('categoryName', e.target.value)}
      />

      <div className="relative">
        <select
          value={form.categoryType || ''}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            onChange('categoryType', value as CategoryType);
          }}
          className={cn(
            'border-border bg-background w-full rounded-xl border px-3 py-3 text-sm transition outline-none',
            'focus:border-primary focus:ring-primary/20 focus:ring-2'
          )}
        >
          <option value="">Select Category Type</option>
          <option value="EQUIPMENT">Equipment</option>
          <option value="SALARY">Salary</option>
          <option value="MARKETING">Marketing</option>
          <option value="OTHER">Other</option>
        </select>
      </div>

      {/* 🔁 RECURRING TOGGLE */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Recurring Expense</span>

        <button
          type="button"
          onClick={() => onChange('isRecurring', !form.isRecurring)}
          className={`flex h-6 w-12 items-center rounded-full px-1 transition-colors ${
            form.isRecurring ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="h-4 w-4 rounded-full bg-white shadow-md"
            style={{
              marginLeft: form.isRecurring ? 'auto' : '0px',
            }}
          />
        </button>
      </div>

      {/* STREAM (ONLY IF RECURRING) */}
      {form.isRecurring && (
        <div className="flex flex-col gap-4 rounded-xl border p-4">
          <p className="text-sm font-semibold">Recurring Details</p>
          <FormInput
            label="Stream Name"
            type="text"
            value={form.stream?.name || ''}
            onChange={(e) => onStreamChange('name', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              value={form.stream?.frequency || ''}
              onChange={(e) =>
                onStreamChange('frequency', e.target.value as Frequency)
              }
              className={cn(
                'border-border bg-background rounded-xl border px-3 py-3 text-sm outline-none'
              )}
            >
              <option value="">Frequency</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
              <option value="YEARLY">Yearly</option>
            </select>

            <FormInput
              label="Interval"
              type="number"
              value={form.stream?.interval?.toString() || ''}
              onChange={(e) => {
                const value = e.target.value;
                onStreamChange('interval', value ? Number(value) : 1);
              }}
            />
          </div>

          <FormInput
            label="Start Date"
            type="date"
            value={form.stream?.startDate || ''}
            onChange={(e) => onStreamChange('startDate', e.target.value)}
          />

          <FormInput
            label="Base Amount"
            type="number"
            value={form.stream?.baseAmount || ''}
            onChange={(e) => onStreamChange('baseAmount', e.target.value)}
          />

          <FormInput
            label="Currency"
            type="text"
            value={form.stream?.currency || ''}
            onChange={(e) => onStreamChange('currency', e.target.value)}
          />
        </div>
      )}

      {/* ENTRY */}
      <div className="flex flex-col gap-4 rounded-xl border p-4">
        <p className="text-sm font-semibold">Payment Entry</p>

        <FormInput
          label="Amount"
          type="number"
          value={form.entry.amount}
          onChange={(e) => onEntryChange('amount', e.target.value)}
        />

        <FormInput
          label="Currency"
          type="text"
          value={form.entry.currency}
          onChange={(e) => onEntryChange('currency', e.target.value)}
        />

        <select
          value={form.entry.status || ''}
          onChange={(e) =>
            onEntryChange('status', e.target.value as ExpenseStatus)
          }
          className={cn(
            'border-border bg-background rounded-xl border px-3 py-3 text-sm outline-none'
          )}
        >
          <option value="">Select Status</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <FormInput
          label="Paid At"
          type="datetime-local"
          value={form.entry.paidAt || ''}
          onChange={(e) => onEntryChange('paidAt', e.target.value)}
        />
      </div>
    </div>
  );
}
