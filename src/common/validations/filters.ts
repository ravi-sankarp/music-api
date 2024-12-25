import { z } from 'zod';

export const basicFilterSchema = z.object({
  limit: z.coerce.number().optional().default(5),
  offset: z.coerce.number().optional().default(0)
});

export const usersFilterSchema = basicFilterSchema.extend({
  role: z
    .enum(['Editor', 'Viewer', 'Admin'])
    .optional()
    .transform((val) => val?.toUpperCase())
});

export type UsersFilters = z.infer<typeof usersFilterSchema>;

export type Filters = z.infer<typeof basicFilterSchema>;
