import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { setRequestId } from '../utils/requestContext';
import LoggerService from '../utils/LoggerService';

const logger = new LoggerService('LoggerMiddleware');

export default function logRequest(req: Request, _res: Response, next: NextFunction) {
  const requestId = uuidv4();
  setRequestId(requestId);

  logger.info(`${req.method} ${req.originalUrl}`);
  next();
}