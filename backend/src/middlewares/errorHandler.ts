import { Request, Response, NextFunction } from 'express';
import LoggerService from '../utils/LoggerService';

const logger = new LoggerService('ErrorHandler');

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message || 'Unexpected Error', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
}