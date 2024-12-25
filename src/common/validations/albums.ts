import { z } from 'zod';

export const albumSchema = z.object({
  name: z.string().min(1),
  artist_id: z.string().uuid(),
  year: z.coerce.number().refine((val) => /^\d{4}$/.test(val.toString()), {
    message: 'Year must be a 4-digit number'
  }),
  hidden: z.boolean()
});

export const albumUpdateSchema = albumSchema.omit({ artist_id: true }).partial();

export const albumQuerySchema = z.object({
  limit: z.coerce.number().min(1).default(5),
  offset: z.coerce.number().min(0).default(0),
  artist_id: z.string().uuid().optional(),
  hidden: z
    .string()
    .transform((val) => (val === 'false' ? false : Boolean(val)))
    .optional()
});

export type Album = z.infer<typeof albumSchema>;
export type AlbumQuery = z.infer<typeof albumQuerySchema>;
export type AlbumUpdate = z.infer<typeof albumUpdateSchema>;