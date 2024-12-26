import { z } from 'zod';

export const favoritesQuerySchema = z.object({
  limit: z.coerce.number().min(1, { message: 'Limit must be at least 1' }).default(5),
  offset: z.coerce.number().min(0, { message: 'Offset must be at least 0' }).default(0)
});

export const favoriteCategorySchema = z.object({
  category: z
    .enum(['artist', 'album', 'track'], {
      message: 'category must be one of: artist, album, track',
      required_error: 'category is required'
    })
    .transform((v) => v.toUpperCase())
});

export const addFavoriteSchema = z.object({
  category: z
    .enum(['artist', 'album', 'track'], {
      message: 'category must be one of: artist, album, track',
      required_error: 'category is required'
    })
    .transform((v) => v.toUpperCase()),
  item_id: z
    .string({ required_error: 'Item ID is required' })
    .uuid({ message: 'Item ID must be a valid UUID' })
    .nonempty({ message: 'Item ID is required' })
});

export type FavoriteQuery = z.infer<typeof favoritesQuerySchema>;
export type AddFavoritePayload = z.infer<typeof addFavoriteSchema>;
export type FavoriteCategoryPayload = z.infer<typeof favoriteCategorySchema>;
