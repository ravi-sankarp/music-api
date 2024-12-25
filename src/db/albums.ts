import type { WhereOptions } from 'sequelize';
import { AlbumQuery } from '../common/validations/albums';
import {
  AlbumAttributes,
  AlbumCreationAttributes,
  Albums,
  AlbumUpdationAttributes
} from '../models/albums';
import { Artists } from '../models/artists';
import sequelize from 'sequelize';

export const findAllAlbums = async (tenantId: string, filters: AlbumQuery) => {
  const conditions: WhereOptions<AlbumAttributes> = {
    tenant_id: tenantId
  };
  if (filters.artist_id) {
    conditions.artist_id = filters.artist_id;
  }

  if (filters.hidden === false || filters.hidden === true) {
    conditions.hidden = filters.hidden;
  }

  const result = await Albums.findAll({
    where: conditions,
    include: {
      model: Artists,
      as: 'artist',
      required: true,
      attributes: [],
      isSingleAssociation: true
    },
    attributes: [
      'album_id',
      'name',
      'year',
      'hidden',
      [sequelize.col('artist.name'), 'artist_name']
    ],
    limit: filters.limit,
    offset: filters.offset,
    raw: true,
    order: [['created_at', 'desc']]
  });
  return result;
};

export const findAlbumById = async (tenantId: string, albumId: string) => {
  const result = await Albums.findOne({
    where: {
      tenant_id: tenantId,
      album_id: albumId
    },
    include: {
      model: Artists,
      as: 'artist',
      required: true,
      attributes: [],
      isSingleAssociation: true
    },
    attributes: [
      'album_id',
      'name',
      'year',
      'hidden',
      [sequelize.col('artist.name'), 'artist_name']
    ]
  });
  return result;
};

export const createAlbum = async (input: AlbumCreationAttributes) => {
  await Albums.create(input, { returning: false });
};

export const updateAlbum = async (
  updateObj: AlbumUpdationAttributes,
  id: string,
  tenantId: string
) => {
  const result = await Albums.update(updateObj, { where: { album_id: id, tenant_id: tenantId } });
  return result;
};

export const deleteAlbum = async (id: string, tenantId: string) => {
  const result = await Albums.destroy({ where: { album_id: id, tenant_id: tenantId } });
  return result;
};
