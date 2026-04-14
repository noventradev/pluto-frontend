import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { DealSplitFields } from "./deal-split-fields";
import { CreateDealSplitDTO } from "@/app/lib/types/deal-split.types";
import { useDealSplitForm } from "@/hooks/deals/useDealSplitForm";

type DealSplitSubmitPayload = {
    id: string;
    data: CreateDealSplitDTO;
};

type Props = {
    onSubmit: (data: DealSplitSubmitPayload) => void;
    isSubmitting?: boolean;
    parentId: string;
};

export function DealSplitForm({ parentId, onSubmit, isSubmitting = false }: Props) {
    const router = useRouter();
    const { form, error, handleChange, handleSubmit, handleRecurringToggle } = useDealSplitForm(onSubmit, parentId);
    return (
        <form onSubmit={handleSubmit}>
            <DealSplitFields form={form} handleChange={handleChange} onRecurringToggle={handleRecurringToggle} />
            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </div>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                Create Split
            </Button>
        </form>
    );
}