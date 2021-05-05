import uploads from '@config/uploads';
import { Router } from 'express';
import multer from 'multer';

import { MovieCategoriesController } from '../controllers/MovieCategoriesController';
import { MoviesController } from '../controllers/MoviesController';

const upload = multer(uploads.multer);
const moviesRouter = Router();
const moviesController = new MoviesController();
const movieCategoriesController = new MovieCategoriesController();

moviesRouter.post(
  '/',
  upload.fields([
    { name: 'movie', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
    { name: 'backdrop', maxCount: 1 },
  ]),
  moviesController.create,
);

moviesRouter.post('/:id/categories', movieCategoriesController.create);

export { moviesRouter };
