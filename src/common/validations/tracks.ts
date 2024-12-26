import { z } from 'zod';

export const trackSchema = z.object({
  name: z.string({ required_error: 'name is required' }).min(1),
  album_id: z.string({ required_error: 'album_id is required' }).uuid(),
  artist_id: z.string({ required_error: 'artist_id is required' }).uuid(),
  duration: z.coerce.number({ required_error: 'duration is required' }).positive(),
  hidden: z.boolean({ required_error: 'hidden is required' })
});

export const trackUpdateSchema = trackSchema.omit({ album_id: true, artist_id: true }).partial();

export const trackQuerySchema = z.object({
  limit: z.coerce.number().min(1).default(5),
  offset: z.coerce.number().min(0).default(0),
  album_id: z.string().uuid().optional(),
  artist_id: z.string().uuid().optional(),
  hidden: z
    .string()
    .transform((val) => (val === 'false' ? false : Boolean(val)))
    .optional()
});

export type Track = z.infer<typeof trackSchema>;
export type TrackQuery = z.infer<typeof trackQuerySchema>;
export type TrackUpdate = z.infer<typeof trackUpdateSchema>;
