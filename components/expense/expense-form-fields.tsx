import {
  EXPENSE_CATEGORIES,
  EXPENSE_CURRENCIES,
  EXPENSE_STATUS_OPTIONS,
} from '@/app/lib/constants/expense';
import {
  CategoryType,
  ExpenseFormValues,
  ExpenseStatus,
  Frequency,
} from '@/app/lib/types/expense.types';
import { cn } from '@/app/lib/utils';
import { FormInput } from '@/components/ui/form-input';
import { CreditCard, FileText, RefreshCw, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { FormSelect } from '../ui/form-select';

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
  onRecurringToggle: (val: boolean) => void;
};

const selectClass = cn(
  'border-border bg-background w-full rounded-xl border px-3 py-3 text-sm outline-none',
  'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors'
);

export function ExpenseFormFields({
  form,
  onChange,
  onStreamChange,
  onEntryChange,
  onRecurringToggle,
}: Props) {
  return (
    <div className="flex flex-col gap-6">
      {/* SECTION: Category */}
      <section className="flex flex-col gap-4">
        <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Category
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            type="text"
            label="Category Name"
            value={form.categoryName}
            onChange={(e) => onChange('categoryName', e.target.value)}
            icon={<FileText size={16} />}
          />
          <FormSelect
            label="Expense Category"
            options={EXPENSE_CATEGORIES}
            value={form.categoryType || ''}
            onChange={(value) => {
              if (!value) return;
              onChange('categoryType', value as CategoryType);
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
            <p className="text-sm font-medium">Recurring Expense</p>
            <p className="text-muted-foreground text-xs">
              Enable if this expense repeats on a schedule
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

          <FormInput
            label="Stream Name"
            type="text"
            value={form.stream?.name || ''}
            onChange={(e) => onStreamChange('name', e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground text-xs font-medium">
                Frequency
              </label>
              <select
                value={form.stream?.frequency || ''}
                onChange={(e) =>
                  onStreamChange('frequency', e.target.value as Frequency)
                }
                className={selectClass}
              >
                <option value="">Select frequency</option>
                <option value="DAILY">Daily</option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>

            <FormInput
              label="Interval"
              type="number"
              value={form.stream?.interval?.toString() || ''}
              onChange={(e) =>
                onStreamChange(
                  'interval',
                  e.target.value ? Number(e.target.value) : 1
                )
              }
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
              value={form.stream?.baseAmount || ''}
              onChange={(e) => onStreamChange('baseAmount', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Currency"
              options={EXPENSE_CURRENCIES}
              value={form.stream?.currency || ''}
              onChange={(value) => onStreamChange('currency', value)}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-muted-foreground text-xs font-medium">
                Status
              </label>
              <select
                value={form.entry.status}
                onChange={(e) =>
                  onEntryChange('status', e.target.value as ExpenseStatus)
                }
                className={selectClass}
              >
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </motion.section>
      )}

      {/* SECTION: One-time Payment Entry */}
      {!form.isRecurring && (
        <motion.section
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="border-border flex flex-col gap-4 rounded-xl border p-4"
        >
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-muted-foreground" />
            <h3 className="text-sm font-semibold">Payment Entry</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Amount"
              type="number"
              value={form.entry.amount}
              onChange={(e) => onEntryChange('amount', e.target.value)}
            />
            <FormSelect
              label="Currency"
              options={EXPENSE_CURRENCIES}
              value={form.entry.currency}
              onChange={(value) => onEntryChange('currency', value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormSelect
              label="Status"
              options={EXPENSE_STATUS_OPTIONS}
              value={form.entry.status}
              onChange={(value) =>
                onEntryChange('status', value as ExpenseStatus)
              }
            />
            <FormInput
              label="Paid At"
              type="date"
              value={form.entry.paidAt || ''}
              onChange={(e) => onEntryChange('paidAt', e.target.value)}
            />
          </div>
        </motion.section>
      )}
    </div>
  );
}
