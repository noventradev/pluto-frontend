import { z } from "zod";

export function createDealSplitSchema() {
    return z.object({
        agreedValue: z.number(),
        cycleAmount: z.number().nullable(),
        label: z.string(),
        participantId: z.string(),
    })
}