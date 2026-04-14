'use client';

import {
  COUNTERPARTY_TYPE_OPTIONS,
  DEAL_STATUS_OPTIONS,
  DEAL_TYPE_OPTIONS,
  RECURRENCE_INTERVAL_OPTIONS,
} from '@/app/lib/constants/deals';
import { CURRENCIES, Currency } from '@/app/lib/constants/income';
import {
  CounterpartyType,
  DealFormValues,
  DealStatus,
  DealType,
  RecurrenceInterval,
} from '@/app/lib/types/deal.types';
import { cn } from '@/app/lib/utils';
import { FormInput } from '@/components/ui/form-input';
import { Calendar, FileText, IndianRupee, RefreshCw, User } from 'lucide-react';
import { motion } from 'motion/react';
import { FormSelect } from '../ui/form-select';

type Props = {
  form: DealFormValues;
  onChange: <K extends keyof DealFormValues>(
    field: K,
    value: DealFormValues[K]
  ) => void;
  onCounterpartyChange: <K extends keyof DealFormValues['counterparty']>(
    field: K,
    value: DealFormValues['counterparty'][K]
  ) => void;
  onRecurringToggle: (val: boolean) => void;
};

export function DealFormFields({
  form,
  onChange,
  onCounterpartyChange,
  onRecurringToggle,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* SECTION: Identity */}
      <section className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Deal Info
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Deal Title"
            value={form.title}
            onChange={(e) => onChange('title', e.target.value)}
            icon={<FileText size={16} />}
          />

          <FormSelect
            label="Deal Type"
            value={form.dealType}
            onChange={(val) => onChange('dealType', val as DealType)}
            options={DEAL_TYPE_OPTIONS}
          />

          <FormSelect
            label="Status"
            value={form.status}
            onChange={(val) => onChange('status', val as DealStatus)}
            options={DEAL_STATUS_OPTIONS}
          />
        </div>
      </section>

      <hr className="border-border border-t" />

      {/* SECTION: Counterparty */}
      <section className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Counterparty
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Name"
            value={form.counterparty.name}
            onChange={(e) => onCounterpartyChange('name', e.target.value)}
            icon={<User size={16} />}
          />

          <FormInput
            label="Email"
            value={form.counterparty.email}
            onChange={(e) => onCounterpartyChange('email', e.target.value)}
          />

          <FormSelect
            label="Type"
            value={form.counterparty.type}
            onChange={(val) =>
              onCounterpartyChange('type', val as CounterpartyType)
            }
            options={COUNTERPARTY_TYPE_OPTIONS}
          />

          <FormInput
            label="Phone"
            value={form.counterparty.contactPhone || ''}
            onChange={(e) =>
              onCounterpartyChange('contactPhone', e.target.value)
            }
          />
        </div>
      </section>

      <hr className="border-border border-t" />

      {/* SECTION: Financials */}
      <section className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Financials
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Agreed Value"
            type="number"
            value={form.agreedValue}
            onChange={(e) => onChange('agreedValue', e.target.value)}
            icon={<IndianRupee size={16} />}
          />

          <FormSelect
            label="Currency"
            value={form.currency}
            onChange={(val) => onChange('currency', val as Currency)}
            options={CURRENCIES}
          />
        </div>
      </section>

      <hr className="border-border border-t" />

      {/* SECTION: Recurring */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <RefreshCw size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Recurring Deal</p>
            <p className="text-muted-foreground text-xs">
              Enable if this deal has recurring payments
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRecurringToggle(!form.isRecurring)}
          className={cn(
            'flex h-6 w-11 items-center rounded-full px-0.5',
            form.isRecurring ? 'bg-blue-600' : 'bg-gray-300'
          )}
        >
          <motion.div
            layout
            className="h-5 w-5 rounded-full bg-white"
            style={{ marginLeft: form.isRecurring ? 'auto' : 0 }}
          />
        </button>
      </section>

      {form.isRecurring && (
        <motion.section
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-border grid grid-cols-2 gap-4 rounded-xl border p-4"
        >
          <FormInput
            label="Cycle Amount"
            type="number"
            value={form.cycleAmount}
            onChange={(e) => onChange('cycleAmount', e.target.value)}
            icon={<IndianRupee size={16} />}
          />
          <FormSelect
            label="Recurrence Interval"
            value={form.recurrenceInterval || ''}
            onChange={(val) =>
              onChange('recurrenceInterval', val as RecurrenceInterval)
            }
            options={RECURRENCE_INTERVAL_OPTIONS}
          />
          <FormInput
            label="Next Payment Date"
            type="date"
            value={form.nextPaymentDate || ''}
            onChange={(e) => onChange('nextPaymentDate', e.target.value)}
            icon={<Calendar size={16} />}
          />
          <FormInput
            label="End Date"
            type="date"
            value={form.endDate || ''}
            onChange={(e) => onChange('endDate', e.target.value)}
            icon={<Calendar size={16} />}
          />
        </motion.section>
      )}

      <hr className="border-border border-t" />
      <FormInput
        label="Start Date"
        type="date"
        value={form.startDate}
        onChange={(e) => onChange('startDate', e.target.value)}
        icon={<Calendar size={16} />}
      />
      <hr className="border-border border-t" />

      <section>
        <textarea
          placeholder="Notes..."
          value={form.notes || ''}
          onChange={(e) => onChange('notes', e.target.value)}
          className="border-border w-full rounded-xl border p-3 text-sm"
        />
      </section>
    </div>
  );
}
