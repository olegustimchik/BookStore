import { NextFunction, Request, Response } from 'express';
import { Controller } from './controller';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export class AuthController extends Controller {
  constructor() {
    super('/auth');
    this.router.get('/token', this.getToken);
  }

  getToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const options = {
        expiresIn: '2h',
      };
      const token = jwt.sign({}, process.env.SECRET, options); // empty payloads
      res.send({ token: token });
    } catch (err) {
      next(err);
    }
  };
}
