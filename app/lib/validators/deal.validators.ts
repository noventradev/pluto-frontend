import { z } from 'zod'
import { COUNTERPARTY_TYPE, CURRENCY, DEAL_STATUS, DEAL_TYPE, RECURRENCE_INTERVAL } from '../types/deal.types';

export function createDealSchema() {
    return z.object({
        title: z.string().min(3, 'Deal title is required'),

        dealType: z.enum(DEAL_TYPE),
        status: z.enum(DEAL_STATUS),

        userOwnerId: z.string().uuid().nullable().optional(),
        orgOwnerId: z.string().uuid().nullable().optional(),

        counterparty: z.object({
            name: z.string().min(1, 'Counterparty name is required'),
            email: z.string().email('Invalid email'),
            type: z.enum(COUNTERPARTY_TYPE),
            contactPhone: z.string().optional().nullable(),
        }),

        parentDealId: z.string().uuid().optional().nullable(),

        currency: z.enum(CURRENCY),
        agreedValue: z.number().positive('Must be > 0'),

        cycleAmount: z.number().positive().optional().nullable(),

        isRecurring: z.boolean(),

        recurrenceInterval: z.enum(RECURRENCE_INTERVAL)
            .optional()
            .nullable(),

        nextPaymentDate: z.coerce.date().optional().nullable(),

        startDate: z.coerce.date(),
        endDate: z.coerce.date().optional().nullable(),

        notes: z.string().optional().nullable(),
    })
        // .refine(
        //     (data) => data.userOwnerId || data.orgOwnerId,
        //     {
        //         message: 'Either userOwnerId or orgOwnerId must be provided',
        //         path: ['userOwnerId'],
        //     }
        // )
        .refine(
            (data) => !(data.userOwnerId && data.orgOwnerId),
            {
                message: 'Only one of userOwnerId or orgOwnerId should be set',
                path: ['userOwnerId'],
            }
        )
        .refine(
            (data) => {
                if (data.isRecurring) {
                    return data.recurrenceInterval && data.nextPaymentDate;
                }
                return true;
            },
            {
                message: 'Recurring deals require interval and next payment date',
                path: ['recurrenceInterval'],
            }
        ).refine(
            (data) => !data.isRecurring || data.cycleAmount != null,
            {
                message: "Recurring deals require a cycleAmount",
                path: ["cycleAmount"],
            },
        )
        .refine((data) => !data.endDate || data.endDate >= data.startDate, {
            message: "endDate must be on or after startDate",
            path: ["endDate"],
        })
}