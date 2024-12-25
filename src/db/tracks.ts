import type { WhereOptions } from 'sequelize';
import { TrackQuery } from '../common/validations/tracks';
import {
  TrackAttributes,
  TrackCreationAttributes,
  Tracks,
  TrackUpdationAttributes
} from '../models/tracks';
import { Artists } from '../models/artists';
import sequelize from 'sequelize';
import { Albums } from '../models/albums';

export const findAllTracks = async (tenantId: string, filters: TrackQuery) => {
  const conditions: WhereOptions<TrackAttributes> = {
    tenant_id: tenantId
  };
  if (filters.album_id) {
    conditions.album_id = filters.album_id;
  }
  if (filters.artist_id) {
    conditions.artist_id = filters.artist_id;
  }
  if (filters.hidden === false || filters.hidden === true) {
    conditions.hidden = filters.hidden;
  }
  const result = await Tracks.findAll({
    where: conditions,
    include: [
      {
        model: Albums,
        as: 'album',
        required: true,
        attributes: [],
        include: [
          {
            model: Artists,
            as: 'artist',
            required: true,
            attributes: []
          }
        ]
      }
    ],
    attributes: [
      'track_id',
      'name',
      'duration',
      'hidden',
      [sequelize.literal(`"album->artist"."name"`), 'artist_name'],
      [sequelize.col('album.name'), 'album_name']
    ],
    limit: filters.limit,
    offset: filters.offset,
    order: [['created_at', 'desc']]
  });
  return result;
};

export const findTrackById = async (tenantId: string, trackId: string) => {
  const result = await Tracks.findOne({
    where: {
      tenant_id: tenantId,
      track_id: trackId
    },
    include: [
      {
        model: Albums,
        as: 'album',
        required: true,
        attributes: [],
        include: [
          {
            model: Artists,
            as: 'artist',
            required: true,
            attributes: []
          }
        ]
      }
    ],
    attributes: [
      'track_id',
      'name',
      'duration',
      'hidden',
      [sequelize.literal(`"album->artist"."name"`), 'artist_name'],
      [sequelize.col('album.name'), 'album_name']
    ]
  });

  return result;
};

export const createTrack = async (input: TrackCreationAttributes) => {
  await Tracks.create(input, { returning: false });
};

export const updateTrack = async (
  updateObj: TrackUpdationAttributes,
  id: string,
  tenantId: string
) => {
  const result = await Tracks.update(updateObj, { where: { track_id: id, tenant_id: tenantId } });
  return result;
};

export const deleteTrack = async (id: string, tenantId: string) => {
  const result = await Tracks.destroy({ where: { track_id: id, tenant_id: tenantId } });
  return result;
};
