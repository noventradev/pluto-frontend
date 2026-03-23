import { z } from 'zod';

export const incomeSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),

    source: z.string().min(1, 'Source is required'),
    type: z.string().min(1, 'Type is required'),

    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),

    frequency: z.string().min(1, 'Frequency is required'),

    baseAmount: z.number().min(1, 'Base amount must be greater than 0'),

    currency: z.string().min(1, 'Currency is required'),

    estimatedAmount: z
      .number()
      .min(1, 'Estimated amount must be greater than 0')
      .optional(),

    actualAmount: z.number().optional().or(z.literal(0)),

    status: z.string().min(1, 'Status is required'),

    note: z.string().optional(),
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    message: 'End date must be after start date',
    path: ['endDate'],
  });
