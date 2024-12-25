import { Response } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES } from '../common/constants';
import { AuthenticatedRequest } from '../types/interfaces';
import { IdType } from '../common/validations/common';
import { Artist, ArtistQuery, ArtistUpdate } from '../common/validations/artists';
import * as artistsService from '../db/artists';
import { ArtistCreationAttributes, ArtistUpdationAttributes } from '../models/artists';

export const getAllArtists = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const filters = req.query as unknown as ArtistQuery;
  const artists = await artistsService.findAllArtists(req.token.tenant_id, filters);
  sendResponse(res, {
    message: RESPONSES.ARTISTS_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: artists
  });
});

export const getArtistById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: artistId } = req.params as IdType;
  const artist = await artistsService.findArtistById(req.token.tenant_id, artistId);
  if (!artist) {
    sendResponse(res, {
      message: RESPONSES.ARTIST_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  sendResponse(res, {
    message: RESPONSES.ARTIST_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: artist
  });
});

export const createArtist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const inputPayload = req.body as Artist;

  const artistCreateObj: ArtistCreationAttributes = {
    ...inputPayload,
    created_by: req.token.user_id,
    tenant_id: req.token.tenant_id
  };
  await artistsService.createArtist(artistCreateObj);

  sendResponse(res, {
    message: RESPONSES.ARTIST_CREATED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.CREATED,
    data: null
  });
});

export const updateArtist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: artistId } = req.params as IdType;
  const inputPayload = req.body as ArtistUpdate;

  const updateObj: ArtistUpdationAttributes = {
    ...inputPayload,
    updated_at: new Date(),
    updated_by: req.token.user_id
  };
  const updatedArtist = await artistsService.updateArtist(updateObj, artistId, req.token.tenant_id);

  if (!updatedArtist) {
    sendResponse(res, {
      message: RESPONSES.ARTIST_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.ARTIST_UPDATED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});

export const deleteArtist = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: artistId } = req.params as IdType;
  const deletedArtist = await artistsService.deleteArtist(artistId, req.token.tenant_id);

  if (!deletedArtist) {
    sendResponse(res, {
      message: RESPONSES.ARTIST_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.ARTIST_DELETED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});
