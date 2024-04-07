import App from './app';
import { AuthController } from './controllers/authenticationController';
import { BookController } from './controllers/bookController';
import { BookService } from './services/bookService';
import { PrismaClient } from '@prisma/client';

const prismaClient: PrismaClient = new PrismaClient();

const bookService: BookService = new BookService(prismaClient);

const authController: AuthController = new AuthController();
const bookController: BookController = new BookController(bookService);
const app = new App(3000, [authController, bookController]);

app.start();
