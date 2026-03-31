import {
  CURRENCIES,
  INCOME_FREQUENCIES,
  INCOME_SOURCES,
  INCOME_TYPES,
} from '@/app/lib/constants/income';
import {
  Currency,
  IncomeFormValues,
  IncomeFrequency,
  IncomeSource,
  IncomeType,
} from '@/app/lib/types/income.types';
import { cn } from '@/app/lib/utils';
import { FormInput } from '@/components/ui/form-input';
import { FormSelect } from '@/components/ui/form-select';
import { CreditCard, FileText, Layers, RefreshCw, Tag } from 'lucide-react';
import { motion } from 'motion/react';

type Props = {
  form: IncomeFormValues;
  onSourceChange: <K extends keyof IncomeFormValues['source']>(
    field: K,
    value: IncomeFormValues['source'][K]
  ) => void;
  onEntryChange: <K extends keyof IncomeFormValues['entry']>(
    field: K,
    value: IncomeFormValues['entry'][K]
  ) => void;
  onStreamChange: <K extends keyof NonNullable<IncomeFormValues['stream']>>(
    field: K,
    value: NonNullable<IncomeFormValues['stream']>[K]
  ) => void;
  onRecurringToggle: (val: boolean) => void;
};

const selectClass = cn(
  'border-border bg-background w-full rounded-xl border px-3 py-3 text-sm outline-none',
  'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors'
);

export function IncomeFormFields({
  form,
  onSourceChange,
  onStreamChange,
  onEntryChange,
  onRecurringToggle,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* SECTION: Source Details */}
      <section className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Source Details
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            type="text"
            label="Project / Source Name"
            value={form.source.name}
            onChange={(e) => onSourceChange('name', e.target.value)}
            icon={<FileText size={16} />}
          />
          <FormSelect
            label="Source of Income"
            options={INCOME_SOURCES}
            value={form.source.sourceOfIncome || ''}
            onChange={(value) => {
              if (!value) return;
              onSourceChange('sourceOfIncome', value as IncomeSource);
            }}
            icon={<Layers size={16} />}
          />
          <FormSelect
            label="Income Type"
            options={INCOME_TYPES}
            value={form.source.type || ''}
            onChange={(value) => {
              if (!value) return;
              onSourceChange('type', value as IncomeType);
            }}
            icon={<Tag size={16} />}
          />
        </div>
      </section>

      {/* DIVIDER */}
      <hr className="border-border border-t" />

      {/* SECTION: Recurring Toggle */}
      <section className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <RefreshCw size={16} className="text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Recurring Income</p>
            <p className="text-muted-foreground text-xs">
              Enable if this income repeats on a schedule
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onRecurringToggle(!form.isRecurring)}
          aria-pressed={form.isRecurring}
          className={cn(
            'flex h-6 w-11 shrink-0 items-center rounded-full px-0.5 transition-colors duration-200',
            form.isRecurring ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          )}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="h-5 w-5 rounded-full bg-white shadow-md"
            style={{ marginLeft: form.isRecurring ? 'auto' : '0px' }}
          />
        </button>
      </section>

      {/* SECTION: Recurring Stream Details */}
      {form.isRecurring && (
        <motion.section
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-border flex flex-col gap-4 rounded-xl border p-4"
        >
          <div className="flex items-center gap-2">
            <RefreshCw size={14} className="text-muted-foreground" />
            <h3 className="text-sm font-semibold">Recurring Details</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground text-xs font-medium">
                Frequency
              </label>
              <select
                value={form.stream?.frequency || ''}
                onChange={(e) =>
                  onStreamChange('frequency', e.target.value as IncomeFrequency)
                }
                className={selectClass}
              >
                <option value="">Select frequency</option>
                {INCOME_FREQUENCIES.map((freq) => (
                  <option key={freq} value={freq} className="capitalize">
                    {freq}
                  </option>
                ))}
              </select>
            </div>
            
            <FormSelect
              label="Currency"
              options={CURRENCIES}
              value={form.stream?.currency || ''}
              onChange={(value) => onStreamChange('currency', value as Currency)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              label="Start Date"
              type="date"
              value={form.stream?.startDate || ''}
              onChange={(e) => onStreamChange('startDate', e.target.value)}
            />
            <FormInput
              label="End Date"
              type="date"
              value={form.stream?.endDate || ''}
              onChange={(e) => onStreamChange('endDate', e.target.value)}
            />
            <FormInput
              label="Base Amount"
              type="number"
              value={form.stream?.baseAmount?.toString() || ''}
              onChange={(e) => onStreamChange('baseAmount', e.target.value)}
            />
          </div>
        </motion.section>
      )}

      {/* SECTION: Payment Entry */}
      <motion.section
        layout
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="border-border flex flex-col gap-4 rounded-xl border p-4"
      >
        <div className="flex items-center gap-2">
          <CreditCard size={14} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold">Payment Entry</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Actual Amount"
            type="number"
            value={form.entry.actualAmount?.toString() || ''}
            onChange={(e) => onEntryChange('actualAmount', e.target.value)}
          />
          <FormInput
            label="Date"
            type="date"
            value={form.entry.date || ''}
            onChange={(e) => onEntryChange('date', e.target.value)}
          />
        </div>

        <FormInput
          label="Note"
          type="text"
          value={form.entry.note || ''}
          onChange={(e) => onEntryChange('note', e.target.value)}
        />
      </motion.section>
    </div>
  );
}
