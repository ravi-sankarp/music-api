import { NextFunction, Request, Response } from 'express';

export type ExpressControllerFn = (req: any, res: Response, next: NextFunction) => unknown;

export type ObjectValues<T> = T[keyof T];
