import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../errors/errors';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (typeof token !== 'string') {
      throw new AuthorizationError('token is not valid');
    }
    jwt.verify(token, process.env.SECRET, (err) => {
      if (err) {
        throw new AuthorizationError('token is not valid');
      }

    });
    next();
  } catch (err) {
    next(err);
  }
};
