import { WhereOptions } from 'sequelize';
import { ArtistQuery } from '../common/validations/artists';
import {
  ArtistAttributes,
  ArtistCreationAttributes,
  Artists,
  ArtistUpdationAttributes
} from '../models/artists';

export const findAllArtists = async (tenantId: string, filters: ArtistQuery) => {
  const conditions: WhereOptions<ArtistAttributes> = {
    tenant_id: tenantId
  };
  if (filters.grammy) {
    conditions.grammy = filters.grammy;
  }
  if (filters.hidden === false || filters.hidden === true) {
    conditions.hidden = filters.hidden;
  }
  const result = await Artists.findAll({
    where: conditions,
    attributes: ['artist_id', 'name', 'grammy', 'hidden'],
    limit: filters.limit,
    offset: filters.offset,
    order: [['created_at', 'desc']]
  });
  return result;
};

export const findArtistById = async (tenantId: string, artistId: string) => {
  const result = await Artists.findOne({
    where: {
      tenant_id: tenantId,
      artist_id: artistId
    },
    attributes: ['artist_id', 'name', 'grammy', 'hidden']
  });
  return result;
};

export const createArtist = async (input: ArtistCreationAttributes) => {
  await Artists.create(input, { returning: false });
};

export const updateArtist = async (
  updateObj: ArtistUpdationAttributes,
  id: string,
  tenantId: string
) => {
  const result = await Artists.update(updateObj, { where: { artist_id: id, tenant_id: tenantId } });
  return result;
};

export const deleteArtist = async (id: string, tenantId: string) => {
  const result = await Artists.destroy({ where: { artist_id: id, tenant_id: tenantId } });
  return result;
};
