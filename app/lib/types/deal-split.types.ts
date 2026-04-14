import z from "zod";
import { createDealSplitSchema } from "../validators/deal-split.validator";

export type DealSplitFormValues = {
    agreedValue: string;
    cycleAmount: string;
    label: string;
    participantId: string;
    isRecurring?: boolean;
}

export type CreateDealSplitDTO = z.infer<typeof createDealSplitSchema>
