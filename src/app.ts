import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { Controller } from './controllers/controller';
import { ErrorHandler } from './errorHandler/errorHandler';
import 'dotenv/config';

export default class App {
  app: Application;

  private port: number;

  private controllers: Controller[];

  constructor(port: number, controllers: Controller[]) {
    this.app = express();
    this.port = port;
    this.controllers = controllers;
    this.initializeMiddlewares();
    this.initializeControllers();
    this.initializeErrorHandlers();
  }

  start = () => {
    try {
      this.app.use('*', (req: Request, res: Response) => {
        res.status(400).send({ message: 'route not found' }); 
      });
      this.app.listen(this.port, () => {
        console.log(`http://localhost:${this.port}/`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  private initializeControllers = () => {
    this.controllers.forEach((controller) => {
      this.app.use(controller.path, controller.router);
    });
  };

  private initializeMiddlewares = () => {
    if (!process.env.SECRET) {
      throw new Error('add SECRET to .env');
    }
    this.app.use(express.json());
    this.app.use(cors());
  };

  private initializeErrorHandlers = () => {
    const errorHandler: ErrorHandler = new ErrorHandler();
    this.app.use(errorHandler.databaseError);
    this.app.use(errorHandler.validationError);
    this.app.use(errorHandler.authError);
    this.app.use(errorHandler.serverError);
  };
}
