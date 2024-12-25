import { NextFunction, Request, Response } from 'express';

export type ExpressControllerFn = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<void>;

export type ObjectValues<T> = T[keyof T];
