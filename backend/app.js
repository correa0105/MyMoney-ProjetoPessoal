import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import loginRoutes from './routes/loginRoutes';
import accountRoutes from './routes/accountRoutes';

class App {
  constructor() {
    dotenv.config();
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users', userRoutes);
    this.app.use('/login', loginRoutes);
    this.app.use('/accounts', accountRoutes);
  }
}

export default new App().app;
