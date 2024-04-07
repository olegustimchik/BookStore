import { Request, Response, NextFunction } from 'express';
import { NewBookRequestDTO } from '../dto/newBookRequestDTO';
import { UpdateBookRequestDTO } from '../dto/updateBookRequestDTO';
import { validate } from 'class-validator';
import { ValidationError } from '../errors/errors';

export class ValidationMiddleware {
  newBookValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transformed = new NewBookRequestDTO(req.body);
      const validationErrors = await validate(transformed, { validationError: { target: false } });
      if (validationErrors.length > 0) {
        throw new ValidationError('Request Body should be like {description: string, title: string, price:string} ');
      }
      next();
    } catch (err) {
      next(err);
    }
  };

  updateBookValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transformed = new UpdateBookRequestDTO(req.body);
      const validationErrors = await validate(transformed, {});
      if (validationErrors.length > 0 || (!transformed.description && !transformed.title && !transformed.price)) {
        throw new ValidationError('description, title or price was not provide in the request body');
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
