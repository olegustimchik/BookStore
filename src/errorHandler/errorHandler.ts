import { Request, Response, NextFunction } from 'express';
import { AuthorizationError, ValidationError } from '../errors/errors';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class ErrorHandler {
  databaseError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof PrismaClientKnownRequestError) {
      const { code } = err;
      switch (code) {
        case 'P2002':
          return res.status(400).send({message: 'data should be unique'});
        default:
          console.log(err);
          return res.sendStatus(500);
      }
    }
    next(err); 
  };

  authError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AuthorizationError) {
      return res.status(err.code).send({ message: err.message });
    }
    next(err);
  };

  validationError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
      return res.status(err.code).send({ message: err.message });
    }
    next(err);
  };

  serverError = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    //here the manager must be informed
    console.log(err);
    return res.sendStatus(500);
  };
}
