import { CreateDealSplitDTO, DealSplitFormValues } from "@/app/lib/types/deal-split.types";
import { createDealSplitSchema } from "@/app/lib/validators/deal-split.validator";
import { useState } from "react";

type DealSplitSubmitPayload = {
    id: string;
    data: CreateDealSplitDTO;
};

export function useDealSplitForm(onSubmit: (data: DealSplitSubmitPayload) => void, parentId: string) {
    const initialForm: DealSplitFormValues = {
        agreedValue: '',
        cycleAmount: '',
        label: '',
        participantId: '',
        isRecurring: false,
    }

    const [form, setForm] = useState<DealSplitFormValues>(initialForm);
    const [error, setError] = useState('');

    const handleChange = <K extends keyof DealSplitFormValues>(
        field: K,
        value: DealSplitFormValues[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleRecurringToggle = (value: boolean) => {
        setForm((prev) => ({
            ...prev,
            isRecurring: value,
        }));
    };

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');

        const parsedData = createDealSplitSchema().safeParse({
            ...form,
            agreedValue: Number(form.agreedValue),
            cycleAmount: form.cycleAmount ? Number(form.cycleAmount) : null,
        });

        if (!parsedData.success) {
            setError(parsedData.error.issues[0]?.message || 'Invalid form data');
            return;
        }

        onSubmit({ id: parentId, data: parsedData.data });

        setForm(initialForm);
    };

    return {
        form,
        error,
        handleChange,
        handleSubmit,
        handleRecurringToggle,
    };
}
