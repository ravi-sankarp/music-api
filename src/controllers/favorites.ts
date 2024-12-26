import { Response } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { FavoriteTypes, HTTP_STATUS_CODES, RESPONSES } from '../common/constants';
import { AuthenticatedRequest } from '../types/interfaces';
import { IdType } from '../common/validations/common';
import {
  FavoriteQuery,
  AddFavoritePayload,
  FavoriteCategoryPayload
} from '../common/validations/favorites';
import * as favoritesService from '../db/favorites';
import { FavoriteCreationAttributes } from '../models/favorites';
import { DatabaseError, UniqueConstraintError } from 'sequelize';

export const getFavorites = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { category } = req.params as FavoriteCategoryPayload;
  const filters = req.query as unknown as FavoriteQuery;
  const favorites = await favoritesService.findFavorites(
    req.token.tenant_id,
    req.token.user_id,
    category.toUpperCase(),
    filters
  );

  sendResponse(res, {
    message: RESPONSES.FAVORITES_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: favorites
  });
});

export const addFavorite = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    const payload = req.body as AddFavoritePayload;

    const insertObj: FavoriteCreationAttributes = {
      item_id: payload.item_id,
      type: FavoriteTypes[payload.category as keyof typeof FavoriteTypes],
      user_id: req.token.user_id,
      tenant_id: req.token.tenant_id
    };
    await favoritesService.addFavorite(insertObj);

    sendResponse(res, {
      message: RESPONSES.FAVORITE_ADDED_SUCCESSFULLY,
      status: HTTP_STATUS_CODES.CREATED,
      data: null
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      sendResponse(res, {
        message: RESPONSES.FAVORITE_ALREADY_EXISTS,
        status: HTTP_STATUS_CODES.CONFLICT,
        data: null
      });
      return;
    }
    if (err instanceof DatabaseError) {
      if (err.message.includes('Invalid item_id')) {
        sendResponse(res, {
          message: RESPONSES.BAD_REQUEST,
          status: HTTP_STATUS_CODES.BAD_REQUEST,
          data: null
        });
        return;
      }
    }
    throw err;
  }
});

export const removeFavorite = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: favoriteId } = req.params as IdType;

  const deleted = await favoritesService.removeFavorite(
    favoriteId,
    req.token.tenant_id,
    req.token.user_id
  );

  if (!deleted) {
    sendResponse(res, {
      message: RESPONSES.FAVORITE_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.FAVORITE_REMOVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});
