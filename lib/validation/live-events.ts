import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  description: z.string().max(1000).optional(),
  scheduledAt: z.string().datetime(),
  capacity: z.number().int().min(1).max(1000),
});

export const updateEventSchema = createEventSchema.partial();

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;