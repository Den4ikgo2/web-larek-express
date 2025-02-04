// eslint-disable-next-line import/no-import-module-exports
import { Request, Response, NextFunction } from 'express';
// eslint-disable-next-line import/no-import-module-exports
import BadRequestError from '../errors/bad-request-errors';
// eslint-disable-next-line import/no-import-module-exports
import ConflictError from '../errors/conflict-error';
// eslint-disable-next-line import/no-import-module-exports
import NotFoundError from '../errors/not-found-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, consistent-return
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.send(new BadRequestError(err.message, statusCode));
      return next;
    case 404:
      res.send(new ConflictError(err.message, statusCode));
      return next;
    case 409:
      res.send(new NotFoundError(err.message, statusCode));
      return next;
    case 500:
      res.send(err.message);
      return next;
    default:
      break;
  }
};

export default errorHandler;
