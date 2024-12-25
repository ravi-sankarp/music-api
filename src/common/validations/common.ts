import { z } from 'zod';

export const idSchema = z.object({
    id: z.string().uuid(),
});

export type IdType = z.infer<typeof idSchema>;