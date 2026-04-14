import { cn } from "@/app/lib/utils";
import { FormInput } from "../ui/form-input";
import { FormSelect } from "../ui/form-select";
import { RefreshCw } from "lucide-react";
import { motion } from 'motion/react'
import { DealSplitFormValues } from "@/app/lib/types/deal-split.types";

type Props = {
    form: DealSplitFormValues;
    handleChange: <K extends keyof DealSplitFormValues>(
        field: K,
        value: DealSplitFormValues[K]
    ) => void;
    onRecurringToggle: (value: boolean) => void;
}
export function DealSplitFields({ form, handleChange, onRecurringToggle }: Props) {
    return (
        <div className="flex flex-col gap-6">
            <FormInput
                label="Label"
                type="text"
                value={form.label}
                onChange={(e) => handleChange('label', e.target.value)}
            />
            <FormInput
                label="Agreed Amount"
                type="number"
                value={form.agreedValue}
                onChange={(e) => handleChange('agreedValue', e.target.value)}
            />
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
            {form.isRecurring && (
                <FormInput
                    label="Cycle Amount"
                    type="number"
                    value={form.cycleAmount}
                    onChange={(e) => handleChange('cycleAmount', e.target.value)}
                />
            )}
            <FormSelect
                label="Participant"
                value=""
                onChange={() => { }}
                options={[
                    { value: "participant1", label: "Participant 1" },
                    { value: "participant2", label: "Participant 2" },
                ]}
            />
        </div>
    );
}