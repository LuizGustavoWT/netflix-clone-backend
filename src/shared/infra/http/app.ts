import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';

import AppError from '@shared/error/AppError';

import { router } from './routes';

import 'express-async-errors';

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export { app };
