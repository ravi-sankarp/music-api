import { z } from 'zod';

export const artistSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(1, { message: 'Name is a required field' }),
  grammy: z.coerce.number({ required_error: 'grammy is required' }).min(0),
  hidden: z.boolean({ required_error: 'hidden is required' })
});
export const artistUpdateSchema = artistSchema.partial();

export const artistQuerySchema = z.object({
  limit: z.coerce.number().min(1).default(5),
  offset: z.coerce.number().min(0).default(0),
  grammy: z.coerce.number().min(0).optional(),
  hidden: z
    .string()
    .transform((val) => (val === 'false' ? false : Boolean(val)))
    .optional()
});

export type Artist = z.infer<typeof artistSchema>;
export type ArtistQuery = z.infer<typeof artistQuerySchema>;
export type ArtistUpdate = z.infer<typeof artistUpdateSchema>;
