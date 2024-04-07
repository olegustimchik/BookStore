import { Request, Response, NextFunction } from 'express';
import { Controller } from './controller';
import { BookService } from '../services/bookService';
import { authenticate } from '../middlewares/authenticationMiddleware';
import { ValidationMiddleware } from '../middlewares/validationMiddlewares';
export class BookController extends Controller {
  private validationMiddlewares: ValidationMiddleware;
  constructor(private bookService: BookService) {
    super('/books');
    this.validationMiddlewares = new ValidationMiddleware();
    this.router.get('', this.getBooks);
    this.router.post('', [authenticate, this.validationMiddlewares.newBookValidation], this.createBook);
    this.router.put('/:id', [authenticate, this.validationMiddlewares.updateBookValidation], this.putBook);
    this.router.delete('/:id', authenticate, this.delete);
  }

  getBooks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books = await this.bookService.selectAll();
      res.send({ data: books });
    } catch (err) {
      next(err);
    }
  };

  createBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const description = req.body.description as string;
      const title = req.body.title as string;
      const price = req.body.price as string;
      const result = await this.bookService.create(title, description, price);
      res.send({ message: 'book successfully created', result });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookService.delete(req.params.id);
      res.send({ message: 'Book successfully deleted', result });
    } catch (err) {
      next(err);
    }
  };

  putBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.bookService.update(req.params.id, req.body.title, req.body.description, req.body.price);
      res.send({ message: 'Book successfully updated ', result });
    } catch (err) {
      next(err);
    }
  };
}
