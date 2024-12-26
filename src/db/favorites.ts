import { QueryTypes } from 'sequelize';
import { FavoriteCreationAttributes, Favorites } from '../models/favorites';
import { FavoriteQuery } from '../common/validations/favorites';
import { FavoriteTypes } from '../common/constants';
import { db } from '../helpers';

export const findFavorites = async (
  tenantId: string,
  userId: string,
  category: string,
  { limit, offset }: FavoriteQuery
) => {
  const type = FavoriteTypes[category.toUpperCase() as keyof typeof FavoriteTypes];
  const query = `
    SELECT 
      f.favourite_id AS "favorite_id",
      ft.name AS "category",
      f.item_id,
      COALESCE(a.name, t.name, ar.name) AS "name",
      f.created_at
    FROM 
      favorites f
    LEFT JOIN albums a ON f.type = ${FavoriteTypes.ALBUM} AND f.item_id = a.album_id
    LEFT JOIN tracks t ON f.type =${FavoriteTypes.TRACK} AND f.item_id = t.track_id
    LEFT JOIN artists ar ON f.type = ${FavoriteTypes.ARTIST} AND f.item_id = ar.artist_id
    JOIN favorite_types ft ON f.type = ft.id
    WHERE 
      f.tenant_id = :tenantId
      AND f.user_id = :userId
      AND f.type = ${type}
    ORDER BY f.created_at DESC
    LIMIT :limit
    OFFSET :offset
  `;

  const result = await db.query(query, {
    type: QueryTypes.SELECT,
    replacements: { tenantId, userId, limit, offset }
  });
  return result;
};

export const addFavorite = async (favorite: FavoriteCreationAttributes) => {
  await Favorites.create(favorite, { returning: false });
};

export const removeFavorite = async (favoriteId: string, tenantId: string, userId: string) => {
  const result = await Favorites.destroy({
    where: {
      favourite_id: favoriteId,
      tenant_id: tenantId,
      user_id: userId
    }
  });
  return result;
};
