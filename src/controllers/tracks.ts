import { Response } from 'express';
import { asyncHandler, sendResponse } from '../utils';
import { HTTP_STATUS_CODES, RESPONSES } from '../common/constants';
import { AuthenticatedRequest } from '../types/interfaces';
import { IdType } from '../common/validations/common';
import { Track, TrackQuery, TrackUpdate } from '../common/validations/tracks';
import * as tracksService from '../db/tracks';
import { TrackCreationAttributes, TrackUpdationAttributes } from '../models/tracks';

export const getAllTracks = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const filters = req.query as unknown as TrackQuery;
  const tracks = await tracksService.findAllTracks(req.token.tenant_id, filters);
  sendResponse(res, {
    message: RESPONSES.TRACKS_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: tracks
  });
});

export const getTrackById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: trackId } = req.params as IdType;
  const track = await tracksService.findTrackById(req.token.tenant_id, trackId);
  if (!track) {
    sendResponse(res, {
      message: RESPONSES.TRACK_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }
  sendResponse(res, {
    message: RESPONSES.TRACK_RETRIEVED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: track
  });
});

export const createTrack = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const inputPayload = req.body as Track;

  const trackCreateObj: TrackCreationAttributes = {
    ...inputPayload,
    created_by: req.token.user_id,
    tenant_id: req.token.tenant_id
  };
  await tracksService.createTrack(trackCreateObj);

  sendResponse(res, {
    message: RESPONSES.TRACK_CREATED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.CREATED,
    data: null
  });
});

export const updateTrack = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: trackId } = req.params as IdType;
  const inputPayload = req.body as TrackUpdate;

  const updateObj: TrackUpdationAttributes = {
    ...inputPayload,
    updated_at: new Date(),
    updated_by: req.token.user_id
  };
  const updatedTrack = await tracksService.updateTrack(updateObj, trackId, req.token.tenant_id);

  if (!updatedTrack) {
    sendResponse(res, {
      message: RESPONSES.TRACK_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.TRACK_UPDATED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});

export const deleteTrack = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id: trackId } = req.params as IdType;
  const deletedTrack = await tracksService.deleteTrack(trackId, req.token.tenant_id);

  if (!deletedTrack) {
    sendResponse(res, {
      message: RESPONSES.TRACK_NOT_FOUND,
      status: HTTP_STATUS_CODES.NOT_FOUND,
      data: null
    });
    return;
  }

  sendResponse(res, {
    message: RESPONSES.TRACK_DELETED_SUCCESSFULLY,
    status: HTTP_STATUS_CODES.OK,
    data: null
  });
});
