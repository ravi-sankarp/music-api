import { Response } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES } from '../common/constants';
import { AuthenticatedRequest } from '../types/interfaces';
import { IdType } from '../common/validations/common';
import { Album, AlbumQuery, AlbumUpdate } from '../common/validations/albums';
import * as albumsService from '../db/albums';
import { AlbumCreationAttributes, AlbumUpdationAttributes } from '../models/albums';

export const getAllAlbums = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const filters = req.query as unknown as AlbumQuery;
  const albums = await albumsService.findAllAlbums(req.token.tenant_id, filters);
  sendResponse(res, {
    message: RESPONSES.ALBUMS_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: albums
  });
});

export const getAlbumById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: albumId } = req.params as IdType;
  const album = await albumsService.findAlbumById(req.token.tenant_id, albumId);
  if (!album) {
    sendResponse(res, {
      message: RESPONSES.ALBUM_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  sendResponse(res, {
    message: RESPONSES.ALBUM_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: album
  });
});

export const createAlbum = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const inputPayload = req.body as Album;

  const albumCreateObj: AlbumCreationAttributes = {
    ...inputPayload,
    created_by: req.token.user_id,
    tenant_id: req.token.tenant_id
  };
  await albumsService.createAlbum(albumCreateObj);

  sendResponse(res, {
    message: RESPONSES.ALBUM_CREATED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.CREATED,
    data: null
  });
});

export const updateAlbum = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: albumId } = req.params as IdType;
  const inputPayload = req.body as AlbumUpdate;

  const updateObj: AlbumUpdationAttributes = {
    ...inputPayload,
    updated_at: new Date(),
    updated_by: req.token.user_id
  };
  const updatedAlbum = await albumsService.updateAlbum(updateObj, albumId, req.token.tenant_id);

  if (!updatedAlbum) {
    sendResponse(res, {
      message: RESPONSES.ALBUM_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.ALBUM_UPDATED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});

export const deleteAlbum = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: albumId } = req.params as IdType;
  const album = await albumsService.findAlbumById(req.token.tenant_id, albumId);
  if (!album) {
    sendResponse(res, {
      message: RESPONSES.ALBUM_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  const deletedAlbum = await albumsService.deleteAlbum(albumId, req.token.tenant_id);

  if (!deletedAlbum) {
    sendResponse(res, {
      message: RESPONSES.ALBUM_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.ALBUM_DELETED_SUCCESSFULLY(album.dataValues.name),
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});
